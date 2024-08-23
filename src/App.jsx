import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Homepage from "./components/Homepage";
import ActiveTasks from "./components/ActiveTasks";
import AllTasks from "./components/AllTasks";
import CompletedTasks from "./components/CompletedTasks";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

import bgMobileLight from "./assets/bg-mobile-light.jpg";
import bgMobileDark from "./assets/bg-mobile-dark.jpg";
import bgDesktopLight from "./assets/bg-desktop-light.jpg";
import bgDesktopDark from "./assets/bg-desktop-dark.jpg";

function App() {
  //Sets isDarkMode based on system settings
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  //This controls the light and dark mode themes
  useEffect(() => {
    if (isDarkMode) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.getElementById("root").classList.add("dark");
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  }, [setIsDarkMode, isDarkMode]);

  {
    /*** Handles responsiveness seamlessly */
  }
  const [isDesktopWidth, setIsDesktopWidth] = useState(
    window.innerWidth >= 720
  );

  /**** This effect handles window width changes */
  useEffect(() => {
    const handleResize = () => {
      setIsDesktopWidth(window.innerWidth >= 720);
    };

    /*** This event listener ensures state updates on window width change */
    window.addEventListener("resize", handleResize);

    handleResize();

    /*** Removed event listener as component unmounts */
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsDesktopWidth]);

  {
    /*** Initial dummy tasks just for app display */
  }
  const initialTasks = [
    {
      id: "1",
      content: "Complete online JavaScript Course",
      status: "completed",
    },
    { id: "2", content: "Jog around the park 3x", status: "active" },
    { id: "3", content: "10 minutes meditation", status: "active" },
    { id: "4", content: "Read for 1 hour", status: "active" },
    { id: "5", content: "Read for 1 hour", status: "active" },
    { id: "6", content: "Pick up groceries", status: "active" },
    {
      id: "7",
      content: "Complete Todo App on Frontend Mentor",
      status: "completed",
    },
  ];

  {
    /*** The allTasks JSON is fetched from localStorage if available using the key "alltasks" */
  }
  const [allTasks, setAllTasks] = useLocalStorageState(
    initialTasks,
    "alltasks"
  );
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  return (
    <BrowserRouter>
      <div
        className="w-full min-h-screen bg-lightMode-lightGrayishBlue dark:bg-darkMode-veryDarkBlue"
        style={{
          //These ensures responsiveness and ight color theme for the background image
          backgroundImage: `url(${
            isDarkMode && !isDesktopWidth
              ? bgMobileDark
              : !isDarkMode && !isDesktopWidth
              ? bgMobileLight
              : isDarkMode && isDesktopWidth
              ? bgDesktopDark
              : bgDesktopLight
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: !isDesktopWidth ? "100% 30vh" : "100% 40vh",
          backgroundPositionX: "center",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                isDarkMode={isDarkMode}
                isDesktopWidth={isDesktopWidth}
                setIsDarkMode={setIsDarkMode}
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                activeTasks={activeTasks}
              />
            }
          >
            <Route
              index
              element={
                <AllTasks
                  allTasks={allTasks}
                  setAllTasks={setAllTasks}
                  activeTasks={activeTasks}
                  completedTasks={completedTasks}
                  setActiveTasks={setActiveTasks}
                  setCompletedTasks={setCompletedTasks}
                />
              }
            ></Route>
            <Route
              path="active"
              element={
                <ActiveTasks
                  allTasks={allTasks}
                  setAllTasks={setAllTasks}
                  activeTasks={activeTasks}
                  completedTasks={completedTasks}
                  setActiveTasks={setActiveTasks}
                  setCompletedTasks={setCompletedTasks}
                />
              }
            ></Route>
            <Route
              path="completed"
              element={
                <CompletedTasks
                  allTasks={allTasks}
                  setAllTasks={setAllTasks}
                  activeTasks={activeTasks}
                  completedTasks={completedTasks}
                  setActiveTasks={setActiveTasks}
                  setCompletedTasks={setCompletedTasks}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
