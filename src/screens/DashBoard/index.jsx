import React, { useEffect } from 'react'
import { getUserInfo } from '../../api';
import Dashboard from '../../layout/Dashboard'

function DashBoard() {
    useEffect(() => {
        getUserInfo()
            .then(response => {
                console.log(response.data);
            })
    });

    return (
        <Dashboard />
    )
}

export default DashBoard;
