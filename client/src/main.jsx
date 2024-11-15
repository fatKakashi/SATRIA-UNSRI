import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './login.jsx'
import CheckDataMahasiswa from './CheckDataMahasiswa.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
