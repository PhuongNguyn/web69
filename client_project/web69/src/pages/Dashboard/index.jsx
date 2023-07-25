import { useSelector } from "react-redux"

const Dashboard = () => {
    const user = useSelector((state)=>state.user)

    return (
        <>{user.username}</>    
    )
}

export default Dashboard