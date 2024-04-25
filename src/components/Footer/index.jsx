import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: black;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; {new Date().getFullYear()} SCAFE</FooterText>
    </FooterContainer>
  );
};

export default Footer;
