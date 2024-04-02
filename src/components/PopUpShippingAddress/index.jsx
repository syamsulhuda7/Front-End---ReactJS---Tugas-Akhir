/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const SuperContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`
const Container = styled.div`
    width: 700px;
    height: 500px;
    background-color: white;
    border: 3px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    scrollbar-width: none;
`
const Card = styled.div`
    height: 100px;
    width: 670px;
    margin: 5px 10px;
    background-color: yellow;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Close = styled.button`
    width: 20px;
    height: 20px;
    border: 2px solid black;
    font-size: 15px;
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 0px 3px;
    margin: 15px 10px 5px 660px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    background-color: transparent;
    &:hover{
        color: gold;
        border: 3px solid gold;
    }
`
const NewAddress = styled.button`
    padding: 20px;
    margin: 10px;
    border: 2px solid black;
    font-size: 15px;
    font-weight: bold;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    background-color: transparent;
    &:hover{
        color: gold;
        border: 3px solid gold;
    }
`

const PopUpShippingAddress = ({setPopUp}) => {
const [alamat, setAlamat] = useState([]);

const navigate = useNavigate();
const token = useSelector(state => state.account.account.token)

  useEffect(() => {
    const response = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/delivery-addresses`, {
              headers: {
                'Authorization': `Bearer ${token}` // Menambahkan token ke header permintaan
              }
            });
          setAlamat(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.log(error);
        }
    };

    response();
  }, []);

  const handleClose = () => {
    setPopUp(false)
  }

    return (
        <SuperContainer>
            <Container>
                <Close onClick={handleClose}>x</Close>
                {alamat.map(item => (
                <Card key={item._id}>
                    <div>Nama: {item.name}</div>
                    <div>Alamat: Desa: {item.kelurahan}, 
                        Kecamatan: {item.kecamatan}, 
                        Kabupaten: {item.kabupaten}, 
                        Provinsi: {item.provinsi}
                    </div>
                    <div>Detail : {item.detail}</div>
                </Card>
                ))}
                <NewAddress onClick={() => navigate("/formalamat")}>+ Add New Address</NewAddress>
            </Container>
        </SuperContainer>
    )
}

export default PopUpShippingAddress