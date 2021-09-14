import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Card, Col, Icon, message, Row, Typography } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);
    const [filters, setFilters] = useState({
        continents: [],
        price: []
    })

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
                    if (variables.loadMore) {
                        setProducts([...products, ...response.data.products]);
                    } else {
                        setProducts(response.data.products);
                    }
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
            limit,
            loadMore: true
        }

        getProducts(variables);
        setSkip(skipTemp);
    }

    const showFilterResults = (filters) => {
        const variables = {
            skip: 0,
            limit,
            filters
        }

        getProducts(variables);
        setSkip(0);
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array;
    }

    const handleFilters = (Filters, category) => {
        const newFilters = { ...filters }

        newFilters[category] = Filters;

        if (category === 'price') {
            let priceValues = handlePrice(Filters);
            newFilters[category] = priceValues;
        }

        showFilterResults(newFilters);
        setFilters(newFilters);
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2}>Let's Travel Anywhere <Icon type='rocket'/></Title>
            </div>

            <Row gutter={[16, 16]}>
            {/* Filter */}
                <Col lg={12} xs={24}>
                    <CheckBox
                        list={continents}
                        handleFilters={filters => handleFilters(filters, 'continents')}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, 'price')}
                    />
                </Col>
            </Row>

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
