import { createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import ChatLayout from '../modules/chat';
import AuthPage from '../modules/auth';

const authRoutes: RouteObject[] = [{
  path: 'auth',
  element: <AuthPage />,
}];

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem('nickName');

  if (!user) {
    return <Navigate to='/auth' />
  }

  return children
}

const appLayoutRoutes: RouteObject[] = [{
  path: '/',
  element: (
    <AuthGuard>
      <ChatLayout />
    </AuthGuard>
  )
}]

export const APP_ROUTES = createBrowserRouter([...authRoutes, ...appLayoutRoutes])

