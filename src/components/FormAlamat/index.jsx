/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: gold;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 20px;
  padding: 10px;
  background-color: #fff099;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
  width: 250px;
  border-radius: 5px;
  border: none;
`;

const Select = styled.select`
  padding: 5px;
  margin-bottom: 10px;
  width: 250px;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  padding: 10px;
  background-color: gold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const ErrorMsg = styled.span`
    color: red;
    font-size: 14px;
    margin: 30px 5px;
    position: absolute;
`;
const Div = styled.div`
    display: flex;
    flex-direction: column;
`

const FormAlamat = () => {
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [formData, setFormData] = useState({
      name: "",
      kelurahan: "",
      kecamatan: "",
      kabupaten: "",
      provinsi: "",
      detail: "",
    });
const [responseData, setResponseData] = useState(null);
const [error, setError] = useState([]);

  //   Provinsi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json`
        );
        setProvinsi(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //   Kabupaten
  useEffect(() => {
    const fetchKabupaten = async () => {
      if (formData.provinsi.id) {
        try {
          const response = await axios.get(
            `https://kanglerian.github.io/api-wilayah-indonesia/api/regencies/${formData.provinsi.id}.json`
          );
          setKabupaten(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchKabupaten();
  }, [formData.provinsi.id]);

  //   Kecamatan
  useEffect(() => {
    const fetchKecamatan = async () => {
      if (formData.kabupaten.id) {
        try {
          const response = await axios.get(
            `https://kanglerian.github.io/api-wilayah-indonesia/api/districts/${formData.kabupaten.id}.json`
          );
          setKecamatan(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchKecamatan();
  }, [formData.kabupaten.id]);

  //   Kelurahan
  useEffect(() => {
    const fetchKelurahan = async () => {
      if (formData.kecamatan.id) {
        try {
          const response = await axios.get(
            `https://kanglerian.github.io/api-wilayah-indonesia/api/villages/${formData.kecamatan.id}.json`
          );
          setKelurahan(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchKelurahan();
  }, [formData.kecamatan.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle select Provinsi
    if (name === "provinsi") {
      const selectedProvinsi = provinsi.find((item) => item.id === value);
      setFormData((prevState) => ({
        ...prevState,
        provinsi: {
          id: value,
          name: selectedProvinsi.name,
        },
      }));
    }
    // Handle select Kabupaten
    else if (name === "kabupaten") {
      const selectedKabupaten = kabupaten.find((item) => item.id === value);
      setFormData((prevState) => ({
        ...prevState,
        kabupaten: {
          id: value,
          name: selectedKabupaten.name,
        },
      }));
    }
    // Handle select Kecamatan
    else if (name === "kecamatan") {
      const selectedKecamatan = kecamatan.find((item) => item.id === value);
      setFormData((prevState) => ({
        ...prevState,
        kecamatan: {
          id: value,
          name: selectedKecamatan.name,
        },
      }));
    }
    // Handle select Kelurahan
    else if (name === "kelurahan") {
      const selectedKelurahan = kelurahan.find((item) => item.id === value);
      setFormData((prevState) => ({
        ...prevState,
        kelurahan: {
          id: value,
          name: selectedKelurahan.name,
        },
      }));
    }
    // Handle other inputs
    else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    console.log(formData);
  };

  const token = useSelector(state => state.account.account.token)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    // console.log(formData);

    try {
        const response = await axios.post('http://localhost:3000/api/delivery-addresses', {
            name: formData.name,
            detail: formData.detail,
            kelurahan: formData.kelurahan.name,
            kecamatan: formData.kecamatan.name,
            kabupaten: formData.kabupaten.name,
            provinsi: formData.provinsi.name,
        }, {
            headers: {
              'Authorization': `Bearer ${token}` // Menambahkan token ke header permintaan
            }
          });
        setResponseData(response.data)
        if (response.data.error == 1) {
            setError(response.data.error);
            console.log(response.data.error);
        } else if (response.data.error != 1) {
            alert('Alamat berhasil ditambahkan')
            window.location.replace('/checkout');
        }
        // console.log(responseData);
        // dispatch(addAccount({id:`${response.data.user._id}`, email:`${response.data.user.email}`, role:`${response.data.user.role}`, token:`${response.data.token}`}))
    } catch (error) {
        // console.error(error.response); // Menampilkan pesan kesalahan dari server
        // console.error(error); // Menampilkan pesan kesalahan dari server
    }
  };

  return (
    <Container>
      <FormContainer>
        <h2 style={{textAlign:'center', padding:'15px 0px'}}>Tuliskan Alamat Anda Disini</h2>
        <form onSubmit={handleSubmit}>
          <Label>Provinsi:</Label>
          <br />
          <Div>
            <Select
                name="provinsi"
                // value={formData.provinsi}
                onChange={handleChange}
            >
                {provinsi.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
                ))}
            </Select>
            {error && responseData?.fields.provinsi && <ErrorMsg>{responseData?.fields.provinsi.message}</ErrorMsg>}
          </Div>

          <br />
          <Label>Kabupaten:</Label>
          <br />
          <Div>
          <Select
            name="kabupaten"
            // value={formData.kabupaten}
            onChange={handleChange}
          >
            {kabupaten.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          {error && responseData?.fields.kabupaten && <ErrorMsg>{responseData?.fields.kabupaten.message}</ErrorMsg>}
          </Div>

          <br />
          <Label>Kecamatan:</Label>
          <br />
          <Div>
          <Select
            name="kecamatan"
            // value={formData.kecamatan}
            onChange={handleChange}
            >
            {kecamatan.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          {error && responseData?.fields.kecamatan && <ErrorMsg>{responseData?.fields.kecamatan.message}</ErrorMsg>}
            </Div>

          <br />
          <Label>Kelurahan:</Label>
          <br />
          <Div>
          <Select
            name="kelurahan"
            // value={formData.kelurahan}
            onChange={handleChange}
          >
            {kelurahan.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          {error && responseData?.fields.kelurahan && <ErrorMsg>{responseData?.fields.kelurahan.message}</ErrorMsg>}
          </Div>

          <br />
          <Label>Nama:</Label>
          <br />
          <Div>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
            {error && responseData?.fields.name && <ErrorMsg>{responseData?.fields.name.message}</ErrorMsg>}
          </Div>


          <br />
          <Label>Detail Alamat:</Label>
          <br />
          <Div>
          <Input
            type="text"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
          />
            {error && responseData?.fields.detail && <ErrorMsg>{responseData?.fields.detail.message}</ErrorMsg>}
          </Div>

          <br />
          <Button type="submit">Submit</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default FormAlamat;
