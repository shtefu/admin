import React, { useState } from 'react';

export default function(props){
    const [qty, setQty] = useState(0)
    function add(e){
        props.set(props.thing.id, qty+1);
        setQty(qty+1);
        
    }
    function sub(e){
        if(qty<1){
            return;
        }
        props.set(props.thing.id, qty-1);
        setQty(qty-1);
        
    }

    return(
        <div className="Item">
            <img src={props.thing.img_url} alt="image"></img>
            <b name="id">{props.thing.id}</b>
            <div className="qty"></div>
            <h3>{props.thing.name}</h3>
            <b>Price: ${props.thing.price}</b>
            <button onClick={props.del} name={props.thing.id}>Delete</button>           
        </div>
    )
}