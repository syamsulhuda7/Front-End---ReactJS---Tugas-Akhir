import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import styled from "styled-components";
import Description from "../../components/Description";
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
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(config.api_host)
        // const response = await axios.get(`${config.api_host}/api/products`);
        const response = await axios.get(`http://localhost:3000/api/products`);
        setGetData(response.data.data);
        console.log(getData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Carousel>
        {slides.map( (s, i) => (
          <Img src={s} key={i}/>
        ))}
      </Carousel>
      <Description/>
      {console.log(getData)}
    </>
  );
};

export default Home;
