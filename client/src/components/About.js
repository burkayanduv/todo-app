import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'


const About = () => {
    return (
        <>
            <Grid container justify="center">
                <Typography variant="body2" gutterBottom>Version 1.0.0</Typography>
            </Grid>
            <Grid container justify="center">
                <Link to='/' className="styledLink">
                    <Typography variant="body2">Go Back</Typography>
                </Link>
            </Grid>
        </>
    )
}

export default About
