import React, { useState } from 'react'
import ContentArea from './ContentArea/ContentArea';
import Header from './Header/Header'
import '../MainSite/MainSite.css'

function MainSite(){

    var [selectedCanvas, setSelectedCanvas] = useState('');

    if(selectedCanvas !== ''){
        console.log("selectedCanvas !== ''. it equals: " + selectedCanvas);
    }
    return(
        <div className="mainArea">
            <Header/>

            <ContentArea selectedCanvas={selectedCanvas} setSelectedCanvas={setSelectedCanvas}/>

        </div>
    );
}

export default MainSite;