import { $api } from '@shared/api/api';
import { apiEndpoints } from '@shared/api/config/apiConfig';
import type { Booking, BookingCreate } from '../model/types/types';

export const bookingApi = {
  fetchAll: (): Promise<Booking[]> =>
    $api.get<Booking[]>(apiEndpoints.BOOKINGS).then((r) => r.data),
  create: (payload: BookingCreate): Promise<Booking> =>
    $api.post<Booking>(apiEndpoints.BOOKINGS, payload).then((r) => r.data),
};
