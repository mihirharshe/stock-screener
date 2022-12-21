import { useState, useEffect } from 'react'
import axios from 'axios';
import StockRow from './StockRow'
import Modal from './Modal';
import ReactPaginate from 'react-paginate';


const StockTable = () => {

    const [stockList, setStockList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const handleDelete = async (symbol) => {
        try {
            const token = localStorage.getItem('token');

            await fetch(`/api/v1/stock/${symbol}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token
                }
            })
            const newStock = stockList.filter((el) => el !== symbol)
            setStockList(newStock)
        } catch (err) {
            console.error(err);
        }
    }

    const itemsPerPage = 10
    const itemsVisited = pageNumber * itemsPerPage

    const displayItems = stockList
        ?.slice(itemsVisited, itemsVisited + itemsPerPage)
        .map((item) => {
            return (
                <StockRow
                    key={item}
                    symbol={item}
                    handleDelete={handleDelete}
                    allowDelete={true}
                />
            )
        })

    const pageCount = Math.ceil(stockList?.length / itemsPerPage)

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

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
                console.error(err);
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <>
                <div className="content">
                    <Modal stockList={stockList} setStockList={setStockList} />
                    {stockList.length !== 0 ?
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 bg-white">
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
                                                {displayItems}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null}
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
        </>
    )
};


export default StockTable