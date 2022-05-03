import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignInScreen from './SignInScreen';

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
                    {/* <Route path='/signup' element={<SignUpScreen />} />
                    <Route path='/habits' element={<HabitScreen />} />
                    <Route path='/today' element={<TodayScreen />} />
                    <Route path='/history' element={<HistoryScreen />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;