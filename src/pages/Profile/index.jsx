import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";

function Profile() {
  return (
    <>
      <div>
        <Navbar />
        <div
          style={{ height: "65px", width: "100%", backgroundColor: "black" }}
        ></div>
      </div>
      <h1>THIS IS PROFILE PAGE</h1>
      <Loading/>
      <Footer/>
    </>
  );
}

export default Profile;
