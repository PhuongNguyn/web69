import { Route, Routes } from "react-router"
import NonAuthLayout from "../layouts/NonAuth"
import Login from "../pages/Login"
import MainLayout from "../layouts/MainLayout"
import Dashboard from "../pages/Dashboard"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth" element={<NonAuthLayout/>}>
                <Route path="/auth/login" element={<Login />}/>
            </Route>
            <Route path="/app" element={<MainLayout/>}>
                <Route path="/app/dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}

export default AppRouter