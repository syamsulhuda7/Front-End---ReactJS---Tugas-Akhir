import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { decrementWithCheckingAction, increment } from "../../app/features/Counter/actions";

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

function Counter() {

  let { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button onClick={()=> dispatch(decrementWithCheckingAction(1))}>-</Button>
      <p>{count}</p>
      <Button onClick={()=> dispatch(increment(1))}>+</Button>
    </div>
  );
}
export default Counter;
