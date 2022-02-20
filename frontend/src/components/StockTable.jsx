import { useState, useEffect } from 'react'
import axios from 'axios';
import StockRow from './StockRow'
import Modal from './Modal';
import Header from './Header';
import Status from './Status';

const StockTable = ({ logout }) => {

    const [stockList, setStockList] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const stocks = await axios.get('/stock',
                    {
                        headers: {
                            Authorization: token
                        }
                    })
                console.log('stocks',stocks);
                setStockList(stocks.data.stocks);
            } catch (err) {
                // navigate('/login')
                console.error(err);
            }
        }
        fetchData();
        console.log('in use effect',stockList);
    }, [])
    // var localStocks = JSON.parse(sessionStorage.getItem("localStocks") || "[]");
    return (
        <>
            <Header logout={logout}/>
            <Status />


            <div className="spacing">
                <div className="flex justify-end">
                    <Modal />
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ticker
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Trading Price
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Day change
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Updated
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Chart
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* {stocks.map((item) => (
                                            <StockRow key={item.name} symbol={item.name} />
                                        ))} */}
                                        {stockList.map((item) => (
                                            <StockRow symbol={item} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


export default StockTable