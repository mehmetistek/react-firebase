import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout, auth, emailVerication } from './../firebase';
import { logout as logoutHandle } from "../store/auth"
import { useNavigate } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";
import { useEffect } from "react";

export default function Home() {

     const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user } = useSelector(state => state.auth)
    const handleLogout = async() => {
   await logout()
   dispatch(logoutHandle())
   navigate('/login',{
    replace: true
   })
    }

    

    const handleVerification = async() => {
await emailVerication()
    }
    if(user) {
        return (
            <div className="max-w-2xl mx-auto py-5">
                <h1 className="flex gap-x-4 items-center">
                    {user.photoURL && <img src= {user.photoURL} className="w-7 h-7 rounded-full"/>}
                    Oturumun açık ({user.email})
                  <button onClick={handleLogout} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">Çıkış Yap</button>
                  {!user.emailVerified && 
                   <button onClick={handleVerification} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">E-posta  Onaylandı</button>}
                  
                  </h1>


                  <UpdateProfile/>
            </div>
        )
    }
    return(
        <div>
           <Link to="/register">Kayıt ol</Link>
           <Link to="/login">Giriş yap</Link>
        </div>
    )
}