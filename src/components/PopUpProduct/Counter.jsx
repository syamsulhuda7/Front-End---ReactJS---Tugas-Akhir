/* eslint-disable react/prop-types */
// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import { decrementWithCheckingAction, increment } from "../../app/features/Counter/actions";
// import { useState } from "react";

const Button = styled.button`
  height: 30px;
  width: 30px;
  margin: 0;
  padding: 0;
  font-size: 20px;
  display: flex;
  justify-content: center;
  border: transparent;
  border-radius: 20%;
  cursor: pointer;
  background-color: #ffeb79;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: gold;
  }
`;

function Counter({setCount, count}) {
  const handleplus = () => {
    setCount((count) => count + 1);
  }
  const handlemin = () => {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  }
  // let { cart } = useSelector((state) => state.counter);
  // const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button onClick={handlemin}>-</Button>
      <p>{count}</p>
      <Button onClick={handleplus}>+</Button>
    </div>
  );
}
export default Counter;
