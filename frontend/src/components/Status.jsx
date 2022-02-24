import styles from './Status.module.css';
import { useState, useEffect } from 'react';

const Status = () => {

    const [response, setResponse] = useState("");
    
    const baseUrl = '/api/v2/nse/status'

    useEffect(() => {
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
            })
    }, []);

    if(response === 'Open') {
        return (
            <div className={styles.statusOpen}>
                Market Status: {response}
            </div>
        )
    }
    else {
        return (
            <div className={styles.statusClosed}>
                Market Status: {response}
            </div>
        )
    }

}

export default Status;