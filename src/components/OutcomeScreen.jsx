/* eslint-disable react/jsx-props-no-spreading */
import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {IoIosClose} from 'react-icons/io';
import {useForm} from 'react-hook-form';

import UserContext from '../contexts/UserContext';
import ValueMasked from '../masks/ValueMasked';


function OutcomeScreen() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {user, setUser} = useContext(UserContext);
    const {register, handleSubmit} = useForm();

    const config = {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    };

    async function onSubmit(obj) {
        setLoading(true);

        const objToPost = {
            description: obj.description,
            type: 'outcome',
            value: Number(obj.value.replace(',', '.'))
        }

        try {
            await axios.post('http://localhost:5000/new-outcome', objToPost, config)
            .then(response => {

                const transactions = response.data;

                setUser({...user, transactions});
                setLoading(false);
                setError(false);
            })
        } catch (e) {
            console.log('Problema no post para o server', e.data);
            setLoading(false);
            setError(true);
        }
    }

    function checkErrorOnPost() {
        if (error === '') return <></>;
        if (error === true) return <h6 className="fail">Não cadastrado...</h6>;
        
        return <h6 className="success">Movimentação cadastrada! Retorne ou cadastre outra</h6>;
    }

    return (
        <NewTransactionWrapper>
            <header>
                <p>Nova Saída</p>
                <IoIosClose onClick={() => navigate('/history')}/>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ValueMasked callback={register} disabled={loading} />
                <input type="text" placeholder="Descrição" {...register('description')} disabled={loading} required />
                <button type="submit" disabled={loading}>Salvar saída</button>
            </form>
            {checkErrorOnPost()}
        </NewTransactionWrapper>
    )
}

export default OutcomeScreen;

const NewTransactionWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--color-white);
    width: 100vw;
    max-width: 600px;

    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        font-size: 26px;
        line-height: 30px;
        color: var(--color-white);
        font-weight: 700;
        margin-bottom: 25px;
        
        p {
            font-family: var(--font-raleway);
        }

        svg {
            font-size: 35px;

            &:hover {
                cursor: pointer;
            }
        }
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
                    font-family: var(--font-raleway);
                    opacity: 0.9;
                }
    
                &:focus {
                outline: none;
                }
    
                &:disabled {
                    background-color: var(--color-buttons);
                    opacity: var(--opacity-button-disabled);
                }

                &::-webkit-outer-spin-button,
                ::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                &[type=number] {
                    -moz-appearance: textfield;
                }
            }
    
        button {
            height: 46px;
            background-color: var(--color-buttons);
            color: var(--color-white);
            font-size: 100%;
            font-weight: 700;
            font-family: var(--font-raleway);
            border-radius: 5px;
            border: none;
            
            &:hover {
                cursor: pointer;
                height: 58px;
            }
            
            &:disabled {
                background-color: grey;
                opacity: var(--opacity-button-disabled);
            }
        }
    }

    h6 {
        font-family: var(--font-raleway);
        font-weight: 700;
        font-size: 20px;
        margin: 20px;
        text-align: center;
        line-height: 25px;
    }

    .success {
        color: var(--color-green);
    }

    .fail {
        color: var(--color-red);
    }
`