import styled from 'styled-components';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';


function SignInScreen() {

    return (
        <LoginWrapper>
            <h1>MyWallet</h1>
            <form>
                <input type="email" placeholder="E-mail" required />
                <input type="password" placeholder="Senha" required />
                <button type="submit" disabled={false}>Entrar</button>
            </form>
            <p>Primeira vez? Cadastre-se</p>
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