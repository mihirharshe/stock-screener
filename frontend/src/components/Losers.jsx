import { useState, useEffect } from 'react';
import StockRow from './StockRow';
import Header from './Header';
import Status from './Status';

const Losers = ({ logout }) => {

    const [response, setResponse] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`/api/v2/nse/losers/NIFTY%2050`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setResponse(data)
            })
    }, [])


    return (
        <>
            <Header logout={logout}/>
            <Status />
            <div className="content">
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
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {response.losers?.map((item) => (
                                            <StockRow
                                                key={item.symbol}
                                                symbol={encodeURIComponent(item.symbol)}
                                                allowDelete={false} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Losers;