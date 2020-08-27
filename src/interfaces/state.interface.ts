import { Bank } from './bank.interface';
import { Dispensary } from './dispensary.interface';
import { CarrierService } from './carrier-service.interface';

/**
 * Encapsulating interface to reflect app's state
 */
export interface State {
    bank: Bank;
    carrierServiceId: string;
    dispensaryId: string;
    carrierServices: Array<CarrierService>;
    dispensaries: Array<Dispensary>;
}
