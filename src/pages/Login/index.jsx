/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Jika menggunakan React Router

// Styled components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoginForm = styled.form`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
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
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
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

const Login = () => {
    return (
        <Container>
            <LoginForm>
                <Title>Login</Title>
                <FormGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" id="email" name="email" required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" id="password" name="password" required />
                </FormGroup>
                <Button type="submit">Login</Button>
                <RegisterLink to="/register">Don't have an account? Register here.</RegisterLink>
            </LoginForm>
        </Container>
    );
};

export default Login;