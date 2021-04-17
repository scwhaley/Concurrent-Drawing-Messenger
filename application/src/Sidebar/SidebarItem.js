import { Link } from "react-router-dom";

function SidebarItem(props){

    return(
        <li>
            <Link push to={props.to} onClick={() => props.setSidebarCollapsed(true)}>
                <span>Image </span><span>{props.text}</span>
            </Link>
        </li>
    )
}

export default SidebarItem;