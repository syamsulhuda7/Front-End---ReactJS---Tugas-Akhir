/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import Counter from "./Counter";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../app/features/Counter/actions";

const SuperContainer = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.3);
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Container = styled.div`
  width: 800px;
  height: 500px;
  background-color: white;
  border: 5px solid gold;
  border-radius: 20px;
  padding: 33px 50px;
`;
const Img = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 15px;
`;
const Text = styled.div`
width: 350px;
height: 300px;
padding: 0px 20px;
overflow: auto;
text-align: justify;
font-size: 17px;
`;
const Add = styled.button`
    padding: 5px 10px;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
    background-color: #ffeb79;
    transition: all .1s ease-in-out;

    &:hover {
        background-color: gold;
    }
`
const Close = styled.button`
    background-color: transparent;
    border: 3px solid black;
    font-size: 25px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    padding: 0px 1px 3px 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
    color: gold;
    border: solid gold;
    }
`

function PopUpProduct({idValue, closePopUp}) {
    const [count, setCount] = useState(0);
    const [idResult, setIdResult] = useState({});

    useEffect(() => {
        if (idValue != '') {
          const fetchData = async () => {
            try {
              const response = await axios.get(
                `http://localhost:3000/api/products/${idValue}`
              );
              setIdResult(response.data.data);
              } catch (err) {
              console.log("Eror fetching data", err);
            }
          };
      
          fetchData();
        }
      
    }, [idValue]);


const dispatch = useDispatch()

const handleClick = () => {
  closePopUp(false);
}

const token = useSelector(state => state.account.account.token)

const handleAdd = async () => {
  if (count > 0) {
    // Periksa apakah token ditemukan sebelum menyertakannya dalam header permintaan
    if (!token) {
      console.error('Token otentikasi tidak ditemukan.');
      alert('Anda harus login terlebih dahulu')
      return;
    }
    
    // Setel header Authorization dengan token otentikasi
    const headers = {
      Authorization: `Bearer ${token}`
    };

    // Buat objek konfigurasi untuk permintaan Axios
    const config = {
      headers: headers
    };

    // Buat objek item keranjang dari idResult
    const cartItem = {
      product: {_id: idResult._id},
      qty: count
    };
    
    // Kirim permintaan untuk memperbarui keranjang dengan item yang dipilih
    try {
      const response = await axios.put(
        'http://localhost:3000/api/carts',
        { items: [cartItem] }, // Masukkan item keranjang ke dalam array
        config // Gunakan objek konfigurasi untuk menyertakan header dengan token otentikasi
      );
      console.log('Berhasil memperbarui keranjang:', response.data);
      // Tindakan lanjutan setelah berhasil memperbarui keranjang
      // Menambahkan item ke keranjang dengan menggunakan aksi addProduct
      dispatch(addProduct({ qty: count, name: idResult.name, id: idResult._id, img: idResult.image_url, price: idResult.price }));
      setCount(0);
      closePopUp(false);
    } catch (error) {
      console.error('Gagal memperbarui keranjang:', error);
      // Tindakan lanjutan jika gagal memperbarui keranjang
    }
  }
};



  return (
    <SuperContainer>
        <Container>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <h1>{idResult.name?.toUpperCase()} - Rp.{idResult.price}</h1>
            <Close onClick={handleClick}>x</Close>
        </div>
        <div style={{paddingTop:'20px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <Img src={`http://localhost:3000/images/products/${idResult.image_url}`} />
          <Text>{idResult.description}</Text>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'30px 0px'}}>
            <h2>Stock : {idResult.stock}</h2>
            <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                    <Counter setCount={setCount} count={count}/>
                <Add onClick={handleAdd}>add to cart</Add>
            </div>
        </div>
      </Container>
    </SuperContainer>
  );
}

export default PopUpProduct;
