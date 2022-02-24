import { useState, useEffect } from 'react';
import StockRow from './StockRow';
import ReactPaginate from 'react-paginate';

const Losers = () => {

    const [response, setResponse] = useState({});
    const [pageNumber, setPageNumber] = useState(0);

    const itemsPerPage = 10
    const itemsVisited = pageNumber * itemsPerPage

    const displayItems = response.losers
        ?.slice(itemsVisited, itemsVisited + itemsPerPage)
        .map((item) => {
            return (
                <StockRow
                    key={item.symbol}
                    symbol={encodeURIComponent(item.symbol)}
                    allowDelete={false}
                />
            )
        })

    const pageCount = Math.ceil(response.losers?.length / itemsPerPage)

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

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
            {response.losers?.length !== 0 ?
                <>
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
                                                {displayItems}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        containerClassName={"paginationBtns"}
                        previousClassName={"previousBtn"}
                        nextClassName={"nextBtn"}
                        disabledClassName={"disabledBtn"}
                        activeClassName={"activeBtn"}
                    />
                </>
                :
                <div className="flex justify-center text-3xl font-semibold mt-10">
                    Looks like the market is extremely bullish! No top losers in NIFTY 50
                </div>
            }
        </>
    );
}

export default Losers;