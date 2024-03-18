import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 700px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 50px 100px 50px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const H1 = styled.h1`
  font-size: 80px;
  width: 500px;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
const Span = styled.span`
  margin: 0px 15px;
  color: gold;
`
const Button = styled.button`
font-size: 25px;
margin-top: 50px;
padding: 6px 15px;
border-radius: 10px;
background-color: transparent;
border: 3px solid black;
color: black;
cursor: pointer;
transition: all .2s ease-in-out;
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

&:hover {
  background-color: rgba(0,0,0,.1);
  scale: 103%;
}
`;
const moveDef = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(10%);
  }
`;
const Img1 = styled.img`
    height: 300px;
    width: auto;
    position: absolute;
    border-radius: 20px;
    box-shadow: 0px 0px 3px 1px;
    animation: ${moveDef} 5s linear alternate-reverse infinite;
`;
const Img2 = styled.img`
    height: 300px;
    width: auto;
    position: absolute;
    border-radius: 20px;
    box-shadow: 0px 0px 3px 1px;
    animation: ${moveDef} 4s linear alternate-reverse infinite;
`;
const Img3 = styled.img`
    height: 300px;
    width: auto;
    position: absolute;
    border-radius: 20px;
    box-shadow: 0px 0px 3px 1px;
    animation: ${moveDef} 3s linear alternate-reverse infinite;
`;

function Description() {

const navigate = useNavigate()

  return (
    <>
      <Container>
        <Div style={{width:'50%'}}>
          <H1>Professional <Span> Coffee Shop </Span> and <Span> Eatery </Span></H1>
          <Button onClick={()=>navigate('/profile')}>Detail</Button>
        </Div>
        <div style={{width:'50%'}}>
          <Img1 src="src/assets/profile/c.jpg" style={{top:'800px', right:'230px', height:'450px'}}/>
          <Img3 src="src/assets/profile/d.jpg" style={{top:'1050px', right:'80px'}}/>
          <Img2 src="src/assets/profile/b.jpg" style={{top:'1050px', right:'440px', height:'350px'}}/>
        </div>
      </Container>
    </>
  );
}

export default Description;
