import { useState } from 'react';

/**
 * 
 * @todo : [input, setInput] state wasn't working properly. The state wasn't getting updated in input, need to look into that 
 *          Instead for now, stored the symbol directly in a variable and then used it.
 */

const Modal = ({ stocks, setStocks }) => {
    const [showModal, setShowModal] = useState(false);
    //const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const [exists, setExists] = useState(false);

    const handleSubmit = async (e) => {
        setError(false);
        setExists(false);
        e.preventDefault();
        const data = new FormData(e.target);
        //setInput(`${data.get('symbol')}`)
        // var localStocks = JSON.parse(sessionStorage.getItem("localStocks") || "[]");
        let stockSymbol = data.get('symbol').toUpperCase();
        const res = await fetch(`/nse/get_quote_info?companyName=${data.get('symbol')}`)
            if(res.ok===true) {
                if((stocks.find(x => x.name === stockSymbol)===undefined)) {
                    setStocks([
                        ...stocks,
                        {
                            name: stockSymbol
                        },
                    ]);
                    // Trying to persist data in localStorage
                    // var singleStock = {
                    //     name: stockSymbol,
                    // };
                    // localStocks.push(singleStock);
                    // sessionStorage.setItem("localStocks", JSON.stringify(localStocks));
                    // window.location.reload();
                    setShowModal(false);
                } else {
                    setExists(true);
                }
                setError(false);
            } else {
                setExists(false);
                setError(true);
            }

        // setInput(e.target.value);
        // stocks.push({ name: `${data.get('symbol')}`})
    }
    const newModalClick = async (e) => {
        e.preventDefault();
        setShowModal(true);
        setError(false);
        setExists(false);
    }

    return (
        <>
            <button
                className="ml-4 mb-4 inline-flex text-white bg-gray-600 border-0 px-2 focus:outline-none rounded text-lg focus:ring-4 focus:ring-gray-300 ease-linear transition-all duration-150"
                type="button"
                onClick={newModalClick}
            >
                +
            </button>
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
                                        <input type="text" id="symbol-input" name="symbol" autoComplete="off" className="bg-gray-50 border-2 border-red-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        : 
                                        <input type="text" id="symbol-input" name="symbol" autoComplete="off" className="bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        }
                                        {error && (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">NOT FOUND</span>
                                        )}
                                        {exists ? (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">ALREADY EXISTS</span>
                                        ) : null}
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="bg-white focus:bg-gray-100 text-gray-500 focus:ring-4 focus:ring-gray-300 background-transparent rounded-lg border border-gray-200 uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 text-white rounded-lg ml-2 uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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