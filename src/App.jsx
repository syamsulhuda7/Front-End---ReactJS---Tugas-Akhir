import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
// import Questionnaire from "./pages/Cart";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
