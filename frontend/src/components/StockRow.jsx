import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import ChartModal from "./ChartModal"
import ScaleLoader from "react-spinners/ScaleLoader";
import { BiLineChart } from 'react-icons/bi'
import { HiOutlineTrash } from 'react-icons/hi'
import { IconContext } from "react-icons";

const StockRow = ({ symbol, handleDelete, allowDelete }) => {

    symbol = symbol.toUpperCase();

    const baseUrl = '/api/v2/nse'

    const [showChartModal, setShowChartModal] = useState(false);
    const [response, setResponse] = useState({});
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const res = await fetch(`${baseUrl}/equity/${symbol}`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
            setResponse(await res.json());
        }
        catch (err) {
            console.error(err);
        }
    }

    // const handleDelete = async () => {
    //     try {

    //         const res = await fetch(`/stock/${symbol}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Authorization': token
    //             }
    //         })
    //         console.log(await res.json());
    //         const newStock = stockList.filter((el) => el !== symbol)
    //         console.log(newStock);
    //         setStockList(newStock)
    //     } catch (err) {
    //         console.error(err);
    //     }
    //     //or

    //     // const stockPos = stockList.indexOf(symbol.toUpperCase());
    //     // console.log('pos',stockPos)
    //     // stockList = stockList.splice(stockPos,1)
    //     // console.log(stockList)
    //     // setStockList(stockList)
    // }

    // const fetchList = async () => {
    //     try {
    //         const res = await fetch('/stock', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': token
    //             }
    //         })
    //         const response = await res.json();
    //         setStockList(response.stocks)
    //         console.log(stockList)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    // Fetches data on first render
    useEffect(() => {
        fetchData();
        return () => {
            setResponse({});
        }
        // eslint-disable-next-line
    }, [])

    //Fetches data after the first render, every 60 seconds
    useEffect(() => {
        let interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    });

    const override = css`
        display: block;
        text-align: center;
        margin: 0 auto;
    `;

    return (
        <>
            {response.info ?
                <>
                    <tr>
                        <td className="px-2 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <div className="text-sm font-semibold text-gray-900">
                                        {response.info.symbol}

                                    </div>
                                    <div className="text-sm text-gray-500 font-normal">
                                        {response.info.companyName}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">
                                {response.priceInfo.lastPrice.toFixed(2)}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">

                            {/* If percent change > 0 then color green.
                                If pChange < 0 then color red
                                If pChange = 0 then neutral color */}

                            <div 
                                className={(response.priceInfo.pChange.toFixed(2) > 0) ? 'text-sm text-green-600 font-medium' :
                                           (response.priceInfo.pChange.toFixed(2) === 0.00) ? 'text-sm text-gray-500 font-medium' : 'text-sm text-red-600 font-medium'}>
                                               
                                {(response.priceInfo.change.toFixed(2)) === '-' ? <>0.00</> : response.priceInfo.change.toFixed(2)}
                                
                                <span className='text-xs ml-1 font-medium'>
                                    ({response.priceInfo.pChange.toFixed(2)}%)
                                </span>

                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">
                                {response.metadata.lastUpdateTime.substring(0, 11)}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium tracking-tighter">
                            {response.metadata.lastUpdateTime.substring(12)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className="flex py-1 text-white bg-gray-600 border-0 px-2 focus:outline-none text-lg focus:ring-3 focus:ring-gray-300 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowChartModal(true)}
                            >
                                <BiLineChart /> <span className="text-sm ml-1 tracking-wider">chart</span>
                            </button>
                        </td>
                        { allowDelete ?
                            <td>
                                <IconContext.Provider value={{ color: "rgb(235, 46, 46)", size: "1.25em" }}>
                                    <HiOutlineTrash className="cursor-pointer" onClick={() => handleDelete(symbol)} />
                                </IconContext.Provider>
                            </td>
                            : null
                        }
                    </tr>
                    {showChartModal ?
                        <ChartModal
                            setShowChartModal={setShowChartModal}
                            symbol={decodeURIComponent(symbol)}
                        />
                        : null
                    }
                </>
                :
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan='6'>
                        {/* <HashLoader color={'#6366f1'} css={override} loading={true} size={60} /> */}
                        <ScaleLoader color={'#6366f1'} css={override} loading={true} height={40} width={5} />
                    </td>
                </tr>
            }
        </>


    )
};

export default StockRow;

