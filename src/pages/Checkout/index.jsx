import styled, { keyframes } from "styled-components"
import CheckoutProduct from "../../components/CheckoutProduct"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Modal from "../../components/Modal"
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
  const DivOngkirSP = styled.div`
  height: 100px;
  width: 150px;
  background-color: white;
  border: ${props => props.isactivesp ? '5px solid orange' : 'transparent'};;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all .15s ease-in-out;
  &:hover{
  background-color: rgba(255,255,255,.5);
  }
  `
  const DivOngkirBRI = styled.div`
  height: 100px;
  width: 150px;
  background-color: white;
  border: ${props => props.isactivebri ? '5px solid blue' : 'transparent'};;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all .15s ease-in-out;
  &:hover{
  background-color: rgba(255,255,255,.5);
  }
  `
  const DivOngkirH = styled.div`
  height: 100px;
  width: 150px;
  background-color: white;
  border: ${props => props.isactiveh ? '5px solid green' : 'transparent'};
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all .15s ease-in-out;
  &:hover{
    background-color: rgba(255,255,255,.5);
  }
`;

const DivOngkirR = styled.div`
  height: 100px;
  width: 150px;
  background-color: white;
  border: ${props => props.isactiver ? '5px solid blue' : 'transparent'};
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all .15s ease-in-out;
  &:hover{
    background-color: rgba(255,255,255,.5);
  }
`;

const DivOngkirK = styled.div`
  height: 100px;
  width: 150px;
  background-color: white;
  border: ${props => props.isactivek ? '5px solid red' : 'transparent'};
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all .15s ease-in-out;
  &:hover{
    background-color: rgba(255,255,255,.5);
  }
`;


  const Img = styled.img`
  width: 80px;
  `
  const DivOrderDetail = styled.div`
  width: 500px;
  height: 400px;
  background-color: white;
  border: 3px dashed black;
  border-radius: 15px;
  margin: 5px 25px 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  scrollbar-width: none;
  `
  const DivEnd = styled.div`
  height: 50px;
  width: 500px;
  background-color: gold;
  margin: 30px 10px 10px 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all .15s ease-in-out;
  &:hover{
  background-color: #aa9000;
  color: white;
  }
  `
  const stretchAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;
  const GoOrderDetail = styled.button`
    padding: 20px 30px;
    margin: 20px 10px;
    font-size: 25px;
    animation: ${stretchAnimation} 0.5s infinite alternate;
    border: transparent;
    background-color: gold;
    cursor: pointer;
    transition: all .15s ease-in-out;
    &:hover{
      color: white;
    }
  `

