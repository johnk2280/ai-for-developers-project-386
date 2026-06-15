import { $api } from '@shared/api/api';
import { apiEndpoints } from '@shared/api/config/apiConfig';
import type { Owner, OwnerCreate } from '../model/types/types';

export const ownerApi = {
    fetchAll: (): Promise<Owner[]> =>
        $api.get<Owner[]>(apiEndpoints.OWNERS).then((r) => r.data),
    create: (payload: OwnerCreate): Promise<Owner> =>
        $api.post<Owner>(apiEndpoints.OWNERS, payload).then((r) => r.data),
};
