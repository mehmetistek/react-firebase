
import {Toaster} from "react-hot-toast"
import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  
  return (
    <>
      <Toaster  position='to-right'/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </>
  );
}

export default App;
