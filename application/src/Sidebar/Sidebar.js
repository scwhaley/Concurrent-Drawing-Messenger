import React, { Component } from 'react'
import './Sidebar.css';

class Sidebar extends Component{
    constructor(){
        super();
    }

    sidebarToggleClick = () => {
        this.props.sidebarToggleClick();
    };

    render(){
        return(
            <div id="SidebarContainer" className="SidebarContainer">
                <div className="MenuContainer">
                    <ul>
                        <li >Conversations</li>
                        <ul>
                            <li>Person 1</li>
                            <li>Person 2</li>
                            <li>Person 3</li>
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
}

export default Sidebar