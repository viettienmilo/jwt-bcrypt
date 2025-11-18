import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home.jsx'
import SignUp, { loader as signUpLoader } from './pages/Register.jsx';
import SignIn, { loader as signInLoader } from './pages/Login.jsx';
import Activate from './pages/Activate.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import {
  Dashboard,
  loader as dashboardLoader,
} from './pages/protected/Dashboard.jsx';
import Page404 from './components/Page404.jsx';
import PageError from './components/PageError.jsx';
import Profile, { loader as profileLoader } from './pages/protected/Profile.jsx';
import OAuth from './pages/OAuth.jsx';
import requireAuth from './utils/requireAuth.js';

function App() {
  const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<PageError />} HydrateFallback={() => { return <></> }}>
      <Route index element={<Home />} HydrateFallback={() => { return <></> }} />
      <Route path='user/register' element={<SignUp />} loader={() => signUpLoader(requireAuth())} />
      <Route path='user/activate' element={<Activate />} />
      <Route path='user/reset-password' element={<ResetPassword />} />
      <Route path='user/login' element={<SignIn />} loader={() => signInLoader(requireAuth())} />
      <Route path='user/dashboard' element={<Dashboard />} loader={dashboardLoader} />
      <Route path='auth/google/callback' element={<OAuth />} />
      <Route path='auth/facebook/callback' element={<OAuth />} />
      <Route path='auth/github/callback' element={<OAuth />} />
      <Route path='user/profile' element={<Profile />} loader={() => profileLoader(requireAuth())} />
      <Route path='*' element={<Page404 />} />
    </Route>
  ))

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
