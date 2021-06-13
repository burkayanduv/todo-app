import { CircularProgress, makeStyles } from "@material-ui/core";
import loadingBarStyle from "../styles/componentStyles/loadingBarStyle";


// Styles
const useStyles = makeStyles(loadingBarStyle)

function LoadingBar() {

    const classes = useStyles()

    return (
        <div className={classes.loadingBarWrapper}>
            <CircularProgress/>
        </div>
    )
}

export default LoadingBar

