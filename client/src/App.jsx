import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home.jsx'
import SignUp from './pages/Register.jsx';
import SignIn from './pages/Login.jsx';
import { Dashboard, loader as dashboardLoader } from './pages/protected/Dashboard.jsx';



function App() {

  const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='register' element={<SignUp />} />
      <Route path='login' element={<SignIn />} />
      <Route path='dashboard' element={<Dashboard />} loader={dashboardLoader} />
    </Route>
  ))

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
