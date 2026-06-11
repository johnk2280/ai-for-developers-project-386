import { useRoutes } from 'react-router-dom';
import { routeConfig } from '../routeConfig/routeConfig';

export const AppRouter = () => {
  const element = useRoutes(routeConfig);
  return <>{element}</>;
};
