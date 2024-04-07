import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Circle = styled.div`
  width: 70px;
  height: 70px;
  background-color: black;
  color: #ffe760;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: fixed;
  bottom: 130px;
  right: 20px;
  font-size: 12px;
  padding: 10px;
  z-index: 2;
  box-shadow: 0px 0px 10px 1px grey;
  transition: all .15s ease-in-out;
  &:hover{
    color: white;
  }
`

const MenuAddProduct = () => {

  const navigate = useNavigate();

  return (
    <Circle onClick={()=>navigate('/addproduct')}>
        <p style={{textAlign:'center'}}>Add Product</p>
    </Circle>
  );
};

export default MenuAddProduct;
