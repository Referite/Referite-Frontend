import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Home from './pages/Home';
import Record from './pages/Record';
import Login from './pages/Login';
import useToken from './components/UseToken';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function App() {
  
  // const [token, setToken] = useState<string>('');
  const token = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route index element = {<Home />}/>
          <Route path="/home" element = {<Home />}/>
          <Route path="/record" element = {<Record />}/>
          <Route path="/login" element={<Login setToken={setToken} />}/>
        </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
