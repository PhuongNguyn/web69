import { Breadcrumb, Button } from "antd"
import { Link } from "react-router-dom"


const ProductManagement = () => {
    return (
        <div>
            <Breadcrumb items={[{ title: 'Quản lí sản phẩm' }]} />
            <Button type="primary" style={{marginTop: '10px'}}><Link to={'/add-product'}>Thêm Sản Phẩm</Link></Button>
        </div>
    )
}

export default ProductManagement