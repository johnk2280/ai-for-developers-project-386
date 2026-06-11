import { $api } from '@shared/api/api';
import { apiEndpoints } from '@shared/api/config/apiConfig';
import type { MeetingPlatform } from '../model/types/types';

export const meetingPlatformApi = {
  fetchAll: (): Promise<MeetingPlatform[]> =>
    $api.get<MeetingPlatform[]>(apiEndpoints.MEETING_PLATFORMS).then((r) => r.data),
};
