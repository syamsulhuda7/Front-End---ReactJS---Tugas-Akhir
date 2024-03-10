import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
// import CardProduct from "../../components/CardProduct";

const Home = () => {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(config.api_host)
        const response = await axios.get(`${config.api_host}/api/products`);
        // const response = await axios.get(`http://localhost:3000/api/products`);
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
      {console.log(getData)}
    </>
  );
};

export default Home;
