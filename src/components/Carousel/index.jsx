/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  overflow: hidden;
  position: relative;
//   box-shadow: 0px 5px 10px 5px;
`;

const Slide = styled.div`
  display: flex;
  transition-timing-function: ease-out;
  transition-duration: 500ms;
`;

const CoverButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const Button = styled.button`
height: 40px;
width: 40px;
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
border: transparent;
border-radius: 50%;
background-color: transparent;
transition: all 0.1s ease-in-out;

&:hover {
  scale: 105%;
  background-color: rgba(255, 255, 255, 0.3);
}
`;

const Img = styled.img`
  height: 20px;
  width: 20px;
`;

const ContMark = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;
  left: 0;
`;

const CoverMark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Mark = styled.div`
  transition: all 0.3s;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 0%;
`;

function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {

  const [curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((curr) => (curr == 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr == slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <Container>
      <Slide style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides}
      </Slide>
      <CoverButton>
        <Button onClick={prev} style={{}}>
          <Img src="src/assets/back.png" />
        </Button>
        <Button onClick={next}>
          <Img src="src/assets/front.png" />
        </Button>
      </CoverButton>
      <ContMark>
        <CoverMark>
          {slides.map((_, i) => (
            <Mark
              key={i}
              style={{
                padding: curr == i ? "7px" : "0",
                backgroundColor:
                  curr == i
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(255, 255, 255, 0.2)",
              }}
            />
          ))}
        </CoverMark>
      </ContMark>
    </Container>
  );
}

export default Carousel;
