import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import Search from "../../components/UI/Search";
import Task from "../../components/Tasks/Task";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import { ThemeContext } from "../../context/ThemeContext";
import { isOnline, lastSegment } from "../../services/http/connection";
import Loading from "../../components/UI/Loading";
import { InlineIcon } from "@iconify/react";
import LocalStore from "../../services/http/localStore";

const Tasks = () => {
  const { tasks, setTasks, isLocal } = useContext(AppContext);
  const [data, setData] = useState([]);
  const { trans } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const path = lastSegment();

  const dataHandler = () => {
    let temp = [...tasks];
    if (path == "completed") {
      temp = tasks.filter((task) => task.completed);
    } else if (path == "active") {
      temp = tasks.filter((task) => !task.completed);
    }
    setData((prev) => temp);
    setIsLoading(false);
  };

  useEffect(() => {
    dataHandler();
  }, [path, tasks]);

  const fetchTasks = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userUid = currentUser.uid;
        const userTasksCollection = collection(db, `users/${userUid}/tasks`);
        const tasksSnapshot = await getDocs(userTasksCollection);

        const tasksData = [];
        tasksSnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() });
        });

        setTasks(tasksData);
      }
    } catch (e) {
      toast.error(trans("unexpected error occurred", "وقع خطأ تحميل البيانات"));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isLocal && isOnline()) {
        fetchTasks();
      }
      if (isLocal) {
        let tempTasks = LocalStore.getTasks();
        if (tempTasks) {
          setTasks(tempTasks);
        }
      }
    }, 500);
  }, []);
  return (
    <div className="w-full h-screen">
      <Search
        data={data}
        setFilteredTasks={setData}
        setIsLoading={setIsLoading}
      />
      {isLoading ? (
        <div className="w-full h-full flex justify-center">
          <Loading />
        </div>
      ) : data.length ? (
        <div className="tasks w-full mt-10 flex flex-col">
          {data.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full text-2xl  dark:text-teal-500 text-teal-900 flex justify-center items-center">
          <span className=" ">No {path == "tasks" ? "" : path} tasks</span>
          <InlineIcon icon="iconoir:file-not-found" className="mx-2" />
        </div>
      )}
    </div>
  );
};

export default Tasks;
