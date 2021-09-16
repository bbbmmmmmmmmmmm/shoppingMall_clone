import { Empty, message, Result } from 'antd';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        let cartItems = [];

        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach((item) => {
                    cartItems.push(item.id);
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }
    }, [props.user.userData])

    useEffect(() => {
        if (props.user.cartDetail && props.user.cartDetail.length > 0) {
            calculateTotal(props.user.cartDetail)
        }
    }, [props.user.cartDetail])

    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map((item) => {
            total += item.price * item.quantity;
        })
        setTotal(total);
        setShowTotal(true);
    }

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(() => {
                Axios.get('/api/users/userCartInfo')
                    .then(response => {
                        if (response.data.success) {
                            if (response.data.cartDetail.length <= 0) {
                                setShowTotal(false);
                            } else {
                                calculateTotal(props.user.cartDetail);
                            }
                        } else {
                            message.error('카트 정보를 받아오는데 실패했습니다.');
                        }
                    })
            })

    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <div>
                <UserCardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                />
            </div>
            {showTotal ?
                <div style={{ marginTop: '3rem' }}>
                    <h2>Total amount: ${total}</h2>
                </div>
                :
                showSuccess ?
                    <Result
                        status='success'
                        title='Successfully Purchased Items'
                    /> :
                    <div style={{
                        width: '100%', display: 'flex', flexDirection: 'column'
                        , justifyContent: 'center'
                    }}>
                        <br />
                        <Empty description={false} />
                        <p>No Items In the Cart</p>
                    </div>
            }
        </div>
    )
}

export default CartPage
