import styled from "styled-components";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import { useState } from "react";

const Container = styled.div`
  padding: 30px;
`;

const ProfileContainer = styled.div`
  width: 700px;
  gap: 50px;
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

const Image = styled.img`
  width: 200px;
  height: auto;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  return (
    <>
      <Navbar />
      <div style={{ height: "65px", backgroundColor: "black" }} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <div>
              <h1>Profile</h1>
            </div>
            <div style={{ textAlign: "center" }}>
              <Image
                style={{ height: "350px", width: "auto" }}
                src="src/assets/profile/a.jpg"
                alt="Profile Image"
              />
              <Description>
                SCAFE adalah sebuah perusahaan yang mengusung konsep cafe yang
                unik dan berbeda. Kami memadukan kenyamanan cafe dengan nuansa
                hangat dan ramah, serta menyajikan pengalaman kuliner yang tak
                terlupakan kepada pelanggan kami. Dengan fokus pada kualitas dan
                inovasi, kami menawarkan beragam menu makanan dan minuman yang
                lezat, mulai dari hidangan klasik hingga kreasi modern, yang
                disiapkan dengan bahan-bahan segar dan berkualitas tinggi. Kami
                percaya bahwa kualitas, keramahan, dan suasana yang menyenangkan
                adalah kunci kesuksesan. Di SCAFE, kami tidak hanya menyajikan
                makanan dan minuman yang lezat, tetapi juga menciptakan
                lingkungan yang nyaman dan ramah, di mana pelanggan dapat
                bersantai, bersosialisasi, dan menikmati waktu mereka. Dengan
                komitmen kami untuk memberikan pelayanan terbaik kepada setiap
                pelanggan, SCAFE siap menjadi destinasi favorit bagi pecinta
                kopi dan penggemar kuliner.
              </Description>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ProfileContainer>
                <Image src="src/assets/profile/b.jpg" alt="Profile Image" />
                <Description>
                  Produk-produk yang ditawarkan oleh SCAFE tidak hanya mencakup
                  beragam minuman kopi, teh, dan mocktail yang lezat, tetapi
                  juga menyajikan berbagai hidangan makanan yang menggugah
                  selera. Keunggulan utama produk-produk kami terletak pada
                  kualitas bahan baku yang dipilih secara cermat dan diproses
                  dengan teliti oleh tim kreatif kami.
                </Description>
              </ProfileContainer>
            </div>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default Profile;
