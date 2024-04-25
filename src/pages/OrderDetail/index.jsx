import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import InvoiceShow from "../../components/InvoiceShow";

const Container = styled.div`
  min-height: 100vh;
  height: auto;
  width: 100%;
  background-color: #d0d0d0;
`;
const Header = styled.div`
  width: 100%;
  background-color: black;
  font-size: 40px;
  font-weight: bold;
  color: white;
  padding: 20px 50px;
`;
const Card = styled.div`
  width: 450px;
  background-color: gold;
  border: 1px solid black;
  box-shadow: 3px 3px 3px;
  border-radius: 20px;
  padding: 15px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  scrollbar-width: none;
`;
const H4 = styled.h4`
    padding-top: 5px;
    `
const Div = styled.div`
    padding-top: 5px;    
`
const Invoice = styled.button`
    margin: 10px;
    padding: 5px;
    border: transparent;
    border-radius: 5px;
    cursor: pointer;
    transition: all .15s ease-in-out;
    font-weight: bold;
    &:hover{
        background-color: #00000016;
        color: white;
    }
`

const stretchAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const Back = styled.button`
  height: 70px;
  width: 70px;
  margin: 20px;
  position: fixed;
  bottom: 0;
  border-radius: 50%;
  font-weight: bold;
  background-color: white;
  border: 5px double black;
  animation: ${stretchAnimation} 0.5s infinite alternate;
  cursor: pointer;
  transition: all .15s ease-in-out;
  &:hover{
    color: #705f00;
  }
`;
const Num = styled.div`
  font-weight: bold;
  position: absolute;
  background-color: black;
  color: gold;
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
`

const OrderDetail = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [popUpInvoice, setPopUpInvoice] = useState(false);
  const [idPopUp, setIdPopUp] = useState([]);

  const navigate = useNavigate();
  const token = useSelector((state) => state.account.account.token);

  useEffect(() => {
    const response = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataOrder(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    response();
  }, []);

  const handleInvoice = (e) => {
    setPopUpInvoice(true)
    setIdPopUp(e)
  }

  return (
    <Container>
        {popUpInvoice && <InvoiceShow idPopUp={idPopUp} setPopUpInvoice={setPopUpInvoice}/>}
      <Header>ORDER DETAIL</Header>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
        {dataOrder.map((item, i) => (
            <Card key={i}>
            <Num>{i+1}</Num>
            <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'10px'}}>
                    <div style={{padding:'5px',borderRadius:'10px',backgroundColor:'white'}}>#{item._id}</div>
                </div>
            <div>
                <H4>Product</H4>
                {item.order_items.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ paddingLeft: "15px" }}>{item.name}</p>
                    <p>x{item.qty}</p>
                </div>
                ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <H4>Total</H4>
                <Div>Rp {item.order_items.reduce((total, orderItem) => total + (orderItem.qty * orderItem.price), 0)}</Div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <H4>Status</H4>
                <Div>{item.status}</Div>
            </div>
            </div>
            <Invoice onClick={()=>handleInvoice(item._id)}>View Invoice</Invoice>
            </Card>
        ))}
      </div>
      <Back onClick={() => navigate("/")}>
        <p>Back to Home</p>
      </Back>
    </Container>
  );
};

export default OrderDetail;
