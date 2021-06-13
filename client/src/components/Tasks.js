import { DragDropContext, Droppable }from 'react-beautiful-dnd'
import Task from './Task'


const Tasks = ({ tasks, onDelete, onToggle, onReorder }) => {

    const tasksList= tasks.sort((a, b) => a.index - b.index)

    const handleOnDragEnd = result => {
        if(!result.destination) return
        const indexes = []
        tasksList.forEach((task) => indexes.push(task._id))
        const reorderedItem = indexes.splice(result.source.index, 1)
        indexes.splice(result.destination.index, 0, reorderedItem[0])
        for (const id of indexes){
            tasksList.forEach(task => {
                if(task._id === id) {
                    task.index = indexes.indexOf(id)
                }
            })
        }
        onReorder(tasksList.sort((a, b) => a.index - b.index))
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => ( 
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {tasksList.map((task, index) => (<Task key={task._id} task={task} onDelete={onDelete} onToggle={onToggle} index={index}/>))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Tasks
