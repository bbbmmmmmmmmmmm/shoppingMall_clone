import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Col, message, Row } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

function DetailProductPage(props) {
    const productId = props.match.params.productId;
    const [product, setProduct] = useState([]);

    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    setProduct(response.data.products[0]);
                } else {
                    message.error('상품 정보를 받아오지 못했습니다.');
                }
            })
    }, [])

    return (
        <div className='postPage' style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{product.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <ProductImage detail={product}/>
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo detail={product}/>
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage
