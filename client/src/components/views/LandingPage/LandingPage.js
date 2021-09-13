import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Card, Col, Icon, message, Row, Typography } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);

    useEffect(() => {
        const variables = {
            skip,
            limit
        }

        getProducts(variables);
    }, [])
    
    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.products);
                    setProducts([...products, ...response.data.products]);
                    setPostSize(response.data.postSize);
                } else {
                    message.error('상품 리스트를 불러오는데 실패했습니다.');
                }
            })
    }

    const renderCards = products.map((product, index) => {
        return <Col key={index} lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<ImageSlider images={product.images} />}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const onLoadMore = () => {
        let skipTemp = skip + limit;

        const variables = {
            skip: skipTemp,
            limit
        }

        getProducts(variables);
        setSkip(skipTemp);
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2}>Let's Travel Anywhere <Icon type='rocket'/></Title>
            </div>

            {/* Filter */}


            {/* Search */}


            {products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <Title level={2}>No post yet...</Title>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br /><br />
            {postSize >= limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
