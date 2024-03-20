/* eslint-disable react/prop-types */
import styled from "styled-components";

const Cover = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;
const Container = styled.div`
  width: 250px;
  height: 400px;
  margin: 20px;
  border-radius: 10px;
  background-color: rgb(255, 215, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Img = styled.img`
  width: 230px;
  height: 230px;
  border-radius: 10px;
`;
const Div = styled.div`
  width: 230px;
  height: 140px;
  padding: 0px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const DivHarga = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  color: white;
  background-color: gold;
  border: 3px solid gold;
  border-radius: 5px;
  cursor: pointer;
  transition: all.2s ease-in-out;
  margin-top: 8px;

  &:hover {
    scale: 103%;
  }
`;
const DivUp = styled.div`
  height: 83px;
  width: 100%;
`;
const DivDown = styled.div`
  height: 60px;
  width: 100%;
`;

function CardProduct({ data, nilaiId, popUp }) {

  function handleClick (id) {
    nilaiId(id)
    popUp(true)
  }


  return (
    <Cover>
      {data.map((item, i) => (
        <Container key={i} >
          <Img
            src={`http://localhost:3000/images/products/${item.image_url}`}
          ></Img>
          <Div>
            <DivUp style={{ overflow: "hidden" }}>
              <div style={{display:'flex', justifyContent:'center'}}>
                <h3>{item.name.toUpperCase()}</h3>
              </div>
              <p style={{ color: "rgb(0,0,0,.7)" }}>{item.description}</p>
            </DivUp>
            <DivDown>
              <DivHarga>
                <h4>Rp. {item.price}</h4>
                <h4>Stock {item.stock} pcs</h4>
              </DivHarga>
              <Button onClick={()=>handleClick(item._id)}>Buy</Button>
            </DivDown>
          </Div>
        </Container>
      ))}
    </Cover>
  );
}

export default CardProduct;
