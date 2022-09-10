import React, { useEffect, useState } from 'react';
import ContentContainer from '../Common/ContentContainer';
import classes from './LoginPage.module.css';
import { Alert, Button, TextField } from '@mui/material';
import LoginClient from '../../app/Login/LoginClient';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, storeToken, storeUsername } from '../../app/User/UserSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const response = await LoginClient.requestJWT({username, password});
        if (!response.ok) {
            if (response.status === 401) {
                setError('Invalid credentials')
            } else {
                setError('Something went wrong. please try again.')
            }
            return;
        }

        const body = await response.json();

        console.log(body);

        dispatch(storeUsername(body.username));
        dispatch(storeToken(body.token));
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <ContentContainer className={classes.loginWindow}>
            { error && <Alert severity={"error"}>{error}</Alert> }
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <TextField
                        fullWidth={true}
                        value={username}
                        label={"Username"}
                        onChange={onUsernameChange}
                        sx={{marginBottom: 2}}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth={true}
                        type={"password"}
                        value={password}
                        label={"Password"}
                        onChange={onPasswordChange}
                        sx={{marginBottom: 2}}
                    />
                </div>
                <Button variant={"contained"} type={"submit"}>Go</Button>
            </form>
        </ContentContainer>
    );
};

export default LoginPage;
