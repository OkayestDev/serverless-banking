import { Callback, Context, Handler } from 'aws-lambda';
import { State } from '../interfaces/state.interface';
import { NOT_FOUND, OK, BAD_REQUEST } from '../constants';
import { AssignedBy } from '../types';
import * as stateUtils from '../utils/state.utils';
import * as errorResponse from '../utils/error-responses.utils';
import { constructResponse } from '../utils/construct-response.utils';

export const assignPreferredCarrierService = (
    state: State,
    context: Context,
    callback: Callback
) => {
    const dispensary = stateUtils.getDispensary(state);

    if (!dispensary) {
        errorResponse.unableToFindDispensary(state, callback);
        return;
    }

    if (dispensary.assignedBy === AssignedBy.Bank) {
        const response = constructResponse(BAD_REQUEST, {
            message: "Unable to override bank's preferred carrier service assignment",
        });
        callback(null, response);
        return;
    }

    const carrierService = stateUtils.getCarrierService(state);

    if (!carrierService) {
        errorResponse.unableToFindCarrierService(state, callback);
        return;
    }

    dispensary.preferredCarrierServiceId = state.carrierServiceId;

    const response = constructResponse(OK, {
        state,
    });
    callback(null, response);
};

export const getCarrierService = (state: State, context: Context, callback: Callback) => {
    const dispensary = stateUtils.getDispensary(state);

    if (!dispensary) {
        errorResponse.unableToFindDispensary(state, callback);
        return;
    }

    const carrierService = stateUtils.getCarrierServiceForDispensary(state);

    if (!carrierService) {
        // No carrier service to use
        const response = constructResponse(NOT_FOUND, {
            message: 'No preferred or default carrier service selected',
        });
        callback(null, response);
        return;
    }

    const response = constructResponse(OK, {
        carrierService,
    });
    callback(null, response);
};
