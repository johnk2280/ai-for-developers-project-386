import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { EventTypesPage } from '@pages/EventTypesPage';
import { AvailabilityPage } from '@pages/AvailabilityPage';
import { BookingPage } from '@pages/BookingPage';
import { NotFoundPage } from '@pages/NotFoundPage';

export const routeConfig: RouteObject[] = [
  { path: '/', element: <Navigate to='/event-types' replace /> },
  { path: '/event-types', element: <EventTypesPage /> },
  { path: '/availability', element: <AvailabilityPage /> },
  { path: '/book/:ownerUsername/:eventTypeId', element: <BookingPage /> },
  { path: '*', element: <NotFoundPage /> },
];
