import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App