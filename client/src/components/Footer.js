import { Link, useLocation } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import footerStyle from '../styles/componentStyles/footerStyle'


// Styles
const useStyles = makeStyles(footerStyle)

const Footer = () => {

    const classes = useStyles()
    const location = useLocation()

    return (
        <div className={classes.styledFooter}>
            <Grid container justify="center">
                <Typography variant="body2">Created by Burkay Anduv &copy; 2021</Typography>
            </Grid>
            {location.pathname === '/about' ? '' :  
                <Grid container justify="center">
                    <Link className={classes.styledLink} to="/about"><Typography variant="body2">About</Typography></Link>
                </Grid>
            }
        </div>
    )
}

export default Footer
