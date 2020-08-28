import { Callback, Context, Handler } from 'aws-lambda';
import { State } from '../interfaces/state.interface';
import { constructResponse } from '../utils/construct-response.utils';
import { OK } from '../constants';
import { AssignedBy } from '../types';
import * as errorResponses from '../utils/error-responses.utils';
import * as stateUtils from '../utils/state.utils';

export const assignPreferredCarrierServiceToDispensary: Handler = (
    state: State,
    context: Context,
    callback: Callback
) => {
    const { carrierServiceId } = state;

    const dispensary = stateUtils.getDispensary(state);
    const carrierService = stateUtils.getCarrierService(state);

    if (!dispensary) {
        errorResponses.unableToFindDispensary(state, callback);
        return;
    }

    if (!carrierService) {
        errorResponses.unableToFindCarrierService(state, callback);
        return;
    }

    dispensary.preferredCarrierServiceId = carrierServiceId;
    dispensary.assignedBy = AssignedBy.Bank;

    const response = constructResponse(OK, {
        state,
    });
    callback(null, response);
};

export const assignDefaultCarrierService: Handler = (
    state: State,
    context: Context,
    callback: Callback
) => {
    const { bank } = state;

    const carrierService = stateUtils.getCarrierService(state);

    if (!carrierService) {
        errorResponses.unableToFindCarrierService(state, callback);
        return;
    }

    bank.defaultCarrierServiceId = carrierService.id;

    const response = constructResponse(OK, {
        state,
    });
    callback(null, response);
};
