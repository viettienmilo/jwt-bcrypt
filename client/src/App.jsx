import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home.jsx'
import Register, { loader as signUpLoader } from './pages/Register.jsx';
import SignIn, { loader as signInLoader } from './pages/Login.jsx';
import Activate from './pages/Activate.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import { Dashboard, loader as dashboardLoader } from './pages/protected/Dashboard.jsx';
import Overview, { loader as overviewLoader } from './pages/protected/Overview.jsx';
import Profile, { loader as profileLoader } from './pages/protected/Profile.jsx';
import Page404 from './components/Page404.jsx';
import PageError from './components/PageError.jsx';
import AdminLayout from './layouts/protected/AdminLayout.jsx';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import OAuth from './pages/OAuth.jsx';
import requireAuth from './utils/requireAuth.js';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} errorElement={<PageError />} HydrateFallback={<></>}>
    <Route index element={<Home />} />
    <Route path='user/register' element={<Register />} loader={() => signUpLoader(requireAuth())} />
    <Route path='user/activate' element={<Activate />} />
    <Route path='user/reset-password' element={<ResetPassword />} />
    <Route path='user/login' element={<SignIn />} loader={() => signInLoader(requireAuth())} />
    <Route path='auth/success' element={<OAuth />} />
    <Route path='auth/facebook/callback' element={<OAuth />} />
    <Route path='auth/github/callback' element={<OAuth />} />
    <Route path='user/dashboard' element={<Dashboard />} loader={() => dashboardLoader(requireAuth())}>
      <Route index element={<Overview />} loader={() => overviewLoader(requireAuth())} />
      <Route path='profile' element={<Profile />} loader={() => profileLoader(requireAuth())} />
      <Route path='*' element={<Page404 />} />
    </Route>
    <Route path='admin' element={<AdminLayout />} errorElement={<PageError />} HydrateFallback={<></>}>


    </Route>
    <Route path='*' element={<Page404 />} />
  </Route>
))

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={appRouter} />
    </LocalizationProvider>
  )
}

export default App