function Checkout () {
  const [carts, setCarts] = useState([])
  // const [popUp, setPopUp] = useState(false)
  const [alamat, setAlamat] = useState([]);
  // const [chooseAlamat, setChooseAlamat] = useState('');
  const [isactiveh, setisactiveh] = useState(false);
  const [isactiver, setisactiver] = useState(false);
  const [isactivek, setisactivek] = useState(false);
  const [isactivebri, setisactivebri] = useState(false);
  const [isactivesp, setisactivesp] = useState(false);
  const [ongkir, setOngkir] = useState(0);
  const [orderValue, setOrderValue] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showDetail, setShowDetail] = useState(false)
  const [isModal, setIsModal] = useState(false)

  function toNominal(number) {
    // Pisahkan angka menjadi grup setiap tiga digit dari belakang
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Gabungkan kembali angka yang sudah dipisahkan dengan titik
    return parts.join(".");
}

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
          } catch (error) {
            console.log(error);
          }
      };
  
      response();
    }, []);

    // Mencari total harga produk
  const totalPerProduct = carts.map(item => parseInt(item.price)*parseInt(item.qty))
  const totalPrice = totalPerProduct.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    console.log(selectedOptions.map(id => alamat.find(item => item._id === id)))
    setSelectedIds(selectedOptions.map(id => alamat.find(item => item._id === id)))
    // setSelectedIds(selectedOptions); // Perbarui ID yang dipilih
};
  // {
  //   const {value} = e.target;
  //   console.log(value)
  //   setChooseAlamat(value)
  // }

  const toggleButtonH = () => {
    setisactiveh(true);
    setisactiver(false);
    setisactivek(false);
    setOngkir(10000);
  };  
  const toggleButtonR = () => {
    setisactiver(true);
    setisactiveh(false)
    setisactivek(false)
    setOngkir(15000)
  };
  const toggleButtonK = () => {
    setisactivek(true);
    setisactiveh(false)
    setisactiver(false)
    setOngkir(20000)
  };
  const handleBRI = () => {
    setPaymentMethod('Bank BRI')
    setisactivebri(true)
    setisactivesp(false)
  }
  const handleSPAY = () => {
    setPaymentMethod('Shopeepay')
    setisactivebri(false)
    setisactivesp(true)
  }

  const order = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/orders', {
          delivery_fee: ongkir,
          delivery_address: selectedIds[0],
          payment_method: paymentMethod
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
          if (!selectedIds[0]) {
            console.error('Alamat pengiriman belum dipilih!');
            return;
          }
        setOrderValue(response.data)
        console.log(orderValue)
        if (response.data.error == 1) {
            // setError(response.data.error);
            console.log(response.data.error);
        } else if (response.data.error != 1) {
            setIsModal(true);
            setTimeout(() => {
              window.location.replace('/orderdetail');
            }, 2000);
        }
    } catch (error) {
        console.error(error);
    }
  };

  const scrollTop = () => {
    scrollTo({
        behavior: 'smooth',
        top: '0'
    })
  }

  const handleShowDetail = () => {
    if (selectedIds[0]?.kecamatan && ongkir && paymentMethod) {
      setShowDetail(true)
      scrollTop()
    }
  }

    return (
        <SuperContainer>
          {isModal && <Modal text={'Order berhasil dibuat 👌'}/>}
          {/* {popUp && <PopUpShippingAddress setPopUp={setPopUp}/>} */}
            <div style={{backgroundColor:'black',color:'gold',display:'flex'}}>
                <Divback onClick={() => navigate("/cart")}>
                    <Dback src="src/assets/wback.png" alt="" />
                    <Back> back to Cart </Back>
                </Divback>
                <h1 style={{padding:'15px 30px',fontSize:'40px',borderLeft:'5px solid gold'}}>CHECKOUT</h1>
            </div>
            <Container>
                <div style={{marginLeft:'30px', borderRight:'5px double black', paddingRight:'30px'}}>
                    <div style={{borderBottom:'5px dotted black',padding:'5px'}}>
                        <Title>Product</Title>
                        <DivListProduct>
                            <CheckoutProduct/>
                        </DivListProduct>
                        <TotalProduct>Total Product : Rp {toNominal(totalPrice)}</TotalProduct>
                    </div>
                    <div>
                        <Title>Shipping address</Title>
                        <div style={{display:'flex',alignItems:'center', gap:'10px'}}>
                        <DivSelect>
                          <p>Choose Your Address</p>
                          <Select
                            name="Alamat"
                            onChange={handleChange}>
                            {/* value={selectedIds} */}
                            <option >Pilih salah satu . . .</option>
                            {alamat.map((item) => (
                            <option style={{overflow:'auto'}} key={item._id} value={item._id}>
                                NAMA: {item.name?.toUpperCase()};   
                            </option>
                            ))}
                        </Select>
                        </DivSelect>
                        <p> or </p>
                        <Button onClick={()=>navigate('/formalamat')}> <span style={{fontSize:'30px',margin:'5px 0px 0px 5px'}}>+</span> <br />Add Address</Button>
                        </div>
                        <DivAlamat>
                        {selectedIds[0]?.kecamatan && 
                          <>
                            <span style={{fontWeight:'bold'}}>NAMA : </span>{selectedIds[0]?.name.toUpperCase()}
                            <br />
                            <br />
                            <span style={{fontWeight:'bold'}}>ALAMAT : </span> {selectedIds[0]?.kelurahan.toUpperCase()}, 
                            {selectedIds[0]?.kecamatan.toUpperCase()}, 
                            {selectedIds[0]?.kabupaten.toUpperCase()}, 
                            {selectedIds[0]?.provinsi.toUpperCase()}
                            <br />
                            <br />
                            <span style={{fontWeight:'bold'}}>DETAIL : </span> {selectedIds[0]?.detail.toUpperCase()}
                          </>
                        }
                        </DivAlamat>
                    </div>
                    <Title>Shipping Options</Title>
                    <div style={{display:'flex',gap:'20px', marginLeft:'10px'}}>
                    <DivOngkirH isactiveh={isactiveh} onClick={toggleButtonH} style={{color:'green'}}>
                      <h1>Hemat</h1>
                      <h3>Rp {toNominal(10000)}</h3>
                    </DivOngkirH>
                    <DivOngkirR isactiver={isactiver} onClick={toggleButtonR} style={{color:'blue'}}>
                      <h1>Reguler</h1>
                      <h3>Rp {toNominal(15000)}</h3>
                    </DivOngkirR>
                    <DivOngkirK isactivek={isactivek} onClick={toggleButtonK} style={{color:'red'}}>
                      <h1>Kilat</h1>
                      <h3>Rp {toNominal(20000)}</h3>
                    </DivOngkirK>
                    </div>
                    <Title>Payment Method</Title>
                    <div style={{display:'flex',gap:'15px',margin:'0px 10px 20px'}}>
                    <DivOngkirBRI isactivebri={isactivebri} onClick={handleBRI}>
                      <Img src="src/assets/BRI.png" alt="" />
                    </DivOngkirBRI>
                    <DivOngkirSP isactivesp={isactivesp} onClick={handleSPAY}>
                      <Img src="src/assets/SPAY.png" alt="" />
                    </DivOngkirSP>
                    </div> 
                        <GoOrderDetail onClick={handleShowDetail}>
                        Cek Detail Pembayaran!
                        </GoOrderDetail>

                </div>
                <div>
                    <Title>Order Details</Title>
                    <DivOrderDetail>
                  {showDetail && 
                    <>
                      <div>
                        <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}>
                          <p style={{fontWeight:'bold'}}>Total Produk : </p>
                          <p>Rp {toNominal(totalPrice)}</p>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}>
                          <p style={{fontWeight:'bold'}}>Alamat Pengiriman : </p>
                          <div style={{maxWidth:'300px',textAlign:'right'}}>
                            NAMA : {selectedIds[0]?.name.toUpperCase()}
                            <br />
                            ALAMAT : {selectedIds[0]?.kelurahan.toUpperCase()}, 
                            {selectedIds[0]?.kecamatan.toUpperCase()}, 
                            {selectedIds[0]?.kabupaten.toUpperCase()}, 
                            {selectedIds[0]?.provinsi.toUpperCase()}
                            <br />
                            DETAIL : {selectedIds[0]?.detail.toUpperCase()}
                          </div>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}>
                          <p style={{fontWeight:'bold'}}>Biaya Pengiriman : </p>
                          <div style={{maxWidth:'300px',textAlign:'right'}}>Rp {toNominal(ongkir)}</div>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between',padding:'5px'}}>
                          <p style={{fontWeight:'bold'}}>Metode Pembayaran : </p>
                          <div style={{maxWidth:'300px',textAlign:'right'}}>{paymentMethod}</div>
                        </div>
                      </div>
                      <div style={{padding:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                        <h3>Total Pembayaran</h3>
                        <h1>Rp {toNominal(totalPrice+ongkir)}</h1>
                      </div>
                    </>
                  }
                    </DivOrderDetail>
                    {showDetail && 
                    (<DivEnd onClick={order}>
                        <div>Buat Pesanan</div>
                    </DivEnd>)
                    }
                </div>
            </Container>
        </SuperContainer>
    )
}

export default Checkout