import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import FormAlamat from "./components/FormAlamat";
import OrderDetail from "./pages/OrderDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/formalamat' element={<FormAlamat/>}></Route>
          <Route path='/orderdetail' element={<OrderDetail/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
