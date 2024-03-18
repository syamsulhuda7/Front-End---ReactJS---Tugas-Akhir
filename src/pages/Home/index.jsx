import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import styled from "styled-components";
import Description from "../../components/Description";
import CategoryProduct from "../../components/CategoryProduct";
// import config from "../../config";
// import CardProduct from "../../components/CardProduct";

const Img = styled.img`
    width: 100%;
    height: auto;
`

const slides = [
  'src/assets/carousel/1.jpg',
  'src/assets/carousel/2.jpg',
  'src/assets/carousel/3.jpg',
  'src/assets/carousel/4.jpg',
  'src/assets/carousel/5.jpg'
]

const Home = () => {


  return (
    <>
      <Navbar />
      <Carousel autoSlide={true}>
        {slides.map( (s, i) => (
          <Img src={s} key={i}/>
        ))}
      </Carousel>
      <Description/>
      <CategoryProduct/>

    </>
  );
};

export default Home;
