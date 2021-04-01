import './Header.css'

function Header(){
    return (
        <div>
            <div className='headerContainer'>
                <h1 className='logo'>Logo</h1>
                <h1 className='websiteName'>Website Name</h1>
                
            </div>
            <hr className='bottomSeperator'></hr>
        </div>
    )
}

export default Header;