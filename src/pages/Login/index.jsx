/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Jika menggunakan React Router
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAccount } from '../../app/features/Auth/actions';

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

    &:hover {
        background-color: #75650b;
    }
`;

const RegisterLink = styled(Link)`
    display: block;
    text-align: center;
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
const ErrorMsg = styled.p`
    color: red;
    text-align: center;
`;

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [response, setResponse] = useState(null);
const [error, setError] = useState(null);

const dispatch = useDispatch()

// Fungsi untuk meng-handle proses registrasi
const login = async (e) => {
    e.preventDefault(); 
    try {
        const response = await axios.post('http://localhost:3000/auth/login', {
            email: email,
            password: password
        });
        setResponse(response)
        if (response.data.error == 1) {
            setError(response.data.error);
        } else if (response.data.error != 1) {
            window.location.replace('/');
        }
        dispatch(addAccount({id:`${response.data.user._id}`, email:`${response.data.user.email}`, role:`${response.data.user.role}`, token:`${response.data.token}`}))
    } catch (error) {
        console.log(error);
    }
};

    return (
        <Container>
            <LoginForm onSubmit={login}>
                {error && <ErrorMsg>{response.data.message}</ErrorMsg>}
                <Title>Login</Title>
                <FormGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" required />
                </FormGroup>
                <Button type="submit" >Login</Button>
                <div style={{display:'flex',alignItems:'center',gap:'5px',marginTop:'5px'}}> Don't have an account? Register <RegisterLink to="/register">here.</RegisterLink>
                </div>
            </LoginForm>
        </Container>
    );
};

export default Login;