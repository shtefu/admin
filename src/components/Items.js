import React, {useState, useEffect} from 'react';
import Item from './simplifiers/Item';
import axios from 'axios';
import Form from './simplifiers/Form';

const INITIAL_STATE = {
    img_url:"",
    price: "",
    name:""
}

export default function(props){
    const { handleChange, details } = Form(INITIAL_STATE);
    if (!props.data.id){
        return(
            <p>Please log in</p>
        )
    }
    const [error, setErr] = useState(null)
    const [apiErr, setApiErr] = useState(null);

    function submit(e){
            e.preventDefault();
            if (isNaN(parseFloat(details.price))){
                setErr("Please enter a valid price");
                return;
            }
            if (!details.price || !details.img_url || !details.name){
                setErr("Please fill all fields");
                return;
            }

            async function fetchData() {
                await axios({
                    method: 'post',
                    url: '/api/admin/add',
                    data: details,
                    headers: {"Authorization": "Bearer " + props.data.token}
                }).then((result) => { console.log("success")}).catch((error) => { setApiErr(error) });
            }
            fetchData()
            props.refresh();
        }
    
    function del(e){
        e.preventDefault();
        let url= '/api/admin/delete/' + e.target.name
        async function fetchData() {
            
            await axios({
                method: 'delete',
                url: url,
                data: {id:e.target.name},
                headers: {"Authorization": "Bearer " + props.data.token}
            }).then((result) => { console.log(result)}).catch((error) => { console.log(error) });
        }
        fetchData();
        props.refresh();
    }
    const items = props.items.map((thing)=><Item key={thing.id} thing={thing} del={del}/>)
    
    
    
    
    return(
        <div className="menu">
            <div className="addItem">
                <form>
                    <input type="text" placeholder="Img url" name="img_url" onChange={handleChange}/>
                    <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
                    <input type="text" placeholder="Price" name="price" onChange={handleChange}/>
                </form>
                <button onClick={submit}>Add Item</button>
                {error}
            </div>
            {items}
        </div>
    )
    
    
}