import { Route, Routes } from "react-router"
import NonAuthLayout from "../layouts/NonAuth"
import Login from "../pages/Login"
import MainLayout from "../layouts/MainLayout"
import Dashboard from "../pages/Dashboard"
import { useDispatch, useSelector } from "react-redux"
import NotFoundPage from "../pages/404Page"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { getValueFromLocalStorage } from "../utils"
import { login } from "../redux/actions/user"

const AppRouter = () => {
    const user = useSelector((state) => state.user)
    const userFromLocalStorage = getValueFromLocalStorage("user")
    const dispatch = useDispatch()

    useEffect(()=>{
        if(userFromLocalStorage?._id){
            dispatch(login(userFromLocalStorage))
        }
    },[])
    return (
        <Routes>
            <Route path="/auth" element={<NonAuthLayout/>}>
                <Route path="/auth/login" element={<Login />}/>
            </Route>
            {(user?._id || userFromLocalStorage?._id) && <Route path="/" element={<MainLayout/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>}
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default AppRouter