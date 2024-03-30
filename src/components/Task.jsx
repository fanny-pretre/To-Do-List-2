function Task({ taskName, isCompleted, onChange, deleteTask }) {
  return (
    <div>
        <div className="toDo">
          <div> {isCompleted ? <p className="completed">{taskName}</p> : <p >{taskName}</p>}</div>
          <div className="buttonTaskItem">
            <input type="checkbox" checked={isCompleted} onChange={onChange} />
           <img onClick={deleteTask} src="src/assets/poubelle.png" alt="poubelle" />  
          </div>
        </div>
    </div>
  );
}

export default Task;