import Task from "./Task";
import { useState } from "react";

let data = [
	{ name: "Faire les courses", completed: false },
	{ name: "Appeler le médecin", completed: true },
	{ name: "Faire du sport", completed: false },
];

function TaskList() {

    const [tasks, setTasks] = useState(data)

	/*Change status of a task from completed to not completed*/ 
    const toggle = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

	/*Add a new task to the tasks list*/ 
    const newTask = (taskName) => {
		//STOCK ARRAY DE DISPLAY
		const t =  { name: taskName, completed: false }
        setTasks([...tasks, t]);

		//STOCK ARRAY DATA AND ADD NEW TASK
		data.push(t)
    };

	/*Delete a task*/ 
    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);

		//STOCK ARRAY DATA WITHOUT DELETED TASK
		data.splice(index, 1)
    };

	/* Second way to delete a task using splice methode
setTasks(filtertask => { return filtertask.filter(task => task.index !== index)} )
const newTasks = [...tasks];
newTasks.splice(index, 1);
setTasks(newTasks);
}
*/

/*Display task status*/
const displayTasksStatus = (booleen) => {
	const tasksStatus = data.filter((task) => task.completed === booleen);
	setTasks(tasksStatus);
};

/*Count active tasks*/ 

function countActiveTasks()  {
	const length = data.filter((task) => !task.completed).length
	return length ? length : 0;
}


/*Display all tasks*/
const displayAllTasks = () => {
	setTasks(data); 
}

/*Clear completedTasks to keep only not completed tasks*/
    const clearCompletedTasks = () => {
        const remainingTasks = tasks.filter((task) => !task.completed);
        setTasks(remainingTasks);
		data = [...remainingTasks]; 
    };



    return (
		<>
		<h1> Quels sont tes plans pour aujourd'hui ? </h1>
        <div className="content">
			<div>
			<form
                onSubmit={(e) => {
                    e.preventDefault();
                    const taskName = e.target.elements.taskName.value;
                    newTask(taskName);
                    e.target.elements.taskName.value = "";
                }}
            >
                <input type="text" name="taskName" placeholder="Ajouter une nouvelle To Do" />
                <button type="submit" className="addButton">Ajouter</button>
            </form>
            {tasks.map((task, index) => (
                <div key={index} className="tasks">
                    <Task
                        taskName={task.name}
                        isCompleted={task.completed}
                        onChange={() => toggle(index)}
                        deleteTask={() => deleteTask(index)}
                    />
                </div>
            ))}

            <div className="bottom">
                <div className="left">
                    <p> {countActiveTasks()} tâches à réaliser </p>
                </div>
                <div className="center">
                    <button onClick={()=> displayTasksStatus(false)}> A faire </button>
                    <button onClick={()=> displayTasksStatus(true)}> Fait </button>
                    <button onClick={displayAllTasks}> Toutes mes tâches </button>
                </div>
                <div className="right">
                    <button onClick={clearCompletedTasks}> Supprimer </button>
                </div>
            </div>
        </div>
		</div>
		</>
    );
}

export default TaskList;