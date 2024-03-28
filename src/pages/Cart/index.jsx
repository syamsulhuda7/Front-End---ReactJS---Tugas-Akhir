import { useNavigate } from "react-router-dom";
import CardCart from "../../components/CardCart";
import styled from "styled-components";

const Back = styled.div`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  padding: 10px;

  &:hover {
    color: gold;
  }
`;
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

function Cart() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Back onClick={() => navigate("/product")}> - back to Product </Back>
      </div>
      <Header>
        <Div>IMAGE</Div>
        <Div>NAME</Div>
        <Div>QUANTITY</Div>
        <Div>DELETE</Div>
      </Header>
      <CardCart />
    </>
  );
}

export default Cart;
