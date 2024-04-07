/* eslint-disable react/prop-types */
import styled from "styled-components";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import axios from "axios";

const Cover = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;
const Container = styled.div`
  width: 250px;
  height: 400px;
  margin: 20px;
  border-radius: 10px;
  background-color: rgb(255, 215, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Img = styled.img`
  width: 230px;
  height: 230px;
  border-radius: 10px;
`;
const Div = styled.div`
  width: 230px;
  height: 140px;
  padding: 0px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const DivHarga = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  color: white;
  background-color: gold;
  border: 3px solid gold;
  border-radius: 5px;
  cursor: pointer;
  transition: all.2s ease-in-out;
  margin-top: 8px;

  &:hover {
    scale: 103%;
  }
`;
const Button2 = styled.button`
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  color: black;
  background-color: #ffffff91;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  transition: all.2s ease-in-out;
  position: absolute;
  margin: -335px 0px 0px -220px;

  &:hover {
    scale: 103%;
  }
`;
const DivUp = styled.div`
  height: 83px;
  width: 100%;
`;
const DivDown = styled.div`
  height: 60px;
  width: 100%;
`;

function CardProduct({ data, nilaiId, popUp, sendReload, setPopUpEditData, editId }) {

  function handleClick (id) {
    nilaiId(id)
    popUp(true)
  }

  const role = useSelector(state => state.account.account.role)
  const token = useSelector(state => state.account.account.token)

  const handleDelete = async (id) => {
        const konfirmasi = confirm('yakin ingin menghapus produk?')
        if (konfirmasi === true) {
          try {
              const response = await axios.delete(`http://localhost:3000/api/products/${id}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  }
                });
              console.log(response);
              alert(`product berhasil dihapus`)
              sendReload(x => x+1)
              // window.location.reload();
          } catch (error) {
              console.log(error);
          }
        }
    };

    const handleEdit = (id) => {
      setPopUpEditData(true)
      editId(id)
    }

  return (
    <Cover>
      {data.map((item, i) => (
        <Container key={i} >
          <Img
            src={`http://localhost:3000/images/products/${item.image_url}`}
          ></Img>
          <Div>
            <DivUp style={{ overflow: "hidden" }}>
              <div style={{display:'flex', justifyContent:'center'}}>
                <h3>{item.name.toUpperCase()}</h3>
              </div>
              <p style={{ color: "rgb(0,0,0,.7)", textAlign:'justify' }}>{item.description}</p>
            </DivUp>
            <DivDown>
              <DivHarga>
                <h4>Rp. {item.price}</h4>
                <h4>Stock {item.stock} pcs</h4>
              </DivHarga>
              <div>
              <Button onClick={()=>handleClick(item._id)}>Buy</Button>
              {role == 'admin' &&
              <>
                <Button2 onClick={()=>handleDelete(item._id)} title="delete"><GoTrash/></Button2>
                <Button2 onClick={()=>handleEdit(item._id)} title="edit" style={{margin: '-300px 0px 0px -220px'}}><CiEdit/></Button2>
              </>
              }
              </div>
            </DivDown>
          </Div>
        </Container>
      ))}
    </Cover>
  );
}

export default CardProduct;
