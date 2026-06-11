import { $api } from '@shared/api/api';
import { apiEndpoints } from '@shared/api/config/apiConfig';
import type { Schedule, AvailabilityRuleWrite, AvailabilityOverrideCreate } from '../model/types/types';

export const scheduleApi = {
  fetchByOwner: (ownerId: string): Promise<Schedule> =>
    $api.get<Schedule>(`${apiEndpoints.SCHEDULES}/${ownerId}`).then((r) => r.data),
  addRule: (scheduleId: string, payload: AvailabilityRuleWrite): Promise<Schedule> =>
    $api
      .post<Schedule>(`${apiEndpoints.SCHEDULES}/${scheduleId}/rules`, payload)
      .then((r) => r.data),
  addOverride: (scheduleId: string, payload: AvailabilityOverrideCreate): Promise<Schedule> =>
    $api
      .post<Schedule>(`${apiEndpoints.SCHEDULES}/${scheduleId}/overrides`, payload)
      .then((r) => r.data),
};
