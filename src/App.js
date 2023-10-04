// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import ChangePass from './components/ChangePass';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-pass' element={<ChangePass/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
