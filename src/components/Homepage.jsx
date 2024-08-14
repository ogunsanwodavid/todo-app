/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import iconSun from "../assets/icon-sun.svg";
import iconMoon from "../assets/icon-moon.svg";

import Circle from "./Circle";

function Homepage({
  isDarkMode,
  isDesktopWidth,
  setIsDarkMode,
  allTasks,
  setAllTasks,
  activeTasks,
}) {
  {
    /*** Handles the color theme toggling */
  }
  function handleDarkModeToggle() {
    setIsDarkMode((mode) => !mode);
  }

  const [newTaskContent, setNewTaskContent] = useState("");

  {
    /*** Check is a new task content added is new */
  }
  function isTaskNew(taskContent) {
    const sameTask = allTasks.filter((task) => {
      return task.content === taskContent;
    });

    return sameTask.length === 0;
  }

  {
    /**Handles the creation of new task */
  }
  function handleCreateTask() {
    if (!newTaskContent) return;
    if (!isTaskNew(newTaskContent)) return;

    setAllTasks([
      ...allTasks,
      {
        id: (allTasks.length + 1).toString(),
        content: newTaskContent,
        status: "active",
      },
    ]);

    setNewTaskContent("");
  }

  {
    /*** Handles deleting completed tasks */
  }
  function handleClearCompletedTasks() {
    setAllTasks(
      allTasks.filter((task) => {
        return task.status !== "completed";
      })
    );
  }

  return (
    <div className="w-full min-h-screen max-w-[700px] px-6 pt-8 md:px-0 md:mx-auto md:pt-20">
      {/*** Navbar */}
      <nav className="w-full flex justify-between">
        {/*** Logo */}
        <Link to="/">
          <h1 className="text-lightMode-veryLightGray text-3xl font-bold tracking-[0.7rem] md:text-4xl md:tracking-[0.4em]">
            TODO
          </h1>
        </Link>

        {/*** Dark Mode Toggler*/}
        <section className="" onClick={handleDarkModeToggle}>
          <img
            src={isDarkMode ? iconSun : iconMoon}
            className="h-6 md:h-7"
            alt=""
          />
        </section>
      </nav>
      {/*** New Todo Creator */}
      <section className="w-full flex items-center space-x-4 bg-white rounded-md p-3 mt-7 dark:bg-darkMode-veryDarkDesaturatedBlue md:mt-10 md:p-4">
        {/*** Circle */}
        <Circle onClick={handleCreateTask} />

        {/*** Text input */}
        <form className="w-full" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="w-full h-6 font-bold bg-transparent text-lightMode-darkGrayishBlue text-lg outline-none placeholder:leading-6 dark:text-darkMode-darkGrayishBlue md:text-xl"
            placeholder="Create a New Todo"
            value={newTaskContent}
            onInput={(e) => setNewTaskContent(e.target.value)}
          />
        </form>
      </section>

      {/*** Tasks Display */}
      <section className="tasks-display w-full max-h-[300px] overflow-y-scroll bg-white rounded-md mt-4 dark:bg-darkMode-veryDarkDesaturatedBlue md:max-h-[370px]">
        <Outlet />
      </section>

      {/*** Statistics Display */}
      <section className="w-full flex items-center justify-between bg-white font-bold rounded-md mt-1 p-3 text-lightMode-darkGrayishBlue text-lg dark:text-darkMode-darkGrayishBlue  dark:bg-darkMode-veryDarkDesaturatedBlue md:text-xl">
        {/*** Displays number of active tasks */}
        <p className="hover:text-lightMode-veryDarkGrayishBlue dark:hover:text-darkMode-lightGrayishBlueHover">
          {activeTasks.length} {activeTasks.length > 1 ? "items" : "item"} left
        </p>

        {/*** Navigation links for desktop view */}
        {isDesktopWidth ? (
          <section className="w-max flex justify-center space-x-5 bg-white font-bold p-0 text-lightMode-darkGrayishBlue dark:text-darkMode-darkGrayishBlue  dark:bg-darkMode-veryDarkDesaturatedBlue ">
            <NavLink
              to="/"
              className="hover:text-lightMode-veryDarkGrayishBlue dark:hover:text-darkMode-lightGrayishBlueHover"
            >
              All
            </NavLink>
            <NavLink
              to="/active"
              className="hover:text-lightMode-veryDarkGrayishBlue dark:hover:text-darkMode-lightGrayishBlueHover"
            >
              Active
            </NavLink>
            <NavLink
              to="/completed"
              className="hover:text-lightMode-veryDarkGrayishBlue dark:hover:text-darkMode-lightGrayishBlueHover"
            >
              Completed
            </NavLink>
          </section>
        ) : null}

        {/*** Handles clearing of completed tasks */}
        <div
          onClick={handleClearCompletedTasks}
          className="hover:text-lightMode-veryDarkGrayishBlue dark:hover:text-darkMode-lightGrayishBlueHover"
        >
          Clear Completed
        </div>
      </section>

      {/*** Navigation Links for mobile view*/}
      {!isDesktopWidth ? (
        <section className="w-full flex justify-center space-x-5 bg-white font-bold rounded-md mt-4 p-3 text-lightMode-darkGrayishBlue text-lg dark:text-darkMode-darkGrayishBlue  dark:bg-darkMode-veryDarkDesaturatedBlue hover:text-lightMode-veryLightGray dark:hover:text-darkMode-lightGrayishBlueHover">
          <NavLink to="/">All</NavLink>
          <NavLink to="/active">Active</NavLink>
          <NavLink to="/completed">Completed</NavLink>
        </section>
      ) : null}

      {/*** Drag and Order display */}
      <section className="w-full text-center font-semibold rounded-md mt-7 text-lightMode-darkGrayishBlue text-lg dark:text-darkMode-darkGrayishBlue md:mt-10 md:text-xl">
        <p>Drag and drop to reorder list</p>
      </section>
    </div>
  );
}

export default Homepage;
