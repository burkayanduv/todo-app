import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { GlobalStyle } from './styles/globalStyle';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import globalTheme from './styles/globalTheme'
import IndexPage from './views/IndexPage/IndexPage';
import AboutPage from './views/AboutPage/AboutPage';
import LoginRegisterPage from './views/LoginRegisterPage/LoginRegisterPage';
import { useContext } from "react";
import { Context } from "./context/Context";
import { animated, useTransition } from "@react-spring/web";

// Theme
const theme = createMuiTheme(globalTheme)

function App() {
    const { user } = useContext(Context)

    const location = useLocation()
    const transitions = useTransition(location, { 
        config: { duration: 1000 },
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
    })

    return transitions((props, item) => (
        <animated.div style={props}>
            <GlobalStyle></GlobalStyle>
            <MuiThemeProvider theme={theme}>
                        <Switch location={item}>
                            <Route exact path='/'>
                                { user ? <IndexPage/> : <Redirect to='/login'/> }
                            </Route>
                            <Route path='/login'>
                                { !user ? <LoginRegisterPage/> : <Redirect to='/'/> }
                            </Route>
                            <Route path='/register'>
                                { !user ? <LoginRegisterPage/> : <Redirect to='/'/> }
                            </Route>
                            <Route path='/update'>
                                { user ? <LoginRegisterPage/> : <Redirect to='/login'/> }
                            </Route>
                            <Route path='/delete'>
                                { user ? <LoginRegisterPage/> : <Redirect to='/login'/> }
                            </Route>
                            <Route path='/about'>
                                <AboutPage/>
                            </Route>
                        </Switch>
            </MuiThemeProvider>
        </animated.div>
    ))
}

export default App
