/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import joi from 'joi';

function SignUpScreen() {

    const {register, handleSubmit} = useForm();
    const [inputError, setInputError] = useState(false);

    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email({ tlds: {allow: false} }).required(),
        password: joi.string().required(),
        passwordConfirmation: joi.string().required()
    });

    async function onSubmit(obj) {
        try {
            setInputError(false);
            await signUpSchema.validateAsync(obj, { abortEarly: false});
        } catch (e) {
            // console.log(e.details.map(detail => detail.message));
            console.log('Erro na validação dos inputs', e);
            setInputError(true);
        }

        if (obj.password !== obj.passwordConfirmation) {
            console.log('As senhas precisam ser iguais!');
            setInputError(true);
        }
    }

    return (
        <LoginWrapper>
            <h1>MyWallet</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Nome" {...register("name")} required />
                <input type="email" placeholder="E-mail" {...register("email")} required />
                <input type="password" placeholder="Senha" {...register("password")} required />
                <input type="password" placeholder="Confirme a senha" {...register("passwordConfirmation")} required />
                {inputError === false ? <></> : <span>Verifique os dados!</span>}
                <button type="submit" disabled={false}>Entrar</button>
            </form>
            <Link to='/'>
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </LoginWrapper>
    )
}

export default SignUpScreen;

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