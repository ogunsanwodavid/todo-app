/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

import Circle from "./Circle";

import iconCross from "../assets/icon-cross.svg";

function ActiveTasks({
  allTasks,
  setAllTasks,
  activeTasks,
  completedTasks,
  setActiveTasks,
  setCompletedTasks,
}) {
  {
    /*** Automatically computing the activeTasks and completedTasks JSONs as the allTasks is changing in the ap */
  }
  useEffect(() => {
    setActiveTasks(
      allTasks
        .filter((task) => {
          return task.status === "active";
        })
        .reverse()
    );

    setCompletedTasks(
      allTasks
        .filter((task) => {
          return task.status === "completed";
        })
        .reverse()
    );
  }, [allTasks, setActiveTasks, setCompletedTasks]);

  {
    /*** Handles the deletion of a task */
  }
  function handleDeleteTask(taskId) {
    setAllTasks(
      allTasks.filter((task) => {
        return task.id !== taskId;
      })
    );
  }

  {
    /*** Handles the completion of an active task */
  }
  function handleCompleteTask(taskId) {
    let newAllTasks = allTasks.filter((task) => {
      return task.id !== taskId;
    });
    const currentTask = allTasks.find((task) => task.id === taskId);

    currentTask.status = "completed";

    setAllTasks([...newAllTasks, currentTask]);
  }

  const dragActiveTask = useRef(0); // Removed the number type annotation
  const draggedOverActiveTask = useRef(0); // Removed the number type annotation

  function handleActiveTasksDragSort() {
    const activeTasksClone = [...activeTasks];
    const temp = activeTasksClone[dragActiveTask.current];
    activeTasksClone[dragActiveTask.current] =
      activeTasksClone[draggedOverActiveTask.current];
    activeTasksClone[draggedOverActiveTask.current] = temp;
    //setCompletedTasks(completedTasksClone);

    setAllTasks([...completedTasks, ...activeTasksClone]);
  }

  return (
    <section>
      {activeTasks.map((task, index) => {
        return (
          <div
            className="w-full p-3 flex items-center justify-between text-lightMode-veryDarkGrayishBlue text-lg border-lightMode-lightGrayishBlue dark:text-darkMode-darkGrayishBlue dark:border-darkMode-veryDarkGrayishBlue2 dark:hover:text-darkMode-lightGrayishBlueHover md:p-4 md:text-xl"
            style={{
              borderBottomWidth:
                index + completedTasks.length !== allTasks.length - 1
                  ? "1px"
                  : "",
            }}
            key={index}
            draggable
            onDragStart={() => (dragActiveTask.current = index)}
            onDragEnter={() => (draggedOverActiveTask.current = index)}
            onDragEnd={handleActiveTasksDragSort}
            onDragOver={(e) => e.preventDefault()}
          >
            {/**Circle */}
            <Circle onClick={() => handleCompleteTask(task.id)} />

            {/*** Task */}
            <div className="w-full px-3 text-wrap">
              <p>{task.content}</p>
            </div>

            {/***  Cross icon*/}
            <img
              src={iconCross}
              onClick={() => handleDeleteTask(task.id)}
              className="h-4"
            />
          </div>
        );
      })}
    </section>
  );
}

export default ActiveTasks;
