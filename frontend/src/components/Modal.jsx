import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";
import { AiOutlineAreaChart } from 'react-icons/ai'

const Modal = ({ stockList, setStockList }) => {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [exists, setExists] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [fakeLoading, setFakeLoading] = useState(false);

    const baseUrl = '/api/v2/nse'

    useEffect(() => {
        setFakeLoading(true)
        setTimeout(() => setFakeLoading(false), 2000)
    }, [])

    const handleSubmit = async (e) => {
        setError(false);
        setExists(false);
        setLoading(true);
        e.preventDefault();
        const data = new FormData(e.target);
        const symbol = encodeURIComponent(data.get('symbol').toUpperCase());
        const token = localStorage.getItem('token');
        const res = await fetch(`${baseUrl}/equity/${symbol}`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })

        if (res.ok === true) {
            if ((stockList.find(x => x === symbol)) === undefined) {
                await axios.post('/api/v1/stock',
                    { symbol },
                    {
                        headers: {
                            'Authorization': token
                        }
                    })
                setStockList([
                    ...stockList,
                    symbol
                ])
                setShowModal(false);

            } else {
                setExists(true);
                setLoading(false);
            }
            setError(false);
            setLoading(false);
        } else {
            setExists(false);
            setError(true);
            setLoading(false);
        }
    }
    const newModalClick = async (e) => {
        e.preventDefault();
        setShowModal(true);
        setLoading(false);
        setError(false);
        setExists(false);
    }

    const tableOverride = css`
        display: block;
        text-align: center;
        margin: 5em 0 auto;
    `

    const modalOverride = css`
    display: block;
    margin: 0.5rem 0 0 0.25rem;
    `;

    return (
        <>
            {stockList.length !== 0 ?
                <button
                    className="mb-4 inline-flex text-white text-base bg-gray-600 border-0 p-1 focus:outline-none rounded focus:ring-4 focus:ring-gray-300 hover:opacity-90 ease-linear transition-all duration-150"
                    type="button"
                    onClick={newModalClick}
                >
                    <AiOutlineAreaChart className="self-center" /><span className="text-sm"> add </span>
                </button>
                :
                (!fakeLoading ?
                    <div className="text-4xl font-bold flex flex-col gap-5 justify-center items-center customStyles">
                        Add some stocks to get started
                        <button
                            className="tracking-wide py-1 rounded-md inline-flex items-center px-2 justify-center text-white text-lg bg-gray-600 border border-transparent focus:outline-none focus:ring-4 focus:ring-gray-300 hover:opacity-90 ease-linear transition-all duration-150"
                            type="button"
                            onClick={newModalClick}
                        >
                            <AiOutlineAreaChart /><span className="text-sm"> add </span>
                        </button>
                    </div>
                    :
                    <ScaleLoader color={'#6366f1'} css={tableOverride} loading={true} height={40} width={5}/>
                )
            }

            {showModal ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        Modal Title
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div> */}
                                    {/*body*/}
                                    <div className="relative p-5 flex-auto">
                                        <label htmlFor="symbol-input" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Symbol</label>
                                        {(error || exists) ?
                                            <input type="text" id="symbol-input" name="symbol" autoComplete="off" required className="bg-gray-50 border-2 border-red-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            :
                                            <input type="text" id="symbol-input" name="symbol" autoComplete="off" required className="bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        }
                                        {error && (
                                            <span className="flex items-center font-semibold tracking-wide text-red-500 text-xs mt-1 ml-1">NOT FOUND</span>
                                        )}
                                        {exists ? (
                                            <span className="flex items-center font-semibold tracking-wide text-red-500 text-xs mt-1 ml-1">ALREADY EXISTS</span>
                                        ) : null}
                                        {isLoading ? (
                                            <ScaleLoader color={'#6366f1'} css={modalOverride} loading={true} height={20} width={3} radius={10} />
                                        ) : null}
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="bg-white focus:bg-gray-100 text-gray-500 focus:ring-4 focus:ring-gray-300 background-transparent rounded border border-gray-200 uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 text-white ml-2 uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        // onClick={() => setShowModal(false)}
                                        >
                                            Add to watchlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </form>
                </>
            ) : null}
        </>
    )
}

export default Modal;