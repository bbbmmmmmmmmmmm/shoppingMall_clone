import React, { useState } from 'react'
import { Button, Form, Input, message, Typography } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    { key: 1, value: 'Africa' },
    { key: 2, value: 'Europe' },
    { key: 3, value: 'Asia' },
    { key: 4, value: 'North America' },
    { key: 5, value: 'South America' },
    { key: 6, value: 'Australia' },
    { key: 7, value: 'Antarctica' }
]

function UploadProductPage(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);
    const [images, setImages] = useState([]);

    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'price') {
            setPrice(value);
        } else if (name === 'continent') {
            setContinent(value);
        }
    }

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!title || !description || !price || !continent || !images) {
            return message.error('빈 칸을 모두 채워주세요.');
        }

        const variable = {
            writer: props.user.userData._id,
            title,
            description,
            price,
            images,
            continent
        }

        Axios.post('/api/product/uploadProduct', variable)
            .then(response => {
                if (response.data.success) {
                    message.success('해당 상품이 등록되었습니다.');
                    setTimeout(() => {
                        props.history.push('/');
                    }, 3000);
                } else {
                    message.error('해당 상품을 등록하는데 실패했습니다.');
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Travel Product</Title>
            </div>

            <Form onSubmit={onSubmit}>
                {/* Dropzone */}
                <FileUpload refreshFunction={updateImages}/>

                <br />
                <br />
                <label>Title</label>
                <Input
                    name='title'
                    value={title}
                    onChange={onChange}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    name='description'
                    value={description}
                    onChange={onChange}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input
                    name='price'
                    type='number'
                    value={price}
                    onChange={onChange}
                />
                <br />
                <br />
                <select name='continent' onChange={onChange}>
                    {Continents.map((item) => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type='primary' onClick={onSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
