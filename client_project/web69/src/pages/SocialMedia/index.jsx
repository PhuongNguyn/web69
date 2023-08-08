import { Breadcrumb, Button, Pagination, Table } from "antd"
import { Link } from "react-router-dom"
import { AiOutlineEdit } from "react-icons/ai"
import { BsFillTrashFill } from 'react-icons/bs'
import { getProduct } from "../../services"
import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component';
import { CLOUDINARY_URL_IMAGE } from '../../constant'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SocialMedia = () => {
    const [pageSize, setPageSize] = useState(5)
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
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
                return <><AiOutlineEdit /><BsFillTrashFill /></>
            }
        }
    ]

    const getData = async () => {
        try {
            setLoading(true)
            const result = await getProduct(pageSize, pageIndex)
            setProducts([...products, ...result.data?.result?.products])
            setCount(result.data?.result?.count)
            setTotalPage(result.data?.result?.totalPage)

        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 30000)
        }
    }

    useEffect(() => {
        getData()
    }, [pageSize, pageIndex])

    const renderSkeleton = () => {
        return (
            <div>
                <div>
                    <Skeleton count={1} />
                </div>
                <div style={{width: '50%'}}>
                    <Skeleton count={1} />
                </div>
                <div>
                    <Skeleton count={1} />
                </div>
                <Skeleton count={1} />

            </div>
        )
    }

    return (
        <div>
            <Breadcrumb items={[{ title: 'Quản lí sản phẩm' }]} />
            <Button type="primary" style={{ marginTop: '10px' }}><Link to={'/add-product'}>Thêm Sản Phẩm</Link></Button>

            <InfiniteScroll
                dataLength={count}
                next={() => {
                    setPageIndex(pageIndex + 1)
                }}
                hasMore={products?.length < count}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {products.map(product => <div style={{ border: '1px solid black', marginTop: '20px', padding: '10px' }}>
                    <p>{product.name}</p>
                    <img src={`${CLOUDINARY_URL_IMAGE}/${product?.image}`} width={100} height={100} />
                    <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                </div>)}
            </InfiniteScroll>
            <div style={{ marginTop: '20px' }}>{loading && renderSkeleton()}</div>
        </div>
    )
}

export default SocialMedia