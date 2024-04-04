/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 150px;
  border-bottom: 3px solid black;
  background-color: gold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
`;
const Div = styled.div`
  width: 250px;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  height: 30px;
  width: 30px;
  padding-top: 1px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  border: transparent;
  border-radius: 20%;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #ffffffa4;
  }
`;
const Remove = styled.button`
  font-size: 15px;
  padding: 5px 10px;
  border-radius: 5px;
  border: transparent;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #ffffffa4;
  }
`;

function CardCart({sendId}) {
  const [id, setId] = useState(''); // Menyimpan ID item yang akan dihapus
  const [cartsBackEnd, setCartsBackEnd] = useState([]); // Menyimpan ID item yang akan dihapus
  
  const token = useSelector(state => state.account.account.token)

  useEffect(() => {
    const response = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/carts`, {
              headers: {
                'Authorization': `Bearer ${token}` // Menambahkan token ke header permintaan
              }
            });
          setCartsBackEnd(response.data);
        } catch (error) {
          console.log(error);
        }
    };

    response();
  }, [id]);

  const handleMin = async (productId, productQty) => {
    console.log(productQty)
    if (productId && productQty>0) {
      try {
        const response = await axios.put(
          'http://localhost:3000/api/carts',
          { items: [{ product: { _id: productId }, qty: -1 }] },
          {
            headers: {
              'Authorization': `Bearer ${token}` // Menambahkan token ke header permintaan
            }
          }
          );
          setId(a => a+1)
          sendId(a => a+1)
        setCartsBackEnd(response.data);
      } catch (error) {
      console.log(error)
      }
    }
    if (productId && productQty === 1) {
      deleteProduct(productId)
    }
  };

  const handleAdd = async (productId) => {
    if (productId) {
      try {
        const response = await axios.put(
          'http://localhost:3000/api/carts',
          { items: [{ product: { _id: productId }, qty: 1 }] },
          {
            headers: {
              'Authorization': `Bearer ${token}` // Menambahkan token ke header permintaan
            }
          }
          );
          setId(a => a+1)
          sendId(a => a+1)
        setCartsBackEnd(response.data);
      } catch (error) {
      console.log(error)
      }
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete('http://localhost:3000/api/carts', {
        data: { productId }, // Kirim ID produk sebagai data dalam req.body
        headers: {
          'Authorization': `Bearer ${token}` // Tambahkan token ke header permintaan
        }
      });
      setId(a => a+1)
      sendId(a => a+1)
      console.log(response.data);
      // Lakukan tindakan lain setelah berhasil menghapus produk dari keranjang
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      {cartsBackEnd.length == 0 ? (
        <div style={{height:'70vh', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h1>Kamu belum menambahkan produk apapun</h1>
        </div>
      ) : (
        <>
          {cartsBackEnd.map((item, i) => (
            <Container key={i}>
              <Div>
                <img
                  style={{ height: "130px", width: "auto", margin: "10px" }}
                  src={`http://localhost:3000/images/products/${item.image_url}`}
                  alt=""
                />
              </Div>
              <Div style={{ fontSize: "20px" }}>{item.name}</Div>
              <Div style={{ fontSize: "20px" }}>{item.price}</Div>
              <Div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Button
                  onClick={() => handleMin(item.product._id, item.qty)}
                >
                  -
                </Button>
                <p>{item.qty}</p>
                <Button
                  onClick={() => handleAdd(item.product._id)}
                >
                  +
                </Button>
              </Div>
              <Div style={{ fontSize: "20px", fontWeight:'bold' }}>Rp {item.price * item.qty}</Div>
              <Div style={{width:'100px'}}>
                <Remove onClick={() => deleteProduct(item.product._id)} >remove</Remove>
              </Div>
            </Container>
          ))}
        </>
      )}
    </>
  );
}

export default CardCart;
