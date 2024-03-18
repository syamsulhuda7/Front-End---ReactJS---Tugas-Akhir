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
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    filter: brightness(75%);
  }
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
  cursor: pointer;
`;
const ImgCategory = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    scale: 105%;
  }
`;

function CategoryProduct() {
  return (
    <Container>
      <Div>
        <H1>Category</H1>
        <H2>Explore Our Collections by Categories</H2>
      </Div>
      <Div style={{ flexDirection: "row", gap: "150px" }}>
        <div>
          <Img src="src/assets/profile/e.jpg"></Img>
          <DivText>
            <Text>Food</Text>
            <ImgCategory src="src/assets/arrow.png" />
          </DivText>
        </div>
        <div>
          <Img src="src/assets/profile/f.jpg"></Img>
          <DivText>
            <Text>Drink</Text>
            <ImgCategory src="src/assets/arrow.png" />
          </DivText>
        </div>
      </Div>
    </Container>
  );
}

export default CategoryProduct;
