import { $api } from '@shared/api/api';
import { apiEndpoints } from '@shared/api/config/apiConfig';
import type { EventType, EventTypeCreate, EventTypeUpdate } from '../model/types/types';

export const eventTypeApi = {
    fetchAll: (): Promise<EventType[]> =>
        $api.get<EventType[]>(apiEndpoints.EVENT_TYPES).then((r) => r.data),

    create: (payload: EventTypeCreate): Promise<EventType> =>
        $api.post<EventType>(apiEndpoints.EVENT_TYPES, payload).then((r) => r.data),

    update: (id: string, payload: EventTypeUpdate): Promise<EventType> =>
        $api.put<EventType>(`${apiEndpoints.EVENT_TYPES}/${id}`, payload).then((r) => r.data),

    remove: (id: string): Promise<void> =>
        $api.delete(`${apiEndpoints.EVENT_TYPES}/${id}`).then(() => undefined),
};
