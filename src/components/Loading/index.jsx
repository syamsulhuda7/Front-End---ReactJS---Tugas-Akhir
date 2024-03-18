import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Atur tinggi sesuai kebutuhan */
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333; /* Warna border kiri */
  border-radius: 50%;
  width: 40px; /* Atur ukuran sesuai kebutuhan */
  height: 40px; /* Atur ukuran sesuai kebutuhan */
  animation: spin 1s linear infinite; /* Animasi putar */

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

function Loading() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default Loading;