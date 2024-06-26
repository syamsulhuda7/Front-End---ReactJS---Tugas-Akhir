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
import Notification from "../../components/Notification";
import store from "../../app/features/store";
import Menu from "../../components/Menu";
import { useSelector } from "react-redux";
import MenuAddProduct from "../../components/MenuAddProduct";
import PopUpEditProduct from "../../components/PopUpEditProduct";

function Product() {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [idValue, setIdValue] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);
  const [submit, setSubmit] = useState(0);
  const [note, setNote] = useState(0);
  const [reloadCardProduct, setReloadCardProduct] = useState(0);
  const [popUpEditData, setPopUpEditData] = useState(false)
  const [editId, setEditId] = useState(false);
  const [search, setSearch] = useState(true);

  const role = useSelector(state => state.account.account.role)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryParams = category.map((category) => `category=${category}`).join("&");
        const tagParams = tag.map((tag) => `tags[]=${tag}`).join("&");
        const response = await axios.get(
          `http://localhost:3000/api/products?q=${inputValue}&skip=${skip}&${categoryParams}&${tagParams}`
        );
        setRawData(response.data);
        if (response.data.count === 0 || !response.data.data.length) {
          setGetData("x");
        } else {
          setGetData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setSearch(true)
      }
    };
  
    fetchData();
  }, [skip, inputValue, submit, reloadCardProduct]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
        setShowNotification(true)
        setTimeout(() => {
          setShowNotification(false);
        }, 2300);
    });

    // Mengembalikan fungsi unsubscribe untuk membersihkan subscribe ketika komponen di-unmount
    return () => {
        unsubscribe();
    };
  }, [store]);

  return (
    <>
      {popUpEditData && <PopUpEditProduct sendEditId={editId} sendRefresh={setReloadCardProduct} sendClose={setPopUpEditData}/>}
      {showNotification && <Notification/>}
      {role && <Menu/>}
      {role == 'admin' && <MenuAddProduct/>}
      <div>
        <Navbar showSearch={search} inputValue={setInputValue} sendNotes={note} />
        <div style={{ height: "65px", width: "100%", backgroundColor: "black" }}></div>
      </div>
      {loading ? (<Loading />
      ) : (
        <>
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FilterProduct sendInputValue={setInputValue} sendSubmit={setSubmit} sendCategory={setCategory} sendTag={setTag}  />
                <div style={{display: "flex",flexDirection: "column",justifyContent: "space-between",width: "1220px",height: "auto",}}>

                  {getData == "x" ? (<ProductNotFound inputValue={inputValue} />
                  ) : (
                    <>
                      <div>
                        <h1 style={{ padding: "20px 50px", paddingBottom: "0px" }}>Product List</h1>
                        <CardProduct nilaiId={setIdValue} popUp={setShowPopUp} data={getData} sendReload={setReloadCardProduct} setPopUpEditData={setPopUpEditData} editId={setEditId}></CardProduct>
                      </div>

                      {getData.length > 0 && (<Pagination skip={skip} setSkip={setSkip} rawData={rawData} />)}
                    </>
                  )}
                </div>
              </div>
            </>
        </>
      )}
      <>
        {showPopUp === true && (<PopUpProduct sendNote={setNote} closePopUp={setShowPopUp} idValue={idValue} />)}
      </>
    </>
  );
}

export default Product;
