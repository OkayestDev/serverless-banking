import { Callback, Context, Handler } from 'aws-lambda';
import { State } from '../interfaces/state.interface';
import { Dispensary } from '../interfaces/dispensary.interface';
import { CarrierService } from '../interfaces/carrier-service.interface';
import { constructResponse } from '../utils/construct-response.utils';
import { NOT_FOUND, OK } from '../constants';

/**
 * Bank assigning a preferred carrierService to dispensary
 * @param state
 * @param context
 * @param callback
 */
export const assignPreferredCarrierServiceToDispensary: Handler = (
    state: State,
    context: Context,
    callback: Callback
) => {
    const { dispensaryId, carrierServiceId } = state;

    const dispensary: Dispensary | undefined = state.dispensaries.find(
        (dispensary: Dispensary) => dispensary.id === dispensaryId
    );

    const carrierService: CarrierService | undefined = state.carrierServices.find(
        (carrierService: CarrierService) => carrierService.id === carrierServiceId
    );

    if (!dispensary) {
        const response = constructResponse(NOT_FOUND, {
            message: `Unable to find dispensary with id ${dispensaryId}`,
        });
        callback(null, response);
        return;
    }

    if (!carrierService) {
        const response = constructResponse(NOT_FOUND, {
            message: `Unable to find carrier service with id ${carrierServiceId}`,
        });
        callback(null, response);
        return;
    }

    dispensary.preferredCarrierServiceId = carrierServiceId;

    const response = constructResponse(OK, {
        state,
    });
    callback(null, response);
};

/**
 *
 * @note does not override default carrier service if previously set
 */
export const assignDefaultCarrierService: Handler = (
    state: State,
    context: Context,
    callback: Callback
) => {
    callback(null, response);
};
