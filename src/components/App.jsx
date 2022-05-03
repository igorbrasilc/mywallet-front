import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HistoryScreen from './HistoryScreen';
import IncomeScreen from './IncomeScreen';
import OutcomeScreen from './OutcomeScreen';

import ResetCSS from '../assets/resetCss';
import GlobalStyles from '../assets/GlobalStyles';

function App() {
    return (
        <>
            <ResetCSS />
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SignInScreen />} />
                    <Route path='/sign-up' element={<SignUpScreen />} />
                    <Route path='/history' element={<HistoryScreen />} />
                    <Route path='/income' element={<IncomeScreen />} />
                    <Route path='/outcome' element={<OutcomeScreen />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;