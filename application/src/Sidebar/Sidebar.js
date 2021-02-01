import React, { Component } from 'react'
import './Sidebar.css';
import ConversationItem from './ConversationItem.js'

class Sidebar extends Component{
    constructor(){
        super();
        this.state = {selectedCoversation: <li>Init</li>};
    }

    sidebarToggleClick = (e) => {
        this.props.sidebarToggleClick();
    };

    conversationClick = (e) => {
        this.setState({selectedCoversation: e.target});
        console.log(this.state.selectedCoversation);
    }

    render(){
        return(
            <div id="SidebarContainer" className="SidebarContainer">
                <div className="MenuContainer">
                    <ul>
                        <li >Conversations</li>
                        <ul>
                            <ConversationItem conversationClick={this.conversationClick} text="Person 1"></ConversationItem>
                            <ConversationItem conversationClick={this.conversationClick} text="Person 2"/>
                            <ConversationItem conversationClick={this.conversationClick} text="Person 3"/>
                        </ul>
                        <li>E-Shop</li>
                        <li>Settings</li>
                    </ul>
                    
                </div>
                <div className="ButtonContainer">
                    <button className="MenuToggleButton" onClick={this.sidebarToggleClick}>☰</button>
                </div>
            </div>
        );
    };

    createConversationItems(){
        for(let i=0;i<3;i++){
            
        };
    }
}

export default Sidebar