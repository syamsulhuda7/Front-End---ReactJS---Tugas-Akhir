import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
