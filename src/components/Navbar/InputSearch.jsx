/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 15px;
  right: 183px;
`
const Input = styled.input`
  padding: 7px 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  border: transparent;
  color: white;

  &::placeholder {
    color: white;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: larger;
  }
`;

const Search = styled.img`
  position: absolute;
  height: 20px;
  width: auto;
  top: 5px;
  right: 7px;
  cursor: pointer;
`;

function InputSearch({ inputValue }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    inputValue(searchInput);
    setSearchInput("")
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          name="nama"
          placeholder="Search"
        ></Input>
        <Search onClick={handleSubmit} src="src/assets/search.png" alt="" />
      </form>
    </Container>
  );
}

export default InputSearch;
