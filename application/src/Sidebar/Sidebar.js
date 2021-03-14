import React, {useState} from 'react'
import './Sidebar.css';
import ConversationItem from './ConversationItem.js'

function Sidebar () {

    var [isCollapsed, setCollapsed] = useState(false);

    var sidebarToggleClick = (event) => {
        setCollapsed(!isCollapsed);

        if(isCollapsed){
            document.getElementById("SidebarContainer").style.left = "-250px";
        }
        else{
            document.getElementById("SidebarContainer").style.left = "0px";
        }
    }


    var conversationClick = () => {

    }

    return(
        <div id="SidebarContainer" className="SidebarContainer">
            <div className="MenuContainer">
                <ul>
                    <li >Conversations</li>
                    <ul>
                        <ConversationItem conversationClick={conversationClick} text="Person 1"/>
                        <ConversationItem conversationClick={conversationClick} text="Person 2"/>
                        <ConversationItem conversationClick={conversationClick} text="Person 3"/>
                    </ul>
                    <li>E-Shop</li>
                    <li>Settings</li>
                </ul>
                
            </div>
            <div className="ButtonContainer">
                <button className="MenuToggleButton" onClick={sidebarToggleClick}>☰</button>
            </div>
        </div>
    );

}

export default Sidebar;