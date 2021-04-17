import React, {useState} from 'react'
import './Sidebar.css';
import SidebarItem from './SidebarItem';

function Sidebar () {

    var [isCollapsed, setCollapsed] = useState(true);

    return(
        <>
            <div className={isCollapsed ? "SidebarContainer isCollapsed" : "SidebarContainer"}>
                <ul className="MenuContainer">
                    <SidebarItem to="/main" text="Canvases" setSidebarCollapsed={setCollapsed}/>
                    <SidebarItem text="E-Shop" setSidebarCollapsed={setCollapsed}/>
                    <SidebarItem text="Settings" setSidebarCollapsed={setCollapsed}/>
                </ul>
            </div>
            <div className={isCollapsed ? "ButtonContainer buttonIsCollapsed" : "ButtonContainer"}>
                <button className="MenuToggleButton" onClick={(e) => setCollapsed(!isCollapsed)}>☰</button>
            </div>
        </>
    );

}

export default Sidebar;