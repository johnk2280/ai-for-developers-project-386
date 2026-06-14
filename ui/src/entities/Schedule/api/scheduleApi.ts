import { $api } from '@shared/api/api';
import { apiEndpoints } from '@shared/api/config/apiConfig';
import type {
  Schedule,
  AvailabilityRule,
  AvailabilityRuleWrite,
  AvailabilityOverride,
  AvailabilityOverrideCreate,
  AvailabilityOverrideUpdate,
} from '../model/types/types';

export const scheduleApi = {
  fetchByOwner: (ownerId: string): Promise<Schedule> =>
    $api.get<Schedule>(apiEndpoints.ownerSchedule(ownerId)).then((r) => r.data),

  fetchRules: (ownerId: string): Promise<AvailabilityRule[]> =>
    $api.get<AvailabilityRule[]>(apiEndpoints.ownerRules(ownerId)).then((r) => r.data),

  replaceRules: (ownerId: string, payload: AvailabilityRuleWrite[]): Promise<AvailabilityRule[]> =>
    $api.put<AvailabilityRule[]>(apiEndpoints.ownerRules(ownerId), payload).then((r) => r.data),

  fetchOverrides: (ownerId: string): Promise<AvailabilityOverride[]> =>
    $api.get<AvailabilityOverride[]>(apiEndpoints.ownerOverrides(ownerId)).then((r) => r.data),

  createOverride: (ownerId: string, payload: AvailabilityOverrideCreate): Promise<AvailabilityOverride> =>
    $api.post<AvailabilityOverride>(apiEndpoints.ownerOverrides(ownerId), payload).then((r) => r.data),

  updateOverride: (ownerId: string, date: string, payload: AvailabilityOverrideUpdate): Promise<AvailabilityOverride> =>
    $api.put<AvailabilityOverride>(apiEndpoints.ownerOverride(ownerId, date), payload).then((r) => r.data),

  deleteOverride: (ownerId: string, date: string): Promise<void> =>
    $api.delete(apiEndpoints.ownerOverride(ownerId, date)).then(() => undefined),
};
