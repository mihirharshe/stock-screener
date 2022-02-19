import './App.css'
import StockTable from './components/StockTable'

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Gainers from './components/Gainers';
import Losers from './components/Losers';
import Login from './components/Login';
import Register from './components/Register';

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
                            {/* <Header logout={logout}/>
                            <Status /> */}
                            <Route
                                path='/watchlist'
                                element={
                                    <StockTable
                                        logout={logout}
                                    />} />

                            <Route path='/gainers' element={<Gainers logout={logout} />} />
                            <Route path='/losers' element={<Losers logout={logout} />} />
                        </>)}
                    <Route path='/register' element={<Register />} />

                    <Route path="*" element={<Navigate to={auth ? "/watchlist" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
