import { $api } from '@shared/api/api';
import { apiEndpoints } from '@shared/api/config/apiConfig';
import type { EventType, EventTypeCreate } from '../model/types/types';

export const eventTypeApi = {
  fetchAll: (): Promise<EventType[]> =>
    $api.get<EventType[]>(apiEndpoints.EVENT_TYPES).then((r) => r.data),
  create: (payload: EventTypeCreate): Promise<EventType> =>
    $api.post<EventType>(apiEndpoints.EVENT_TYPES, payload).then((r) => r.data),
};
