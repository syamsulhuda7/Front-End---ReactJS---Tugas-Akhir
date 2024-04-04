/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputSearch from "./InputSearch";
// import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

const SNavbar = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px 0px 30px;
  position: absolute;
  z-index: 1;
`;

const H1 = styled.h1`
  font-size: 40px;
  color: white;
  margin: 0;
  width: 330px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  gap: 20px;
`;

const H5 = styled.h3`
  color: white;
  font-weight: lighter;
  margin: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    scale: 115%;
    font-weight: normal;
  }
`;

const Login = styled.button`
  padding: 6px 15px;
  border-radius: 10px;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    scale: 103%;
  }
`;

const Img = styled.img`
  height: 30px;
  width: auto;
  cursor: pointer;
`;
const Note = styled.div`
  height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #ffe760;
    border: 1px solid black;
    position: absolute;
    right: 20px;
    top: 10px;
    color: black;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`

function Navbar({ inputValue }) {
  const [note, setNote] = useState([]);
  // const [token, setToken] = useState("");

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {}, // Jangan lupa menyertakan objek kosong sebagai body
        {
          headers: {
            Authorization:
              `Bearer ${acc.token}`
          },
        }
      );
      console.log(response.data);
      localStorage.removeItem('account');
      window.location.replace('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const acc = useSelector(state => state.account.account)

  const scrollTop = () => {
    scrollTo({
        behavior: 'instant',
        top: '0'
    })
  }

  const toCart = () => {
    navigate("/cart")
    scrollTop()
  }

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
          setNote(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
    };

    response();
  }, [note]);

  return (
    <>
      <SNavbar>
        {note.length > 0 && <Note>{note.length}</Note>}
        <H1>SCAFE</H1>
        <Div style={{ gap: "70px" }}>
          <H5 onClick={() => navigate("/")}>Home</H5>
          <H5 onClick={() => navigate("/product")}>Product</H5>
          <H5 onClick={() => navigate("/profile")}>Profile</H5>
        </Div>
        <Div>
          <InputSearch inputValue={inputValue} />
          {acc.id ? (<Login onClick={logout}>Log Out</Login>
          ):(<Login onClick={() => navigate("/login")}>Log In</Login>)}
          <Img onClick={toCart} src="src/assets/cart.png" />
        </Div>
      </SNavbar>
    </>
  );
}

export default Navbar;
