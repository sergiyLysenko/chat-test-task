import { createBrowserRouter, RouteObject } from 'react-router-dom';
import ChatLayout from '../modules/chat';
import AuthPage, { AuthGuard } from '../modules/auth';

const authRoutes: RouteObject[] = [{
  path: 'auth',
  element: <AuthPage />,
}];

const appLayoutRoutes: RouteObject[] = [{
  path: '/',
  element: (
    <AuthGuard>
      <ChatLayout />
    </AuthGuard>
  )
}]

export const APP_ROUTES = createBrowserRouter([...authRoutes, ...appLayoutRoutes])

