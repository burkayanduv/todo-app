import clsx from  'clsx'
import Grid from '@material-ui/core/Grid'
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from '@material-ui/icons/Delete'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import taskStyle from '../styles/componentStyles/taskStyle'
import { useSpring, animated } from "react-spring"
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'


// Styles
const useStyles = makeStyles(taskStyle)

const Task = ({ task, onDelete, onToggle, index}) => {

    const [isMounted, setIsMounted] = useState(true);

    const mountProps = useSpring({
        config : { mass: 5, tension: 2000, friction: 500 },
        opacity: isMounted ? 1 : 0,
        x: isMounted ? 0 : 30,
        from: { opacity: 0, x: 30 }
    });

    const classes = useStyles()

    return (
        <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <animated.div style={mountProps}>
                        <Card className={clsx(classes.styledTask, task.reminder ? classes.taskReminder : '')} onDoubleClick={() => onToggle(task._id)}>
                            <Grid container>
                                <Grid item xs={11}>
                                    <Typography className={classes.cardTitle} variant="subtitle1">{task.text}</Typography>
                                    <Typography variant="subtitle2">{new Date(task.date).toLocaleString("en-us", { weekday: "long", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Typography>
                                </Grid>
                                <Grid item xs={1} >
                                    <Grid container justify="flex-end">
                                        <IconButton className={classes.iconButton} onClick={() => {
                                            setIsMounted(false)
                                            onDelete(task._id)
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </animated.div>
                </div>
            )}
        </Draggable>
    )
}

export default Task
