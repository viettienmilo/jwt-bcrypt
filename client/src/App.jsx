import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home.jsx'
import SignUp from './pages/Register.jsx';
import SignIn from './pages/Login.jsx';
import { Dashboard, loader as dashboardLoader } from './pages/protected/Dashboard.jsx';
import Page404 from './components/Page404.jsx';
import PageError from './components/PageError.jsx';
import Profile from './pages/protected/Profile.jsx';

function App() {
  const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<PageError />} >
      <Route index element={<Home />} />
      <Route path='register' element={<SignUp />} />
      <Route path='login' element={<SignIn />} />
      <Route path='dashboard' element={<Dashboard />} loader={dashboardLoader} />
      <Route path='profile' element={<Profile />} />
      <Route path='*' element={<Page404 />} />
    </Route>
  ))

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
