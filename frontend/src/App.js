import './App.css'
import "@fontsource/plus-jakarta-sans/200.css"
import "@fontsource/plus-jakarta-sans/300.css"
import "@fontsource/plus-jakarta-sans/400.css"
import "@fontsource/plus-jakarta-sans/500.css"
import "@fontsource/plus-jakarta-sans/600.css"
import "@fontsource/plus-jakarta-sans/700.css"
import StockTable from './components/StockTable'

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Gainers from './components/Gainers';
import Losers from './components/Losers';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Status from './components/Status';

import jwt from 'jsonwebtoken';


function App() {
    const [auth, setAuth] = useState(null)
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            let trimmedToken = token.substring(7);
            verifyJwt(trimmedToken);
            setAuth(true)
        } else {
            setAuth(false)
        }
    }, [token])

    useEffect(() => {
        localStorage.setItem("user", auth)
    }, [auth])

    const logout = () => {
        setAuth(false);
        localStorage.removeItem('token');
    }

    const verifyJwt = (token) => {
        try {
            let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
            return decoded;
        } catch (err) {
            console.log(err)
            if (err.name === 'JsonWebTokenError') {
                logout();
            }
        }
    }

    return (
        <Router>
            <div className="App">
                {/* {window.location.pathname !== "/login" && window.location.pathname !== '/protected' && window.location.pathname !== '/register' ? (
                    <>
                        <Header />
                        <Status />
                    </>
                ) : null} */}

                <Routes>
                    {!auth && (
                        <Route
                            path='/login'
                            element={<Login authenticate={() => setAuth(true)} />} />
                    )}
                    {auth && (
                        <>

                            <Route
                                path='/watchlist'
                                element={
                                    <>
                                        <Header logout={logout} />
                                        <Status />
                                        <StockTable />
                                    </>
                                }
                            />

                            <Route
                                path='/gainers'
                                element={
                                    <>
                                        <Header logout={logout} />
                                        <Status />
                                        <Gainers />
                                    </>
                                }
                            />
                            <Route
                                path='/losers'
                                element={
                                    <>
                                        <Header logout={logout} />
                                        <Status />
                                        <Losers />
                                    </>
                                }
                            />
                        </>)}
                    <Route path='/register' element={<Register />} />

                    <Route path="*" element={<Navigate to={auth ? "/watchlist" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
