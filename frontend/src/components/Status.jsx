import styles from './Status.module.css';
import { css } from "@emotion/react";
import { useState, useEffect } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";

const Status = () => {

    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const baseUrl = '/api/v2/nse/status'

    const override = css`
    display: block;
    margin: 0.5rem 0 0 0.25rem;
    `;

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        fetch(`${baseUrl}`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setResponse(data.marketState[0].marketStatus)
                setIsLoading(false);
            })
    }, []);

    // if(response === 'Open') {
    //     return (
    //         <div className={styles.statusOpen}>
    //             Market Status: {response}
    //         </div>
    //     )
    // }
    // else {
    //     return (
    //         <div className={styles.statusClosed}>
    //             Market Status: {response}
    //         </div>
    //     )
    // }

    return (
        <>
            {isLoading ?
                <div>
                    <div className={styles.statusLoading}>
                        Market Status: <ScaleLoader color={'#6366f1'} css={override} loading={true} height={20} width={3} radius={10} />
                    </div>
                </div> :
                <div>
                    {
                        response === 'Open' ?
                            <div className={styles.statusOpen}>
                                Market Status: {response}
                            </div>
                            : <div className={styles.statusClosed}>
                                Market Status: {response}
                            </div>
                    }
                </div>}
        </>
    )

}

export default Status;