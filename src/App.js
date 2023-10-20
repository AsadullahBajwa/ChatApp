// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import ChangePass from './components/ChangePass';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatSectionComponent from './components/ChatSectionComponent';
import Example from './components/Example';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-pass' element={<ChangePass/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/chat/:room_id/:room_name" element={<Home/>}/>
        <Route path='/example' element={<Example/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
