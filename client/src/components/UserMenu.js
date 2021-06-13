import { useContext, useState } from "react"
import { useLocation } from "react-router"
import { useHistory } from "react-router-dom"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import { Context } from "../context/Context"
import { LOGOUT } from '../constants/actionTypes'


export default function UserMenu() {
    
    const { dispatch } = useContext(Context)
    
    const location = useLocation()

    const history = useHistory()
    
    // Menu
    const [anchorEl, setAnchorEl] = useState(null)
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleReturnIndex = () => {
        setAnchorEl(null)
        history.push('/')
    }

    const handleUpdate = () => {
        setAnchorEl(null)
        history.push('/update')
    }

    const handleDelete = () => {
        setAnchorEl(null)
        history.push('/delete')
    }
    
    const handleLogout = () => {
        setAnchorEl(null)
        dispatch({ type: LOGOUT })
    }

    return (
        <>  
            <IconButton color="primary" aria-controls="simple-menu" onClick={handleClick}><PersonOutlineIcon/></IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                        {location.pathname !== '/' && <MenuItem onClick={handleReturnIndex}>Index</MenuItem>}
                        {location.pathname !== '/update' && <MenuItem onClick={handleUpdate}>Update Account</MenuItem>}
                        {location.pathname !== '/delete' && <MenuItem onClick={handleDelete}>Delete Account</MenuItem>}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
        </>
    )
}
