import { useState, useEffect } from 'react'
import axios from 'axios';
import StockRow from './StockRow'
import Modal from './Modal';
import Header from './Header';
import Status from './Status';

const StockTable = ({ logout }) => {

    // const [stocks, setStocks] = useState([]);
    const [stockList, setStockList] = useState([]);

    const handleDelete = async (symbol) => {
        try {
            const token = localStorage.getItem('token');

            const res = await fetch(`/api/v1/stock/${symbol}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token
                }
            })
            console.log(await res.json());
            const newStock = stockList.filter((el) => el !== symbol)
            console.log(newStock);
            setStockList(newStock)
        } catch (err) {
            console.error(err);
        }
        //or

        // const stockPos = stockList.indexOf(symbol.toUpperCase());
        // console.log('pos',stockPos)
        // stockList = stockList.splice(stockPos,1)
        // console.log(stockList)
        // setStockList(stockList)
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const stocksDB = await axios.get('/api/v1/stock',
                    {
                        headers: {
                            Authorization: token
                        }
                    })
                setStockList(stocksDB.data.stocks);
            } catch (err) {
                // navigate('/login')
                console.error(err);
            }
        }

        fetchData();
    }, [])
    // var localStocks = JSON.parse(sessionStorage.getItem("localStocks") || "[]");
    return (
        <>
            <Header logout={logout} />
            <Status />


            <div className="content">
                    <Modal stockList={stockList} setStockList={setStockList} />
                {stockList.length !== 0 ?
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Ticker
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Last Trading Price
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Day change
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Last Updated
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Chart
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {/* {stocks.map((item) => (
                                            <StockRow key={item.name} symbol={item.name} />
                                        ))} */}
                                            {stockList.map((item) => (
                                                <StockRow key={item} symbol={item} handleDelete={handleDelete} allowDelete={true} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    : 
                    // <div className="text-4xl font-bold flex justify-center items-center customStyles">
                    //     Add some stocks to get started
                    // </div>
                null}
            </div>
        </>
    )
};


export default StockTable