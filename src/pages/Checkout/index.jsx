import styled from "styled-components"
import CheckoutProduct from "../../components/CheckoutProduct"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
// import PopUpShippingAddress from "../../components/PopUpShippingAddress"

const SuperContainer = styled.div`
    background-color: #ffed86;
`
const Divback = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.15s ease-in-out;
  padding: 0px 30px;
  &:hover {
      scale: 102%;
    }
    `
const Back = styled.div`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  `;
const Dback = styled.img`
  height: 20px;
  padding-right: 10px;
  cursor: pointer;
  `
  const Container = styled.div`
      display: flex;
      justify-content: space-between;
  `
  const Title = styled.div`
    font-size: 40px;
    font-weight: bold;
    padding: 10px;
  `
  const DivSelect = styled.div`
  width: 240px;
  background-color: white;
  border-radius: 10px;
  padding: 12px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  margin-left: 10px;
  `
  const Select = styled.select`
  padding: 0px;
  height: 30px;
  width: 17px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
  const Button = styled.button`
    padding: 0px 10px 10px 5px;
    width: 90px;
    background-color: transparent;
    border: 3px solid black;
    border-radius: 10px;
    color: black;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all .15s ease-in-out;
    &:hover{
      background-color: gold;
    }
  `
  const DivAlamat = styled.div`
    height: 130px;
    width: 400px;
    background-color: white;
    border: 2px dotted black;
    margin: 10px 0px 0px 10px;
    overflow: auto;
    scrollbar-width: none;
  `
  const DivListProduct = styled.div`
    width: 870px;
    display: flex;
    flex-wrap: wrap;
  `
  const TotalProduct = styled.div`
    background-color: black;
    color: white;
    height: 60px;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
  `

function Checkout () {
  const [carts, setCarts] = useState([])
  // const [popUp, setPopUp] = useState(false)
  const [alamat, setAlamat] = useState([]);
  const [chooseAlamat, setChooseAlamat] = useState('');

const navigate = useNavigate();
const token = useSelector(state => state.account.account.token)

  useEffect(() => {
    const response = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/delivery-addresses`, {
              headers: {
                'Authorization': `Bearer ${token}` // Menambahkan token ke header permintaan
              }
            });
          setAlamat(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.log(error);
        }
    };

    response();
  }, []);

    useEffect(() => {
      const response = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/carts`, {
                headers: {
                  'Authorization': `Bearer ${token}` // Menambahkan token ke header permintaan
                }
              });
            setCarts(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
      };
  
      response();
    }, []);

    // Mencari total harga produk
  const totalPerProduct = carts.map(item => parseInt(item.price)*parseInt(item.qty))
  const totalPrice = totalPerProduct.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const handleChange = (e) => {
    const {value} = e.target;
    setChooseAlamat(value)
    console.log(value)
  }

  // const handleAddress = () => {
  //   setPopUp(true)
  // }

    return (
        <SuperContainer>
          {/* {popUp && <PopUpShippingAddress setPopUp={setPopUp}/>} */}
            <div style={{backgroundColor:'black',color:'gold',display:'flex'}}>
                <Divback onClick={() => navigate("/cart")}>
                    <Dback src="src/assets/wback.png" alt="" />
                    <Back> back to Cart </Back>
                </Divback>
                <h1 style={{padding:'15px 30px',fontSize:'40px',borderLeft:'5px solid gold'}}>CHECKOUT</h1>
            </div>
            <Container>
                <div style={{marginLeft:'30px'}}>
                    <div style={{borderBottom:'5px dotted black',padding:'5px'}}>
                        <Title>Product</Title>
                        <DivListProduct>
                            <CheckoutProduct/>
                        </DivListProduct>
                        <TotalProduct>Total Product : Rp {totalPrice}</TotalProduct>
                    </div>
                    <div>
                        <Title>Shipping address</Title>
                        <div style={{display:'flex',alignItems:'center', gap:'10px'}}>
                        <DivSelect>
                          <p>Choose Your Address</p>
                          <Select
                            name="Alamat"
                            onChange={handleChange}>
                            {alamat.map((item) => (
                            <option key={item._id} >
                                NAMA: {item.name?.toUpperCase()};   
                                ALAMAT: {item.kelurahan}, {item.kecamatan}, {item.kabupaten}, {item.provinsi};   
                                DETAIL : {item.detail?.toUpperCase()}
                            </option>
                            ))}
                        </Select>
                        </DivSelect>
                        <p> or </p>
                        <Button onClick={()=>navigate('/formalamat')}> <span style={{fontSize:'30px',margin:'5px 0px 0px 5px'}}>+</span> <br />Add Address</Button>
                        </div>
                      <DivAlamat>{chooseAlamat}</DivAlamat>
                    </div>
                    <Title>Shipping Options</Title>
                    <Title>Payment Method</Title>
                </div>
                <div>Order Details</div>
            </Container>
            <div>
                <div>Total Pembayaran</div>
                <div>Buat Pesanan</div>
            </div>
        </SuperContainer>
    )
}

export default Checkout