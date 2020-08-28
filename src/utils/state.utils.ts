import { State } from '../interfaces/state.interface';
import { CarrierService } from '../interfaces/carrier-service.interface';
import { Dispensary } from '../interfaces/dispensary.interface';

export const getCarrierService = (state: State): CarrierService | undefined => {
    const { carrierServiceId } = state;
    return state.carrierServices.find((carrierService) => carrierService.id === carrierServiceId);
};

export const getDispensary = (state: State): Dispensary | undefined => {
    const { dispensaryId } = state;
    return state.dispensaries.find((dispensary) => dispensary.id === dispensaryId);
};

export const getCarrierServiceForDispensary = (state: State): CarrierService | undefined => {
    const dispensary = getDispensary(state);
    const carrierServiceId =
        dispensary.preferredCarrierServiceId || state.bank.defaultCarrierServiceId;

    if (!carrierServiceId) {
        return undefined;
    }

    return state.carrierServices.find((carrierService) => carrierService.id === carrierServiceId);
};
