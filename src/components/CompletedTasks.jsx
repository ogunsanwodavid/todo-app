/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

import CheckedCircle from "./CheckedCircle";

import iconCross from "../assets/icon-cross.svg";

function CompletedTasks({
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
  function handleMakeTaskActive(taskId) {
    let newAllTasks = allTasks.filter((task) => {
      return task.id !== taskId;
    });
    const currentTask = allTasks.find((task) => task.id === taskId);

    currentTask.status = "active";

    setAllTasks([...newAllTasks, currentTask]);
  }

  const dragCompletedTask = useRef(0); // Removed the number type annotation
  const draggedOverCompletedTask = useRef(0); // Removed the number type annotation

  function handleCompletedTasksDragSort() {
    const completedTasksClone = [...completedTasks];
    const temp = completedTasksClone[dragCompletedTask.current];
    completedTasksClone[dragCompletedTask.current] =
      completedTasksClone[draggedOverCompletedTask.current];
    completedTasksClone[draggedOverCompletedTask.current] = temp;
    //setCompletedTasks(completedTasksClone);

    setAllTasks([...activeTasks, ...completedTasksClone]);
  }
  return (
    <section>
      {completedTasks.map((task, index) => {
        return (
          <div
            className="w-full p-3 flex items-center justify-between text-lightMode-lightGrayishBlue text-lg border-lightMode-lightGrayishBlue dark:text-darkMode-darkGrayishBlue dark:border-darkMode-veryDarkGrayishBlue2  md:p-4 md:text-xl"
            style={{
              borderBottomWidth: index !== allTasks.length - 1 ? "1px" : "",
            }}
            key={index}
            draggable
            onDragStart={() => (dragCompletedTask.current = index)}
            onDragEnter={() => (draggedOverCompletedTask.current = index)}
            onDragEnd={handleCompletedTasksDragSort}
            onDragOver={(e) => e.preventDefault()}
          >
            {/*** Checked circle */}
            <CheckedCircle onClick={() => handleMakeTaskActive(task.id)} />

            {/*** Task */}
            <div className="w-full px-3 text-wrap line-through">
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

export default CompletedTasks;
