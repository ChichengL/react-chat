import { Navigate, createBrowserRouter } from 'react-router-dom';
import React from 'react';
//@ts-ignore
const Login = React.lazy(() => import('@/views/auth/login.tsx'));
//@ts-ignore
const Register = React.lazy(() => import('@/views/auth/register.tsx'));
//@ts-ignore
const Chat = React.lazy(() => import('@/views/chat/chat.tsx'));
//@ts-ignore
const Home = React.lazy(() => import('@/views/home/home'));

const SetAvatar = React.lazy(() => import('@/views/avatar/setAvatar'));
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        navigate to /home
        <Navigate to="/home" />
      </div>
    )
  },
  {
    path: '/login',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Login />
      </React.Suspense>
    )
  },
  {
    path: '/register',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Register />
      </React.Suspense>
    )
  },
  {
    path: '/forgotPassword',
    element: <div>Forgot Password</div>
  },
  {
    path: '/home',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Home />
      </React.Suspense>
    ),

    children: [
      {
        path: 'chat',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Chat />
          </React.Suspense>
        )
      }
    ]
  },
  {
    path: '/setAvatar',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <SetAvatar />
      </React.Suspense>
    )
  }
]);

export default router;
