import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import ChartModal from "./ChartModal"
import HashLoader from "react-spinners/HashLoader";
import { BiLineChart } from 'react-icons/bi'
// import { HiOutlineTrash } from 'react-icons/hi'
// import { IconContext } from "react-icons";

const StockRow = ({ symbol }) => {

    const [showChartModal, setShowChartModal] = useState(false);
    const [response, setResponse] = useState({});

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/nse/get_quote_info?companyName=${symbol}`, {
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

    // Fetches data on first render
    useEffect(() => {
        fetchData();
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
        border-color: red;
    `;

    return (
        <>
            {response.data ?
                <>
                    <tr>
                        <td className="px-2 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {(response.data?.[0].symbol).replaceAll('&amp;', '&')}

                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {response.data?.[0].companyName}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                {response.data?.[0].lastPrice}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">

                            {/* If percent change > 0 then color green.
                                If pChange < 0 then color red
                                If pChange = 0 then neutral color */}

                            <div className={(response.data?.[0].pChange > 0) ? 'text-sm text-green-600' :
                                (response.data?.[0].pChange === 0.00) ? 'text-sm text-gray-500' : 'text-sm text-red-600'}>
                                {(response.data?.[0].change) === '-' ? <>0.00</> : response.data?.[0].change}
                                <span className='text-xs ml-1'>({response.data?.[0].pChange}%)</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                {response.lastUpdateTime?.substring(0, 11)}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {response.lastUpdateTime?.substring(12)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className="flex py-1 text-white bg-gray-600 border-0 px-2 focus:outline-none text-lg focus:ring-3 focus:ring-gray-300 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowChartModal(true)}
                            >
                                <BiLineChart /> <span className="text-sm ml-1">Chart</span>
                            </button>
                        </td>
                        {/* <td>
                            <IconContext.Provider value={{ color: "rgb(235, 46, 46)", size: "1.25em"}}>
                                <HiOutlineTrash onClick={()=> removeStock()}/>
                            </IconContext.Provider>
                        </td> */}
                    </tr>
                    {showChartModal ?
                        <ChartModal
                            setShowChartModal={setShowChartModal}
                            symbol={symbol}
                        />
                        : null
                    }
                </>
                :
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan='6'>
                        <HashLoader color={'#6366f1'} css={override} loading={true} size={60} />
                    </td>
                </tr>
            }
        </>


    )
};

export default StockRow;

