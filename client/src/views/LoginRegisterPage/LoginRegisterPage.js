import { useContext, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button, Container, FormControl, Grid, Input, InputLabel, makeStyles, Typography } from '@material-ui/core'
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, UPDATE_START, UPDATE_SUCCESS, UPDATE_FAILURE, LOGOUT } from '../../constants/actionTypes'
import { Context } from '../../context/Context'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import loginRegisterStyle from '../../styles/pageStyles/loginRegisterStyle'
import LoadingBar from '../../components/LoadingBar'
import { apiURL } from '../../constants/apiURL'


// Styles
const useStyles = makeStyles(loginRegisterStyle)

export default function LoginPage() {

    const classes = useStyles()

    const location = useLocation()

    const history = useHistory()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { user, dispatch } = useContext(Context)

    const checkEnterPress = (key) => {
        if(key === 'Enter') {
            if(location.pathname === '/login') {
                handleLogin()
            } else if(location.pathname === '/register') {
                handleRegister()
            } else if(location.pathname === '/update') {
                handleUpdate()
            } else if(location.pathname === '/delete') {
                handleDelete()
            }
        } 
    }

    function validateEmail(validatedEmail) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(validatedEmail).toLowerCase())
    }

    const handleLogin = async (e) => {
        setIsLoading(true)
        dispatch({type: LOGIN_START})
        try {
            const res = await axios.post(apiURL + "/auth/login", {
                username,
                password
            })
            setIsLoading(false)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        } catch (err) {
            setIsLoading(false)
            setError(true)
            setResponse("Login error, please try again...")
            dispatch({ type: LOGIN_FAILURE })
        }
    }

    const handleRegister = async (e) => {
        if(!validateEmail(email)) {
            setError(true)
            setResponse("Please enter a valid email...")
        } else {
            setIsLoading(true)
            try {
                const res = await axios.post(apiURL + "/auth/register", {
                    username,
                    email,
                    password
                })
                res.data && history.push("/login")
            } catch (err) {
                setIsLoading(false)
                setError(true)
                setResponse("Oops, something went wrong...")
            }
        }
    }

    const handleUpdate = async (e) => {
        if(!validateEmail(email)) {
            setError(true)
            setResponse("Please enter a valid email...")
        } else {
            setIsLoading(true)
            dispatch({type: UPDATE_START})
            const updatedUser = {
                userId: user._id,
                username,
                email,
                password
            }
            try {
                const res = await axios.put(apiURL + "/user/" + user._id, updatedUser)
                setIsLoading(false)
                setError(false)
                setResponse("User credientials updated...")
                dispatch({type: UPDATE_SUCCESS, payload: res.data})
            } catch (err) {
                setIsLoading(false)
                setError(true)
                setResponse("Failed to update the user...")
                dispatch({type: UPDATE_FAILURE})
            }
        }
    }

    const handleDelete = async (e) => {
        setIsLoading(true)
        try {
            const res = await axios.post(apiURL + "/auth/login", {
                username,
                password
            })
            const deletedUser = {userId : res.data._id}
            await axios.delete(apiURL + "/user/" + user._id, {data: deletedUser})
            dispatch({ type: LOGOUT })
            history.push("/login")
        } catch (err) {
            setIsLoading(false)
            setError(true)
            setResponse("Failed to delete the user...")
        }
    }

    return (
        <Container maxWidth="xs" className={classes.container}>
            <Header/>
            { isLoading ? <LoadingBar/> : 
                <div className={classes.styledForm}>
                    <Typography variant="h6" className={classes.styledTitle}>{location.pathname === '/register' ? 
                        'Sign Up' 
                        : location.pathname === '/update' ? 
                        'Update Credientials' 
                        : location.pathname === '/delete' ? 
                        'Delete Account' 
                        : 'Login'
                    }</Typography>
                    <FormControl fullWidth={true} margin="dense">
                        <InputLabel className={classes.inputLabel}>Username</InputLabel>
                        <Input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className={classes.styledInput}/>
                    </FormControl>
                    {(location.pathname === '/register' || location.pathname === '/update') && 
                        <FormControl fullWidth={true} margin="dense">
                            <InputLabel className={classes.inputLabel}>Email</InputLabel>
                            <Input placeholder="Enter your password" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={classes.styledInput}/>
                        </FormControl>
                    }
                    <FormControl fullWidth={true} margin="dense">
                        <InputLabel className={classes.inputLabel}>Password</InputLabel>
                        <Input placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => checkEnterPress(e.key)} className={classes.styledInput}/>
                    </FormControl>
                    <Grid container justify="center" className={ response === '' ? classes.buttonWrapper : classes.buttonWrapperResponse}>
                        <Grid container justify="center">
                            {location.pathname === '/register' ? 
                                <Button onClick={handleRegister} color="primary" variant="outlined">Sign Up</Button>
                                : location.pathname === '/update' ? 
                                <Button onClick={handleUpdate} color="primary" variant="outlined">Update</Button>
                                : location.pathname === '/delete' ? 
                                <Button onClick={handleDelete} color="secondary" variant="outlined">Delete</Button>
                                :
                                <Button onClick={handleLogin} color="primary" variant="outlined">Login</Button>
                            }
                        </Grid>
                        <Grid container justify="center" className={ error ? classes.responseWarning : classes.responseSuccess }>
                            <Typography variant="body2">{response}</Typography>
                        </Grid>
                    </Grid>
                    {location.pathname === '/register' ? 
                        <Typography variant="subtitle2" className={classes.styledTitle}> Already have an account? &nbsp;
                            <Link to='/login' className={classes.styledLink} variant="subtitle2">
                                Login
                            </Link>
                        </Typography>
                        : location.pathname === '/update' || location.pathname === '/delete' ?
                        <Typography variant="subtitle2" className={classes.styledTitle}> Just having a look? &nbsp;
                                <Link to='/login' className={classes.styledLink} variant="subtitle2">
                                    Go Back
                                </Link>
                            </Typography>
                        :
                        <Typography variant="subtitle2" className={classes.styledTitle}> Don't have an account? &nbsp;
                            <Link to='/register' className={classes.styledLink} variant="subtitle2">
                                Register
                            </Link>
                        </Typography>
                    }
                </div>
            }
            <Footer />
        </Container>
    )
}
