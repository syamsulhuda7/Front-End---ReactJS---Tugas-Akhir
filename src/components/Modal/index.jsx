/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";

// Animasi loading
const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

// Styled-components untuk modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const Text = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Loading = styled.div`
  font-size: 30px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const LoadingDot = styled.span`
  &::after {
    content: " .";
    opacity: 0;
    animation: ${pulse} 1.5s infinite;
    animation-delay: ${props => props.delay}s;
    display: inline-block;
  }
`;

// Komponen Modal
const Modal = ({ text = 'Loading...' }) => {
  return (
    <>
      <ModalOverlay>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <Text>{text}</Text>
          <Loading>
            <LoadingDot delay={0} />
            <LoadingDot delay={0.25} />
            <LoadingDot delay={0.5} />
          </Loading>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default Modal;
