/* eslint-disable react/prop-types */
import ActiveTasks from "./ActiveTasks";
import CompletedTasks from "./CompletedTasks";

function AllTasks({
  allTasks,
  setAllTasks,
  activeTasks,
  completedTasks,
  setActiveTasks,
  setCompletedTasks,
}) {
  return (
    <>
      <CompletedTasks
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        activeTasks={activeTasks}
        completedTasks={completedTasks}
        setActiveTasks={setActiveTasks}
        setCompletedTasks={setCompletedTasks}
      />

      <ActiveTasks
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        activeTasks={activeTasks}
        completedTasks={completedTasks}
        setActiveTasks={setActiveTasks}
        setCompletedTasks={setCompletedTasks}
      />
    </>
  );
}

export default AllTasks;
