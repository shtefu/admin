import React from 'react';

export default function(props){
    if (!props.orders){
        return(
            <p>Not logged in</p>
        );
    }
    console.log(props.orders);
    const orders = props.orders.map((order)=>{return (
        <div className="order">
            <p>
                Order id: {order.id}
            </p>
            <p>Order qty: {order.qty}</p>
            <p>Order date:{order.created_at}</p>
        </div>
    )});
    return(
        <div className="Orders">
            {orders}
        </div>
    )

}