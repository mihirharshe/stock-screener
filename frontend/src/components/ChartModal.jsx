import { AdvancedChart } from "react-tradingview-embed";
/**
 * 
 * 
 */

const ChartModal = ({ setShowChartModal, symbol }) => {

    symbol = decodeURIComponent(symbol);
    if(symbol.includes('&')) {
        symbol = symbol.replace('&','_');
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                            <div className="flex items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t">
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowChartModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div> 
                        {/*body*/}
                        <div className="relative p-5 flex-auto">
                            <AdvancedChart widgetProps={{
                                "width": "calc(90vw)",
                                "height": "700px",
                                "theme": "light",
                                "symbol": `BSE:${symbol}`,
                                "timezone": "Asia/Kolkata",
                                "style": "1",
                                "range": "YTD",
                                "interval": "D",
                                "locale": "in",
                                "allow_symbol_change": false
                            }}/>
                        </div>
                        {/*footer*/}
                        {/* <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="bg-white focus:bg-gray-100 text-gray-500 focus:ring-4 focus:ring-gray-300 background-transparent rounded-lg border border-gray-200 uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowChartModal(false)}
                            >
                                Close
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>

    )
}

export default ChartModal;