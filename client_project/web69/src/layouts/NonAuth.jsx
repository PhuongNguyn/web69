import { Outlet } from "react-router"


const NonAuthLayout = () => {
    return (
        <div>
            Login layout
            <Outlet />
        </div>
    )
}

export default NonAuthLayout