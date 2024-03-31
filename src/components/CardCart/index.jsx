import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addProduct, minQty } from "../../app/features/Counter/actions";
import { useEffect, useState } from "react";

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

function CardCart() {
  const [id, setId] = useState(null); // Menyimpan ID item yang akan dihapus
  const carts = useSelector((state) => state.counter.carts);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    setId(itemId); // Menyimpan ID item yang akan dihapus
  };

  // Efek samping untuk menangani penghapusan item dari local storage
  useEffect(() => {
    if (id) {
      // Ambil counterState dari localStorage
      let counterState = JSON.parse(localStorage.getItem("counterState"));

      // Lakukan operasi penghapusan pada item dengan ID yang sesuai
      counterState.carts = counterState.carts.filter((e) => e.id !== id);

      // Simpan kembali counterState yang telah diperbarui ke localStorage
      localStorage.setItem("counterState", JSON.stringify(counterState));

      // Reset nilai id setelah penghapusan item
      setId(null);

      window.location.reload();
    }
  }, [id]);

  return (
    <>
      {carts.length == 0 ? (
        <div style={{height:'70vh', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h1>Kamu belum menambahkan produk apapun</h1>
        </div>
      ) : (
        <>
          {carts.map((item, i) => (
            <Container key={i}>
              <Div>
                <img
                  style={{ height: "130px", width: "auto", margin: "10px" }}
                  src={`http://localhost:3000/images/products/${item.img}`}
                  alt=""
                />
              </Div>
              <Div style={{ fontSize: "20px" }}>{item.name}</Div>
              <Div style={{ fontSize: "20px" }}>{item.price}</Div>
              <Div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Button
                  onClick={() => dispatch(minQty({ qty: 1, id: `${item.id}` }))}
                >
                  -
                </Button>
                <p>{item.qty}</p>
                <Button
                  onClick={() =>
                    dispatch(addProduct({ qty: 1, id: `${item.id}` }))
                  }
                >
                  +
                </Button>
              </Div>
              <Div style={{ fontSize: "20px", fontWeight:'bold' }}>Rp {item.price * item.qty}</Div>
              <Div style={{width:'100px'}}>
                <Remove onClick={() => handleRemove(item.id)}>remove</Remove>
              </Div>
            </Container>
          ))}
        </>
      )}
    </>
  );
}

export default CardCart;
