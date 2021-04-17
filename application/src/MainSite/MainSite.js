import React, { useState } from 'react'
import ContentArea from './ContentArea/ContentArea';
import Header from './Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import '../MainSite/MainSite.css'

function MainSite(){

    var [selectedCanvas, setSelectedCanvas] = useState('');

    return(
        <div className="mainArea">
            <div className="headerTableItemWrapper">
                <Header/>
            </div>
            <div className="contentAreaTableItemWrapper">
                <Sidebar/>
                <ContentArea selectedCanvas={selectedCanvas} setSelectedCanvas={setSelectedCanvas}/>
            </div>

        </div>
    );
}

export default MainSite;