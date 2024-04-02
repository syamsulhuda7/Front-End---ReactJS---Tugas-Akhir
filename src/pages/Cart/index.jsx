import { useNavigate } from "react-router-dom";
import CardCart from "../../components/CardCart";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: auto;
  flex-direction: column;
  justify-content: space-between;
`
const Divback = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.15s ease-in-out;
  &:hover {
    scale: 102%;
  }
`
const Back = styled.div`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
const Dback = styled.img`
  height: 20px;
  padding-right: 10px;
  cursor: pointer;
`
const Header = styled.div`
  width: 100%;
  font-weight: bold;
  color: white;
  height: 50px;
  border-bottom: 3px solid black;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
`;
const Div = styled.div`
  width: 250px;
  display: flex;
  justify-content: center;
`;
const Checkout = styled.button`
  margin: 15px 35px 15px 35px;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  border: transparent;
  background-color: black;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all .15 ease-in-out;
  &:hover{
    color: gold;
  }
`

function Cart() {
  const [data, setData] = useState([])
  const [id, setId] = useState('')
  const navigate = useNavigate();

  // Mencari total harga produk
  // const price = useSelector((state) => state.counter.carts)
  const totalPerProduct = data.map(item => parseInt(item.price)*parseInt(item.qty))
  const totalPrice = totalPerProduct.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const scrollTop = () => {
    scrollTo({
        behavior: 'instant',
        top: '0'
    })
  }

  const toCheckout = () => {
    navigate("/checkout")
    scrollTop()
  }

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
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
    };

    response();
  }, [id]);

  return (
    <Container>
      <div>
        <Header>
          <Div>IMAGE</Div>
          <Div>NAME</Div>
          <Div>PRICE</Div>
          <Div>QUANTITY</Div>
          <Div>TOTAL</Div>
          <Div style={{width:'100px'}}>DELETE</Div>
        </Header>
        <CardCart sendId={setId} />
      </div>
      <div style={{position:'sticky',bottom:'0px',backgroundColor:'#fff1a4',display:'flex',borderTop:'5px solid black'}}>
        <div style={{width:'100%',padding:'20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Divback>
              <Dback src="src/assets/dback.png" alt="" />
              <Back onClick={() => navigate("/product")}> back to Product </Back>
            </Divback>
          <h2><span style={{color:'#000',fontWeight:'normal'}}>Total : </span> Rp {totalPrice}</h2>
        </div>
        <Checkout onClick={toCheckout}>Checkout</Checkout>
      </div>
    </Container>
  );
}

export default Cart;
