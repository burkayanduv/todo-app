import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header'
import AddTask from '../../components/AddTask'
import Tasks from '../../components/Tasks'
import Footer from '../../components/Footer';
import { Context } from '../../context/Context';
import indexStyle from '../../styles/pageStyles/indexStyle';
import LoadingBar from '../../components/LoadingBar';
import { apiURL } from '../../constants/apiURL';


// Styles
const useStyles = makeStyles(indexStyle)

export default function IndexPage() {
    
    const classes = useStyles()

    const [showAddTask, setShowAddTask] = useState(false)
    const [mountAddTask, setMountAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { user } = useContext(Context)

    useEffect(() => {
        const loadTasks = async () => {
            const queriedTasks = await getTasks()
            setTasks(queriedTasks)
        }
        loadTasks()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    // Get Tasks
    const getTasks = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(apiURL + `/task/?user=${user.username}`)
            setIsLoading(false)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    // Add Task
    const addTask = async (task) => {
        try {
            const res = await axios.post(apiURL + "/task/", {
                ...task,
                username: user.username,
                index: tasks.length
            })
            setTasks([ ...tasks, res.data ])
        } catch (err) {
            console.log(err)
        }
    }

    // Delete Task
    const deleteTask = async (id) => {
        try {
            await axios.delete(apiURL + `/task/${id}`, {data: {
                username: user.username
            }})
            setTasks(tasks.filter((task) => task._id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = tasks.find(task => task._id === id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}
        try {
            await axios.put(apiURL + `/task/${updTask._id}`, updTask)
            setTasks(tasks.map((task) => task._id === id ? { ...task, reminder: updTask.reminder} : task))
        } catch (err) {
            console.log(err)
        }
    }

    // Reorder Tasks
    const reorderTasks = async (updatedTasks) => {
        const updatedIndex = {}
        updatedTasks.forEach(({ _id, index }) => updatedIndex[_id] = index)
        try {
            await axios.put(apiURL + `/reorder/${user.username}`, updatedIndex)
            setTasks(updatedTasks)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container maxWidth="xs" className={classes.container}>
            <Header onAdd={() => {
                setMountAddTask(!mountAddTask)
                if(mountAddTask) {
                    setTimeout(() => setShowAddTask(!showAddTask), 1000)
                } else {
                    setShowAddTask(!showAddTask)
                }
                }} showAdd={showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask} isMounted={mountAddTask}/>}
            <div className={classes.tasksWarpper}>
                {isLoading ? <LoadingBar/> : tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onReorder={reorderTasks}/> : !showAddTask && 'Press "+" to add new todo...'}
            </div>
            <Footer />
        </Container>
    )
}
