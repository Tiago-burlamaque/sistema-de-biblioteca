import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import { Bounce, ToastContainer } from 'react-toastify'
import Home from './pages/Home/Home.jsx'
import Biblioteca from './pages/Biblioteca/Biblioteca.jsx'
import Layout from './ui/Layout.jsx'
import RegisterBook from './pages/RegisterBook/RegisterBook.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/home', element: <Home /> },
  {
    element: <Layout />,
    children: [
      { path: '/book/library', element: <Biblioteca /> },
      { path: '/book/register', element: <RegisterBook /> },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
  </StrictMode>,
)
