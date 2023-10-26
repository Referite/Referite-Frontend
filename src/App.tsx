import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Record from './pages/Record';
import Login from './pages/Login';

function App() {
  
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route index element = {<Home />}/>
          <Route path="/home" element = {<Home />}/>
          <Route path="/record" element = {<Record />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
