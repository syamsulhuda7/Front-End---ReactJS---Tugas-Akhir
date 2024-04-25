import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 700px;
  width: auto;
  background-color: black;
  margin: 0px 100px;
  margin-bottom: 50px;
  border-radius: 20px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
`;
const H1 = styled.h1`
  color: gold;
  font-size: 80px;
`;
const H2 = styled.h2`
  color: white;
  font-size: 40px;
`;
const Img = styled.img`
  height: 300px;
  border-radius: 30px;
  filter: brightness(50%);
  transition: all 0.2s ease-in-out;
`;
const DivText = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  top: 2050px;
  margin: 10px 20px;
  background-color: rgba(2, 2, 200, 0.2);
  width: 400px;
  height: 0px;
`;
const Text = styled.p`
  color: white;
  font-size: 50px;
`;
const ImgCategory = styled.img`
  background-color: #ffffff6b;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    scale: 105%;
  }
`;

function CategoryProduct() {

  const navigate = useNavigate();

  const scrollTop = () => {
    scrollTo({
        behavior: 'instant',
        top: '0'
    })
  }

  const handleClick = () => {
    navigate("/product")
    scrollTop()
  }

  return (
    <Container>
      <Div>
        <H1>Products</H1>
        <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
          <H2>Explore Our Foods and Drinks</H2>
          <ImgCategory onClick={handleClick} src="src/assets/arrow.png" />
        </div>
      </Div>
      <Div style={{ flexDirection: "row", gap: "150px" }}>
        <div>
          <Img src="src/assets/profile/e.jpg"></Img>
          <DivText>
            <Text>Food</Text>
          </DivText>
        </div>
        <div>
          <Img src="src/assets/profile/f.jpg"></Img>
          <DivText>
            <Text>Drink</Text>
          </DivText>
        </div>
      </Div>
    </Container>
  );
}

export default CategoryProduct;
