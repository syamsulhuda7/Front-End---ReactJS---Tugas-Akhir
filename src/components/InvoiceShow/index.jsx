/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

const SuperContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    border: 3px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Container = styled.div`
    width: 400px;
    height: 500px;
    background-color: white;
    border: 3px solid black;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const Close = styled.button`
    background-color: gold;
    border: transparent;
    padding: 7px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all .15s ease-in-out;
    &:hover{
        color: white;
    }
`

const InvoiceShow = ({setPopUpInvoice, idPopUp}) => {
    const [data, setData] = useState([])
    
    const token = useSelector(state => state.account.account.token)

    useEffect(() => {
        const response = async () => {
            console.log(idPopUp);
            try {
              const response = await axios.get(
                `http://localhost:3000/api/invoices/${idPopUp}`, {
                  headers: {
                    'Authorization': `Bearer ${token}` // Menambahkan token ke header permintaan
                  }
                });
                setData(response.data)
              console.log(response.data);
            } catch (error) {
              console.log(error);
            }
        };
    
        response();
      }, []);

      const handleClose = () => {
        setPopUpInvoice(false)
      }

    return (
        <SuperContainer>
            <Container>
            <div>
                <div style={{textAlign:'center'}}>
                    <h2>Invoice</h2>
                    <p>#{data.order?._id}</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-around',padding:'25px 5px 15px 5px'}}>
                    <div style={{textAlign:'center',padding:'5px',width:'50%'}}>
                        <p>Total Pembayaran</p>
                        <h4>Rp {data.total}</h4>
                    </div>
                    <div style={{textAlign:'center',padding:'5px',width:'50%',borderLeft:'1px solid black'}}>
                        <p>Status</p>
                        <h4>{data.order?.status}</h4>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'5px 5px',borderBottom:'3px double black'}}>
                    <div style={{textAlign:'center',padding:'5px',width:'50%'}}>
                        <p>Rincian Pengiriman</p>
                        <div style={{fontSize:'12px',textAlign:'justify'}}>
                            Nama: {data.order?.delivery_address.name?.toLowerCase()};  
                            <br />
                            Alamat: {data.order?.delivery_address.kelurahan?.toLowerCase()}, {data.order?.delivery_address.kecamatan?.toLowerCase()}, {data.order?.delivery_address.kabupaten?.toLowerCase()}, {data.order?.delivery_address.provinsi?.toLowerCase()}; 
                            <br />
                            Detail: {data.order?.delivery_address.detail?.toLowerCase()}
                        </div>
                    </div>
                    <div style={{textAlign:'center',padding:'5px',width:'50%',borderLeft:'1px solid black'}}>
                        <p>Metode Pembayaran</p>
                        <h4>{data.order?.payment_method}</h4>
                    </div>
                </div>
                <h4 style={{padding:'15px 0px 5px 5px'}}>Rincian Pesanan</h4>
                <div style={{display:'flex',justifyContent:'space-between',padding:'5px 15px'}}>
                    <div>Subtotal Produk :</div>
                    <div>Rp {data?.sub_total}</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'5px 15px'}}>
                    <div>Subtotal Pengiriman :</div>
                    <div>Rp {data?.delivery_fee}</div>
                </div>
                <div style={{fontWeight:'bold',display:'flex',justifyContent:'space-between',padding:'5px 15px'}}>
                    <div style={{paddingTop:'5px'}}>Total Pembayaran :</div>
                    <div style={{borderTop:'1px solid black',paddingTop:'5px'}}>Rp {data?.delivery_fee + data?.sub_total}</div>
                </div>
                </div>
                <Close onClick={handleClose}>close</Close>
            </Container>
        </SuperContainer>
    )
}

export default InvoiceShow