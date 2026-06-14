import { $api } from '@shared/api/api';
import { apiEndpoints } from '@shared/api/config/apiConfig';
import type { Booking, BookingCreate } from '../model/types/types';

export const bookingApi = {
    fetchAll: (ownerId: string): Promise<Booking[]> =>
        $api.get<Booking[]>(apiEndpoints.ownerBookings(ownerId)).then((r) => r.data),

    create: (ownerId: string, payload: BookingCreate): Promise<Booking> =>
        $api.post<Booking>(apiEndpoints.ownerBookings(ownerId), payload).then((r) => r.data),
};
