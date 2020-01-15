import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Items from './components/Items';
import Orders from './components/Orders';
import Land from './components/Land';


export default function () {
    const [menu, setMenu] = useState(null);
    const [orders, setOrdersRaw] = useState(null);
    const [user, setUser] = useState({
        email: "Guest",
        points: 0,
        token: "",
        id: null,
    });
    const [err, setErr] = useState(null);

    function logOut(){
        setUser({
            email: "Guest",
            points: 0,
            token: "",
            id: null
        });
    };
    function change(thing) {

        setUser({
            ...user,
            ...thing
        });
    }
    function what(){
        async function fetchData() {
        await axios({
          method: 'get',
          url: '/api/admin/items',
          headers: {"Authorization": "Bearer " + user.token}
        }).then((result) => { setMenu(result.data); }).catch((error) => { setErr(error) });

      }

      fetchData()

    };
    function what2(){
        async function fetchData() {
        await axios({
          method: 'get',
          url: '/api/admin/getOrders',
          headers: {"Authorization": "Bearer " + user.token}
        }).then((result) => { setOrdersRaw(result.data); }).catch((error) => { setErr(error) });

      }

      fetchData()

    };

    if (!menu && user.id){

        what();
        what2();


    }


    return (

        <div>
            <Router>
                <NavBar data={user} log={logOut} />
                <Route exact path ='/'>
                <Land/>
                </Route>

                <Route path="/login">
                    <Login changeDis={change} />
                </Route>

                <Route path="/items">
                    <Items data={user} items={menu} refresh={what}/>
                </Route>

                <Route path="/orders">
                    <Orders orders={orders}/>
                </Route>
            </Router>
        </div>
    )
}
