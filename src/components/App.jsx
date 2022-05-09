import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HistoryScreen from './HistoryScreen';
import IncomeScreen from './IncomeScreen';
import OutcomeScreen from './OutcomeScreen';

import ResetCSS from '../assets/resetCss';
import GlobalStyles from '../assets/GlobalStyles';
import UserContext from '../contexts/UserContext';

// TODO: insert dotenv in the react project and loaders
// ver por que não da pra colocar 0 no input do valor
// fazer a tela do outcome

function App() {

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        const initialValue = JSON.parse(saved);
        return initialValue || {
            token: '',
            name: '',
            email: '',
            habits: []
        };
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    // TODO: eslint diz para usar useMemo dentro dos valores do context
    return (
        <>
            <ResetCSS />
            <GlobalStyles />
            <UserContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<SignInScreen />} />
                        <Route path='/sign-up' element={<SignUpScreen />} />
                        <Route path='/history' element={<HistoryScreen />} />
                        <Route path='/income' element={<IncomeScreen />} />
                        <Route path='/outcome' element={<OutcomeScreen />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}

export default App;