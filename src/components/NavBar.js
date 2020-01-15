import React from 'react';
import {Link} from 'react-router-dom';

export default function (props){

    if (props.data.id){
        return(
            <div className="navbar">
                <div className="links">
                    <Link to='/'>Home</Link>
                    <Link to='/items'>Items</Link>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/' onClick={props.log}>Log out</Link>
                </div>
                <div className="You">
                    {props.data.email}
                </div>
            </div>
            )

    }
    ///uwu
    else{
        return(
            <div className="navbar">
            <div className="links">
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
            </div>
            <div className="You">
                {props.data.email} 
             </div>
            </div>
        )
    }


}