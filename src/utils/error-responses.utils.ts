import { Callback } from 'aws-lambda';
import { State } from '../interfaces/state.interface';
import { NOT_FOUND } from '../constants';
import { constructResponse } from './construct-response.utils';

export const unableToFindDispensary = (state: State, callback: Callback): void => {
    const { dispensaryId } = state;
    const response = constructResponse(NOT_FOUND, {
        message: `Unable to find dispensary with id ${dispensaryId}`,
    });
    callback(null, response);
};

export const unableToFindCarrierService = (state: State, callback: Callback): void => {
    const { carrierServiceId } = state;
    const response = constructResponse(NOT_FOUND, {
        message: `Unable to find carrier service with id ${carrierServiceId}`,
    });
    callback(null, response);
};
