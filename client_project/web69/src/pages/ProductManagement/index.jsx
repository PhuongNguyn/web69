import { Breadcrumb, Button, Pagination, Table } from "antd"
import { Link } from "react-router-dom"
import {AiOutlineEdit} from "react-icons/ai"
import {BsFillTrashFill} from 'react-icons/bs'
import { getProduct } from "../../services"
import { useEffect, useState } from "react"

const ProductManagement = () => {
    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [products, setProducts] = useState([])
    const column = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name"
        },
        {
            title: "Người tạo",
            dataIndex: "user"
        },
        {
            title: "Gía",
            dataIndex: "price"
        },
        {
            title: "Số lượng",
            dataIndex: "quantity"
        },
        {
            title: "Action",
            render: () => {
                return <><AiOutlineEdit/><BsFillTrashFill/></>
            }
        }
    ]

    const getData = async () => {
        try {
            const result = await getProduct(pageSize, pageIndex)
            setProducts(result.data?.result?.products)
            setCount(result.data?.result?.count)
            setTotalPage(result.data?.result?.totalPage)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getData()
    },[pageSize, pageIndex])

    return (
        <div>
            <Breadcrumb items={[{ title: 'Quản lí sản phẩm' }]} />
            <Button type="primary" style={{marginTop: '10px'}}><Link to={'/add-product'}>Thêm Sản Phẩm</Link></Button>
            <Table
             style={{marginTop: '10px'}}
                dataSource={products}
                columns={column}
                pagination={false}
            ></Table>
            <Pagination
                style={{marginTop: '10px'}}
                pageSize={pageSize}
                total={count}
                current={pageIndex}
                onChange={(pageIndex, pageSize) => {
                    setPageIndex(pageIndex)
                    setPageSize(pageSize)
                }}
                showSizeChanger
            />
        </div>
    )
}

export default ProductManagement