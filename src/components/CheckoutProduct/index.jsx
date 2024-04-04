import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Number = styled.div`
    background-color: black;
    color: gold;
    margin: 0px 10px 0px 0px;
    font-size: 15px;
    font-weight: bold;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Container = styled.div`
    padding: 10px;
    margin: 5px;
    background-color: gold;
    box-shadow: 3px 3px 3px;
    display: flex;
    width: 425px;
`
const Img = styled.img`
    height: 100px;
`

const CheckoutProduct = () => {
    const [carts, setCarts] = useState([])
    
    const token = useSelector(state => state.account.account.token)

    useEffect(() => {
        const response = async () => {
            try {
              const response = await axios.get(
                `http://localhost:3000/api/carts`, {
                  headers: {
                    'Authorization': `Bearer ${token}` // Menambahkan token ke header permintaan
                  }
                });
              setCarts(response.data);
            } catch (error) {
              console.log(error);
            }
        };
    
        response();
      }, []);

    return (
        <>
        {carts.map((item, i) => (
            <Container key={item._id}>
                <Number>{i+1}</Number>
                <Img src={`http://localhost:3000/images/products/${item.image_url}`}/>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'5px 15px'}}>
                    <h2>{item.name?.toUpperCase()}</h2>
                    <h3>{item.price*item.qty}</h3>
                    <div> x{item.qty}</div>
                </div>
            </Container>
        ))}
        </>
    )
}

export default CheckoutProduct