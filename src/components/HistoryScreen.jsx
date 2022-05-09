/* eslint-disable arrow-body-style */
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { IoIosLogOut, IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import UserContext from '../contexts/UserContext';

function HistoryScreen() {

    const {user, setUser} = useContext(UserContext);
    const [totalSign, setTotalSign] = useState('');
    const [transactions, setTransactions] = useState([]);

    const navigate = useNavigate();

    const config = {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    };

    useEffect(() => {
        const promise = axios.get('http://localhost:5000/history', config);
        promise.then(response => {
            setTransactions(response.data.transactions);
        })
        .catch(error => console.log(error.response));
    }, []);

    function logOut() {
        
        // eslint-disable-next-line no-alert
        const confirmation = confirm(`Deseja sair da sua conta, ${user.name}?`);

        if (confirmation) {
            setUser({...user,
            name: '',
            email: '',
            token: '',
            transactions: []});
            navigate('/');
        }

    }

    const calculateTotal = () => {
        let total = 0;
        transactions.forEach(transaction => {
            if (transaction.type === 'income') total += transaction.value;
            else total -= transaction.value
        })
        
        if (total > 0) {
            setTotalSign('positive');
        } else {
            setTotalSign('negative');
        }

        return Math.abs(total.toFixed(2));
    }

    function balanceHistory() {
        return(
        <>
            <section className="transactions">
                {transactions.map(transaction => {
                    return (
                        <article>
                            <div>
                                <span>{transaction.date}</span>
                                <p className="description">{transaction.description}</p>
                            </div>
                            <p className={transaction.type}>{transaction.value}</p>
                        </article>
                    )
                })}
            </section>
            <footer>
                <p className="text">SALDO</p>
                <p className={`number ${totalSign}`}>{calculateTotal()}</p>
            </footer>
        </>    
        )
    }

    return (
        <ScreenWrapper>
            <header>
                <p>Olá, {user.name}</p>
                <IoIosLogOut onClick={() => logOut()}/>
            </header>
            <section className='board'>
                {transactions.length === 0 ? <p className="empty">Não há registros de entrada ou saída</p> : balanceHistory()}
            </section>
            <section className='buttons'>
                <Link to="/income">
                    <article>
                        <IoIosAddCircleOutline />
                        <p>Nova entrada</p>
                    </article>
                </Link>
                <Link to="/outcome">
                    <article>
                        <IoIosRemoveCircleOutline />
                        <p>Nova saída</p>
                    </article>
                </Link>
            </section>
        </ScreenWrapper>
    )
}

export default HistoryScreen;

const ScreenWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        max-width: 600px;
        padding: 15px;
        color: var(--color-white);

        p {
            font-family: var(--font-raleway);
            font-size: 26px;
            line-height: 30px;
            font-weight: 700;
        }

        svg {
            font-size: 26px;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .board {
        width: 90%;
        background-color: var(--color-white);
        height: 65vh;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        position: relative;

        .empty {
            font-family: var(--font-raleway);
            font-weight: 400;
            font-size: 20px;
            line-height: 23.48px;
            color: var(--color-placeholder);
            text-align: center;
            margin: 15%;
        }

        .transactions {
        position: absolute;
        top: 0;
        width: 100%;

            article {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                margin-top: 10px;
                font-family: var(--font-raleway);
                font-size: 16px;
                line-height: 19px;
                font-weight: 400;
    
                div {
                    display: flex;
                    
                    span {
                        margin-right: 5px;
                        color: #C6C6C6;
                    }
    
                    .description {
                        color: var(--color-black);
                    }
                }
    
                .income {
                    color: var(--color-green);
                }
    
                .outcome {
                    color: var(--color-red);
                }
            }
        }

        footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            position: absolute;
            bottom: 0;
            padding: 10px;
            font-family: var(--font-raleway);
            font-size: 17px;
            line-height: 19px;

            .text {
                font-weight: 700;
                color: var(--color-black);
            }

            .number {
                font-weight: 400;
            }

            .positive {
                color: var(--color-green);
            }

            .negative {
                color: var(--color-red);
            }
        }
    }

    .buttons {
        display: flex;
        width: 90%;
        justify-content: space-between;
        margin-top: 13px;
        margin-bottom: 15px;

        article {
            width: 130px;
            height: 100px;
            border-radius: 5px;
            background-color: var(--color-buttons);
            color: var(--color-white);
            font-size: 17px;
            font-family: var(--font-raleway);
            font-weight: 700;
            margin-right: 3px;
            margin-left: 3px;
            position: relative;

            svg {
                position: absolute;
                left: 11px;
                top: 11px;
            }

            p {
                position: absolute;
                bottom: 11px;
                left: 11px;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }
`