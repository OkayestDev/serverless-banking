import { State } from '../src/interfaces/state.interface';
import { v4 } from 'uuid';

export const getMockState = (): State => ({
    bank: {
        id: v4(),
        name: 'test bank',
        defaultCarrierServiceId: null,
    },
    carrierServiceId: '',
    dispensaryId: '',
    carrierServices: [
        {
            id: v4(),
            name: 'test carrier service',
        },
    ],
    dispensaries: [
        {
            id: v4(),
            name: 'test dispensary',
            preferredCarrierServiceId: null,
            assignedBy: null,
        },
    ],
});
