import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: black;
  color: #ffe760;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 20px;
  padding: 10px;
  z-index: 2;
  box-shadow: 0px 0px 10px 1px grey;
  &:hover{
    color: white;
  }
`;
const Div = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #ffe760;
    border: 2px solid black;
    position: absolute;
    margin: 0px 0px 60px 70px;
    color: black;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`

// Komponen fungsional CircleComponent
const Menu = () => {
    const [data, setData] = useState([])

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
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    response();
  }, []);

  return (
    <Circle onClick={()=>navigate('/orderdetail')}>
        <p style={{textAlign:'center'}}>My Order</p>
        <Div>{data?.length}</Div>
    </Circle>
  );
};

export default Menu;
