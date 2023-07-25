import { useSelector } from "react-redux"


const HeaderLogin = () => {
    const user = useSelector((state) => state.user)
    console.log('rerender in header login')
    return (
        <>
            {user.username ? user.username : "Chua dang nhap"}
        </>
    )
}

export default HeaderLogin