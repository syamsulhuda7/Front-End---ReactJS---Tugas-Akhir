import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

const RegisterForm = styled.form`
    background-color: gold;
    width: 350px;
    height: 450px;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
    padding: 10px 0px 10px 0px;
`;

const FormGroup = styled.div`
    padding: 13px 0px;
`;

const Label = styled.label`
    display: block;
    font-weight: bold;
    padding: 5px 0px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: transparent;
    border-radius: 5px;

    &:focus {
        outline: none;
        background-color: #f8eeb7;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: black;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    margin-top: 40px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #000000a9;
    }
`;
const ErrorMsg = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 5px;
    position: absolute;
`;
const RegisterLink = styled(Link)`
    display: block;
    text-align: center;
    margin-top: 15px;
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Register = () => {
// State untuk menyimpan data input
const [fullName, setFullName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [response, setResponse] = useState(null);
const [error, setError] = useState(null);

// Fungsi untuk meng-handle proses registrasi
const register = async (e) => {
    e.preventDefault(); 
    try {
        const response = await axios.post('http://localhost:3000/auth/register', {
            full_name: fullName,
            email: email,
            password: password
        });
        setResponse(response)
        if (response.data.error == 1) {
            setError(response.data.error);
        } else if (response.data.error != 1) {
            alert('Selamat, Registrasi telah berhasil, silahkan login')
            window.location.replace('/login');
        }
    } catch (error) {
        console.error(error.response); // Menampilkan pesan kesalahan dari server
    }
};

    return (
        <Container>
            <RegisterForm onSubmit={register}>
                <Title>Register</Title>
                <FormGroup>
                    <Label htmlFor="fullname">Full Name:</Label>
                    <Input value={fullName} onChange={e => setFullName(e.target.value)} type="text" id="fullname" name="fullname" required />
                    <br />
                    {error && response.data.fields.full_name && <ErrorMsg>{response.data.fields.full_name.message}</ErrorMsg>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" required />
                    <br />
                    {error && response.data.fields.email && <ErrorMsg>{response.data.fields.email.message}</ErrorMsg>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" required />
                    <br />
                    {error && response.data.fields.password && <ErrorMsg>{response.data.fields.password.message}</ErrorMsg>}
                </FormGroup>
                <Button type="submit">Register</Button>
            </RegisterForm>
            <RegisterLink to="/login">Back to Login Page</RegisterLink>
        </Container>
    );
};

export default Register;
