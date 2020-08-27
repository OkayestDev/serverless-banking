import { AssignedBy } from '../types';

export interface Dispensary {
    id: string;
    name: string;
    preferredCarrierServiceId: string | null;
    assignedBy: AssignedBy | null;
}
