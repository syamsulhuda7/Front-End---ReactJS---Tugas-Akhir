/* eslint-disable react/prop-types */
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import CardProduct from "../../components/CardProduct";
import FilterProduct from "../../components/FilterProduct";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import ProductNotFound from "../../components/ProductNotFound";
import PopUpProduct from "../../components/PopUpProduct";

function Product() {
  const [getData, setGetData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [idValue, setIdValue] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products?skip=${skip}`
        );
        setGetData(response.data.data);
        setRawData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [skip]);

  // Pencarian
  useEffect(() => {
    if (inputValue != '') {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/products?q=${inputValue}`
          );
          if(response.data.count == 0 || response.data.count == '') {
            setSearchResult('x')
          } else {
            setSearchResult(response.data.data);
          }
        } catch (err) {
          console.log("Eror fetching data", err);
        }
      };
  
      fetchData();
    }
  
}, [inputValue]);

  return (
    <>
      <div>
        <Navbar inputValue={setInputValue} />
        <div
          style={{ height: "65px", width: "100%", backgroundColor: "black" }}
        ></div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FilterProduct />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "1220px",
              height: "auto",
            }}
          >
            {searchResult == "x" ? (
              <ProductNotFound inputValue={inputValue} />
            ) : (
              <>
                <div>
                  <h1 style={{ padding: "20px 50px", paddingBottom: "0px" }}>
                    Product List
                  </h1>
                  <CardProduct nilaiId={setIdValue} popUp={setShowPopUp}
                    data={searchResult.length > 0 ? searchResult : getData}
                  ></CardProduct>
                </div>
                {searchResult.length > 0 || <Pagination skip={skip} setSkip={setSkip} rawData={rawData} />}
              </>
            )}
          </div>
        </div>
      )}
      <>
      {showPopUp === true && <PopUpProduct closePopUp={setShowPopUp} idValue={idValue}/>
}
      </>
    </>
  );
}

export default Product;
