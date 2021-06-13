import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Button from './Button'
import { makeStyles } from '@material-ui/core/styles';
import headerStyle from '../styles/componentStyles/headerStyle'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useContext } from 'react';
import { Context } from '../context/Context';
import UserMenu from './UserMenu';


// Styles
const useStyles = makeStyles(headerStyle)

const Header = ({ title, onAdd, showAdd }) => {

    const location = useLocation()
    const classes = useStyles()

    const { user } = useContext(Context)

    return (
        <>
            <Grid container alignItems="center" className={classes.styledGrid}>
                <Grid item xs={3}>{user && <UserMenu/>}
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" className={classes.styledTypography}>{title}</Typography>
                </Grid>
                <Grid item align="right" xs={3}>
                    {location.pathname === '/' && <Button color={showAdd ? 'secondary' : 'primary'} icon={showAdd ? <ExpandLessIcon /> : <AddIcon />} onClick={onAdd}/>}
                </Grid>
            </Grid>
        </>
    )
}

Header.defaultProps = {
    title: 'Todo App'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header

