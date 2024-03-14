import styled from "styled-components";

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
  transition: all .2s ease-in-out;

  &:hover {
        scale: 115%;
        font-weight: normal;
    }
`;

const Input = styled.input`
    padding: 7px 10px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.2);
    border: transparent;

    &::placeholder {
        color: white;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-size: larger;
    }
`;

const Search = styled.img`
  position: absolute;
  height: 20px;
  width: auto;
  top: 20px;
  right: 185px;
  cursor: pointer;
`;

const Login = styled.button`
  padding: 6px 15px;
  border-radius: 10px;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  transition: all .2s ease-in-out;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

  &:hover {
    background-color: rgba(255,255,255,.2);
    scale: 103%;
  }
`;

const Img = styled.img`
  height: 30px;
  width: auto;
  cursor: pointer;
`;

function Navbar() {
  return (
    <>
      <SNavbar>
        <H1>SCAFE</H1>
        <Div style={{gap:'70px'}}>
          <H5>Home</H5>
          <H5>Product</H5>
          <H5>Profile</H5>
        </Div>
        <Div>
          <form action="" placeholder="search">
            <Input
              type="text"
              id="nama"
              name="nama"
              placeholder="Search"
            ></Input>
            <Search src="src/assets/search.png" alt="" />
          </form>
          <Login>Log In</Login>
          <Img src="src/assets/cart.png" />
        </Div>
      </SNavbar>
    </>
  );
}

export default Navbar;
