import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login & Register/Login';
import Home from './Components/Home/Home';
import Register from './Components/Login & Register/Register';
import NotFound from './Components/NotFound/NotFound';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
