import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const taskCRUD = (task, action) => {
    let temp = [...tasks];
    if (action === "insert") {
      temp.push(task);
    } else if (action === "update") {
      temp = temp.map((t) => {
        if (t.id === task.id) {
          return task;
        }
        return t;
      });
    } else if (action === "delete") {
      temp = temp.filter((t) => t.id !== task.id);
    }

    setTasks(temp);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        taskCRUD,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
