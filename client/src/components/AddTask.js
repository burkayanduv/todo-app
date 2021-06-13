import { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import Grid from '@material-ui/core/Grid'
import formStyle from '../styles/componentStyles/formStyle'
import { makeStyles } from '@material-ui/core/styles';

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import { useSpring, animated } from "react-spring"


// Styles
const useStyles = makeStyles(formStyle)

const AddTask = ({ onAdd, isMounted }) => {

    const classes = useStyles()

    const [text, setText] = useState('')
    const [date, setDate] = useState(new Date());
    const [reminder, setReminder] = useState(false)

    const onSubmit = async (e) => {
        if(!text) {
            alert('Please add a task')
            return
        }

        onAdd({ text, date, reminder })

        setText('')
        setDate(new Date())
        setReminder(false)
    }

    const mountProps = useSpring({
        config : { mass: 50, tension: 1500, friction: 1000 },
        opacity: isMounted ? 1 : 0,
        y: isMounted ? 0 : -350,
        from: { opacity: 0, y: -350 }
    });

    return (
        <animated.div className={classes.styledForm} style={mountProps}> 
            <FormControl fullWidth={true} margin="dense">
                <InputLabel className={classes.inputLabel}>Add a Task</InputLabel>
                <Input placeholder="Add a Task" value={text} onChange={(e) => setText(e.target.value)} className={classes.styledInput}/>
            </FormControl>
            <FormControl fullWidth={true}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-between">
                    <Grid item xs={5}>
                        <KeyboardDatePicker
                            fullWidth
                            className={classes.inputLabel}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker"
                            label="Date"
                            value={date}
                            onChange={(date) => setDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <KeyboardTimePicker
                            fullWidth
                            margin="normal"
                            id="time-picker"
                            label="Time"
                            value={date}
                            onChange={(date) => setDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </Grid>
                </MuiPickersUtilsProvider>
            </FormControl>
            <FormControl fullWidth={true}>
                <FormControlLabel
                    value={reminder}
                    control={<Checkbox style={{color: "#26c6da"}} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>}
                    label="Set Reminder"
                    labelPlacement="start"
                    className={classes.formControlLabel}
                />
            </FormControl>
            <Grid container justify="center">
                <Button onClick={onSubmit} color="primary" variant="outlined" startIcon={<SaveIcon />}>Add Todo</Button>
            </Grid>
        </animated.div>
    )
}

export default AddTask
