import { Breadcrumb, Button, Form, Input, Upload } from "antd"
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from "antd/es/form/Form";
import { createProduct, editProduct, getProductById } from "../../services";
import {toast} from 'react-hot-toast'
import { useParams } from "react-router";

const AddEditProduct = () => {
    const { id } = useParams()
    const editorRef = useRef(null);
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)

    const [form] = Form.useForm();

    const getProduct = async () => {
        try {   
            const result = await getProductById(id)

            setContent(result.data?.content)
            setDescription(result.data?.description)
            setImage(result.data?.image)
            form.setFieldValue("name", result.data?.name)
            form.setFieldValue("slug", result.data?.slug)
            form.setFieldValue("price", result.data?.price)
            form.setFieldValue("quantity", result.data?.quantity)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadProduct = async () => {
        try {
            const name = form.getFieldValue("name")
            const slug = form.getFieldValue("slug")
            const quantity = form.getFieldValue("quantity")
            const price = form.getFieldValue("price")

            const data = new FormData()

            data.append("name", name)
            data.append("slug", slug)
            data.append("quantity", quantity)
            data.append("price", price)
            data.append("description", description)
            data.append("content", content)
            if(image){
                data.append("image", image.originFileObj)
            }

            if(!id){
                const result = await createProduct(data)
                toast.success("Tao san pham thanh cong")
            }else{
                const result = await editProduct(id, data)
                toast.success("Cap nhat san pham thanh cong")
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        if(id){
            getProduct()
        }
    },[])

    return (
        <>
            <Breadcrumb items={[{ title: id ? "Sửa sản phẩm":"Thêm sản phẩm" }]} />
            <Form form={form} style={{ marginTop: '15px' }} onFinish={uploadProduct}>
                <Form.Item label="Tên sản phẩm" name="name">
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item label="slug" name="slug">
                    <Input placeholder="Nhập slug sản phẩm" />
                </Form.Item>
                <Form.Item label="Số lượng" name="quantity">
                    <Input placeholder="Nhập số lượng sản phẩm" />
                </Form.Item>
                <Form.Item label="Giá" name="price">
                    <Input placeholder="Nhập gía sản phẩm" />
                </Form.Item>
                <div style={{ marginTop: '10px' }}>
                    <label>Mô tả:</label>
                    <Editor
                        apiKey="5s5cq0qxphgwr8wjxmjp4m3hjywrm9czcx1h2dj8pj4tvq3l"
                        onEditorChange={(value) => setDescription(value)}
                        onInit={(evt, editor) => editorRef.current = editor}
                        value={description}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label>Nội dung: </label>
                    <Editor
                        apiKey="5s5cq0qxphgwr8wjxmjp4m3hjywrm9czcx1h2dj8pj4tvq3l"
                        onEditorChange={(value) => setContent(value)}
                        value={content}
                        init={{
                            height: 300,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount' 
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help' +
                                'image',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label>Thumbnail: </label>
                    <Upload type="single" action={false} onChange={(file) => setImage(file.file)}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                <Button style={{marginTop: '15px', marginBottom: '15px'}} type="primary" htmlType="submit">{id ? "Cập nhật sản phẩm" : "Đăng sản phẩm"}</Button>
            </Form>

        </>
    )
}

export default AddEditProduct