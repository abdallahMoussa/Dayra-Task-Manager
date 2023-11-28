import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLocal, setIsLocal] = useState(false);

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
    addToLocalStorage(temp);
  };

  const addToLocalStorage = (tempTasks) => {
    let user = localStorage.getItem("user");
    if (user) {
      try {
        user = JSON.parse(user);
        const userEmail = user.email;
        localStorage.setItem(`${userEmail}-tasks`, JSON.stringify(tempTasks));
      } catch (error) {
        console.error("Parsing user data failed:", error);
      }
    } else {
      console.error("User data not found in localStorage");
    }
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        taskCRUD,
        isLocal,
        setIsLocal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
