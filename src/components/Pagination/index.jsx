/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-top: 50px;
`;
const Button = styled.button`
  font-size: 17px;
  background-color: transparent;
  border: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: gold;
  }
`;

function Pagination({ skip, setSkip, rawData }) {
const [page, setPage] = useState(1)

const scrollTop = () => {
    scrollTo({
        behavior: 'smooth',
        top: '0'
    })
}

  const handlerNextPage = () => {
    if (skip < rawData.count-rawData.limit && skip >= 0) {
        setSkip((skip) => skip + rawData.limit);
        setPage((page) => page +1)
        scrollTop()
    }
};
const handlerPrevPage = () => {
    if (skip < rawData.count && skip > 0) {
        setSkip((skip) => skip - rawData.limit);
        setPage((page) => page - 1)
        scrollTop()
    }
  };

  return (
    <Container>
      <Button onClick={handlerPrevPage}>Prev</Button>
      <p>{page} of {Math.ceil(rawData.count/rawData.limit)}</p>
      <Button onClick={handlerNextPage}>Next</Button>
    </Container>
  );
}

export default Pagination;
