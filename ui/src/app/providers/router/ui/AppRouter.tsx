import type { ReactElement } from 'react';
import { useRoutes } from 'react-router-dom';
import { routeConfig } from '../routeConfig/routeConfig';

export const AppRouter = (): ReactElement => {
    const element = useRoutes(routeConfig);
    return <>{element}</>;
};
