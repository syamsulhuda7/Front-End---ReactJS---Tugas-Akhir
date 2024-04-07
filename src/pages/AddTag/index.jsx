/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Jika menggunakan React Router
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LuArrowBigLeftDash } from "react-icons/lu";

// Styled components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoginForm = styled.form`
    background-color: gold;
    width: 320px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h2`
    text-align: center;
    padding: 20px 0px;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    font-weight: bold;
    padding-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: black;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    &:hover {
        background-color: #75650b;
    }
`;

const RegisterLink = styled(Link)`
    display: flex;
    color: black;
    font-size: 40px;
    font-weight: bold;
    text-decoration: none;
    align-items: center;
    position: absolute;
    bottom: 20px;
    left: 20px;
    cursor: pointer;
    transition: all .15s ease-in-out;
    &:hover{
        color: gold;
    }
`;
const ErrorMsg = styled.p`
    color: red;
    text-align: center;
    position: absolute;
`;
const Select = styled.select`
    height: 30px;
    width: 100%;
    overflow: auto;
    scrollbar-width: none;
`

const AddTag = () => {

const [tag, setTag] = useState('');
const [mapTag, setMapTag] = useState([]);
const [response, setResponse] = useState(null);
const [error, setError] = useState(false);
const [tagData, setTagData] = useState('')

const token = useSelector(state => state.account.account.token)

const postTags = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('http://localhost:3000/api/tags', {
            name: tag,
        }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          console.log(response);

        setResponse(response)
        if (response.data.error == 1) {
            setError(true);
        } else if (response.data.error != 1) {
            alert('Tag berhasil ditambahkan')
            setTag('')
            window.location.reload();
        }
    } catch (error) {
        console.log(error);
        setTag('')
    }
};

const removeTag = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.delete(`http://localhost:3000/api/tags/${tagData}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
        console.log(response);
        alert(`category berhasil dihapus`)
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};

const fetchTag = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/tags');
        setMapTag(response.data);
    } catch (error) {
        console.log(error);
    }
};

useEffect(()=> {
 fetchTag()
}, [])

const handleChange = (e) => {
    e.preventDefault()
    const {value} = e.target;
    setTagData(value)
}

    return (
        <Container>
            <div style={{display:'flex', gap:'50px'}}>
            <LoginForm onSubmit={postTags}>
                <Title>Tambah Tag</Title>
                <FormGroup>
                    <Label name='category'>Nama Tag:</Label>
                    <Input value={tag} onChange={e => setTag(e.target.value)} type="text" name="category" required />
                    {error && <ErrorMsg>*{response.data.fields.name.message}</ErrorMsg>}
                </FormGroup>
                <Button type="submit" >Tambahkan</Button>
            </LoginForm>
            
            <LoginForm onSubmit={removeTag} style={{boxShadow:'0px 0px 10px red'}}>
                <Title>Hapus Tag</Title>
                <FormGroup>
                    <Label name='category'>Nama Tag:</Label>
                    <Select name="category" onChange={handleChange} type="text" required>
                        <option >Pilih salah satu . . .</option>
                        {mapTag.map(item => (
                                <option key={item._id} value={item._id} >{item.name?.toUpperCase()}</option>
                        ))}
                    </Select>
                </FormGroup>
                <Button type="submit" style={{backgroundColor:'red'}} >Hapus</Button>
            </LoginForm>
            </div>
            <RegisterLink to="/addproduct"> <LuArrowBigLeftDash size={100}/> Kembali</RegisterLink>
        </Container>
    );
};

export default AddTag;