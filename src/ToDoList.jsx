import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCheck,
  faPen,
  faMagnifyingGlass,
  faFloppyDisk,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completeTasks, setCompleteTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedSearchTerm, setCompletedSearchTerm] = useState("");
  const [taskId, setTaskId] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCompletedSearchChange = (e) => {
    setCompletedSearchTerm(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { id: taskId, text: newTask, completed: false }]);
      setNewTask("");
      setTaskId(taskId + 1);
    }
  };

  const deleteTask = (id) => {
    const updateTasks = tasks.filter((task) => task.id !== id);
    setTasks(updateTasks);
  };

  const deleteCompletedTask = (id) => {
    const updateCompleteTasks = completeTasks.filter((task) => task.id !== id);
    setCompleteTasks(updateCompleteTasks);
  };

  const completeTaskHandler = (id) => {
    const taskToComplete = tasks.find((task) => task.id === id);
    setCompleteTasks([...completeTasks, taskToComplete]);
    const updateTasks = tasks.filter((task) => task.id !== id);
    setTasks(updateTasks);
  };

  const returnTaskHandler = (id) => {
    const taskToReturn = completeTasks.find((task) => task.id === id);
    setTasks([...tasks, taskToReturn]);
    const updateCompleteTasks = completeTasks.filter((task) => task.id !== id);
    setCompleteTasks(updateCompleteTasks);
  };

  const startEditingTask = (id, text) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  const handleEditInputChange = (e) => {
    setEditingTaskText(e.target.value);
  };

  const saveEditedTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editingTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompletedTasks = completeTasks.filter((task) =>
    task.text.toLowerCase().includes(completedSearchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center h-full py-12 w-96 m-auto items-center gap-14">
      <div className="flex flex-col w-[40rem] gap-10 bg-base-300 p-10 rounded-xl ">
        <div className="flex flex-row items-center justify-between gap-10">
          <h1 className="text-lg">Tasks to do</h1>
          <label className="input input-bordered flex items-center gap-2 w-[70%]">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
        </div>

        <ul className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <li
              className="flex flex-row items-center justify-between gap-10 bg-secondary p-2 rounded-lg text-secondary-content"
              key={task.id}
            >
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    className="input input-ghost w-full text-primary-content"
                    value={editingTaskText}
                    onChange={handleEditInputChange}
                    onBlur={() => saveEditedTask(task.id)}
                    autoFocus
                  />
                  <button
                    className="p-2 bg-primary rounded-lg flex items-center"
                    onClick={() => saveEditedTask(task.id)}
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
                </>
              ) : (
                <span className="text">{task.text}</span>
              )}
              <div className="flex flex-row gap-5 items-center justify-between">
                {!editingTaskId && (
                  <>
                    <button
                      className="p-2 flex items-center bg-warning rounded-lg"
                      onClick={() => startEditingTask(task.id, task.text)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      className="p-2 flex items-center bg-success rounded-lg"
                      onClick={() => completeTaskHandler(task.id)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      className="p-2 flex items-center bg-error rounded-lg"
                      onClick={() => deleteTask(task.id)}
                    >
                      <FontAwesomeIcon size="sm" icon={faTrashCan} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-row gap-5 items-center">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="New Task"
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>

      <div className="flex flex-col w-[40rem] gap-10 bg-base-300 p-10 rounded-xl ">
        <div className="flex flex-row items-center justify-between gap-10">
          <h1 className="text-lg">Completed Tasks</h1>
          <label className="input input-bordered flex items-center gap-2 w-[70%]">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={completedSearchTerm}
              onChange={handleCompletedSearchChange}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
        </div>

        <ul className="flex flex-col gap-4">
          {filteredCompletedTasks.map((task) => (
            <li
              className="flex flex-row items-center justify-between gap-10 bg-secondary p-2 rounded-lg text-secondary-content"
              key={task.id}
            >
              <span className="text">{task.text}</span>
              <div className="flex flex-row gap-5 items-center justify-between">
                <button
                  className="p-2 bg-info rounded-lg flex items-center"
                  onClick={() => returnTaskHandler(task.id)}
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                </button>
                <button
                  className="p-2 bg-error rounded-lg flex items-center"
                  onClick={() => deleteCompletedTask(task.id)}
                >
                  <FontAwesomeIcon size="sm" icon={faTrashCan} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
