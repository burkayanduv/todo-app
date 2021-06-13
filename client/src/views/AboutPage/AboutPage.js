import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import aboutStyle from '../../styles/pageStyles/aboutStyle';


// Styles
const useStyles = makeStyles(aboutStyle)

export default function AboutPage () {
    
    const classes = useStyles()

    return (
        <Container maxWidth="xs" className={classes.container}>
            <Header/>
            <div className={classes.textsWrapper}>
                <Typography variant="body2" gutterBottom>Version: 1.0.0</Typography>
                <br/>
                <br/>
                <Typography variant="body2" gutterBottom>Contact:</Typography>
                <Typography variant="body2" gutterBottom>burkay_anduv@outlook.com</Typography>
                <br/>
                <br/>
                <Link to='/' className={classes.styledLink} variant="h2">
                    <Typography variant="body2">Go Back</Typography>
                </Link>
            </div>
            <Footer />
        </Container>
    )
}
