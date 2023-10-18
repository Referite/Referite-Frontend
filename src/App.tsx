import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Record from './pages/Record';

function App() {
  
  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route index element = {<Home />}/>
            <Route path="/home" element = {<Home />}/>
            <Route path="/record" element = {<Record />}/>
          </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
