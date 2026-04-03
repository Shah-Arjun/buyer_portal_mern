import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App