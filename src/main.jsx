
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createHashRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import Welcome from './pages/Welcome.jsx'
import Catalog from './pages/Catalog.jsx'
import DogDetail from './pages/DogDetail.jsx'


const router = createHashRouter([
  { path: '/', element: <Layout><Welcome/></Layout> },
  { path: '/catalog', element: <Layout><Catalog/></Layout> },
  { path: '/dogs/:id', element: <Layout><DogDetail/></Layout> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)