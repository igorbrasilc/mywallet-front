/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import axios from 'axios';
import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import UserContext from '../contexts/UserContext';


function SignInScreen() {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {user, setUser} = useContext(UserContext);

    async function onSubmit(obj) {
        setLoading(true);

        try {
            await axios.post('http://localhost:5000/sign-in', obj)
            .then(response => {

                const {name, email, token, incomes, outcomes} = response.data;
                setUser({...user, name, email, token, incomes, outcomes});
                setLoading(false);
                navigate('/history');
            })
        } catch (e) {
            console.log('Problema no post para o server', e.data);
            setLoading(false);
            setInputError(true);
        }
    }

    return (
        <LoginWrapper>
            <h1>MyWallet</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="E-mail" {...register('email')} required />
                <input type="password" placeholder="Senha" {...register('password')} pattern="^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$"
                title="Deve conter pelo menos 1 número, 1 letra maiúscula, 1 minúscula e no maximo 6 caracteres" required />
                {inputError === false ? <></> : <span>Verifique os dados!</span>}
                <button type="submit" disabled={loading}>Entrar</button>
            </form>
            <Link to='/sign-up'>
                <p>Primeira vez? Cadastre-se</p>
            </Link>
        </LoginWrapper>
    )
}

export default SignInScreen;

const LoginWrapper = styled.main`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: var(--font-raleway);
    height: 100vh;

    a {
        text-decoration: none;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 90%;

        input {
            margin-bottom: 13px;
            height: 58px;
            border-radius: 5px;
            border: none;
            font-size: 100%;
            padding-left: 15px;

            &::placeholder {
                color: var(--color-black);
                opacity: 0.9;
            }

            &:focus {
            outline: none;
            }

            &:disabled {
                background-color: grey;
            }
        }

        button {
            height: 46px;
            background-color: var(--color-buttons);
            color: var(--color-white);
            font-size: 100%;
            border-radius: 5px;
            border: none;

            &:hover {
                cursor: pointer;
                height: 58px;
            }

            &::disabled {
                background-color: grey;
            }
        }

        span {
            font-size: 15px;
            color: var(--color-white);
            text-align: center;
            margin-bottom: 15px;
        }
    }

    h1 {
        font-family: var(--font-saira);
        color: var(--color-white);
        font-size: 32px;
        line-height: 50.37px;
        margin-bottom: 24px;
    }

    p {
        color: var(--color-white);
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        margin-top: 36px;

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
`