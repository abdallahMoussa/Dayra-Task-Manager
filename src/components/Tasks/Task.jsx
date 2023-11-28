import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ReactTimeAgo from "react-time-ago";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { InlineIcon } from "@iconify/react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";
import AuthContext from "../../context/AuthContext";

const Task = ({ task }) => {
  const [direction, setDirection] = useState("ltr");
  const [data, setData] = useState({ ...task });
  const { taskCRUD } = useContext(AppContext);
  const { isLocal } = useContext(AuthContext);
  const { trans, langDir } = useContext(ThemeContext);

  const deleteHandler = () => {
    Swal.fire({
      title: trans("Are you sure about deleting task?", "هل تريد حذف المهمه؟"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: trans("Delete", "مسح"),
      cancelButtonText: trans("Cancel", "إلغاء"),
    }).then((result) => {
      if (result.isConfirmed) {
        if (isLocal) {
          taskCRUD(task, "delete");
        } else {
          deleteTask();
        }
      }
    });
  };
  const deleteTask = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userUid = currentUser.uid;
        const taskRef = doc(db, `users/${userUid}/tasks`, task.id);

        await deleteDoc(taskRef);
        toast.success(trans("Task deleted successfully", "تم حذ المهمه بنجاح"));
        setData(null);
        taskCRUD(task, "delete");
      } else {
      }
    } catch (error) {
      toast.error(
        trans("Error occurred while deleting task", "حدث خطأ أثناء حذف المهمة")
      );
    }
  };

  const editHandler = () => {
    let task = { ...data };
    Swal.fire({
      title: trans("Edit Task", "تعديل المهمه"),
      html:
        `<input id="title" dir="${langDir}" class="title-task-input" placeholder="${trans(
          "Task Title",
          "إسم المهمه"
        )}" value="${data.title}" required>` +
        `<textarea dir="${langDir}" id="description" class="desc-task-input" placeholder="${trans(
          "Task Description",
          "وصف المهمه"
        )}" required>${data.description}</textarea>`,
      showCancelButton: true,
      confirmButtonText: trans("Edit", "تعديل"),
      cancelButtonText: trans("Cancel", "إلغاء"),
      preConfirm: async () => {
        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description");

        if (!titleInput.checkValidity() || !descriptionInput.checkValidity()) {
          Swal.showValidationMessage(
            trans(
              "Please fill out all required fields",
              "من فضلك قم بملئ بيانات المهمه"
            )
          );
          return false;
        }
        task.title = titleInput.value;
        task.description = descriptionInput.value;
        task.completed = data.completed;
        task.timestamp = Date.now();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: trans("Editing Task...", "...جاري تعديل المهمه"),
          allowOutsideClick: false,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        if (isLocal) {
          taskCRUD(task, "update");
        } else {
          editTask(task);
        }
      }
    });
  };

  const checkDirection = (text) => {
    const englishRegex = /[a-zA-Z]/;
    return englishRegex.test(text);
  };

  const completeHandler = () => {
    Swal.fire({
      title: task.completed
        ? trans("Task Active?", "تنشيط المهمه ؟")
        : trans("Task Complete ?", " أكتمال المهمه ؟"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: task.completed
        ? trans("Active ", "تنشيط ")
        : trans("Completed", "إكتملت"),
      cancelButtonText: trans("Cancel", "إلغاء"),
    }).then((result) => {
      if (result.isConfirmed) {
        let temp = { ...data };
        temp.completed = !temp.completed;
        if (isLocal) {
          taskCRUD(temp, "update");
        } else {
          editTask(temp);
        }
        setData({ ...temp });
      }
    });
  };
  const editTask = async (updatedData) => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userUid = currentUser.uid;
        const taskRef = doc(db, `users/${userUid}/tasks`, updatedData.id);

        await updateDoc(taskRef, updatedData);
        setData(updatedData);
        toast.success(
          trans("Task Updated successfully", "تم تعديل المهمه بنجاح")
        );
        taskCRUD(updatedData, "update");
      }

      Swal.close();
    } catch (error) {
      toast.error(trans("unexpected error occurred", "وقع خطأ اثناء التعديل"));
      Swal.close();
    }
  };

  useEffect(() => {
    let isEnglish = checkDirection(task.title);
    setDirection((prev) => (isEnglish ? "ltr" : "rtl"));
  }, []);

  return (
    <>
      {data ? (
        <div
          dir={direction}
          className="w-[90%] flex flex-col items-start justify-start p-2 mx-5 my-2  shadow-black  rounded-md drop-shadow-sm bg-slate-300 dark:bg-slate-800/80"
        >
          <div className="flex justify-between w-full">
            <span className="md:text-2xl font-bold dark:text-teal-600 text-teal-700">
              {data.title}
            </span>
            <div className="relative flex group">
              <span className="pt-[6px] overflow-hidden w-0 whitespace-nowrap group-hover:w-28 dark:text-teal-400/50 text-teal-700">
                {direction == "ltr" ? "Complete Task" : " إكتمال المهمه"}
              </span>

              <InlineIcon
                icon="fluent:checkbox-unchecked-16-regular"
                className="text-4xl text-teal-900 cursor-pointer group-hover:saturate-200"
                onClick={completeHandler}
              />
              {data.completed ? (
                <InlineIcon
                  icon="line-md:check-all"
                  onClick={completeHandler}
                  className={`${
                    direction == "ltr" ? "right-2 " : "left-2 "
                  } text-xl absolute top-2 text-teal-500 cursor-pointer duration-100`}
                />
              ) : null}
            </div>
          </div>
          <p
            className={`p-3 dark:text-slate-400 text-slate-600 ${
              direction == "rtl" ? " text-right" : " text-left"
            }`}
          >
            {data.description}
          </p>

          <div className="flex justify-between w-full">
            <div className="time-ago">
              {data.timestamp && (
                <ReactTimeAgo
                  date={data.timestamp}
                  className="text-sm opacity-30 dark:text-slate-300/80"
                  locale={direction == "ltr" ? "en-US" : "ar-EG"}
                />
              )}
            </div>
            <div className="actions flex  ">
              <InlineIcon
                onClick={editHandler}
                icon="raphael:edit"
                className="cursor-pointer text-2xl mx-1 text-teal-800 opacity-60 hover:opacity-100 hover:saturate-200"
              />
              <InlineIcon
                onClick={deleteHandler}
                className="cursor-pointer text-2xl text-teal-800 opacity-60 hover:opacity-100 hover:saturate-200"
                icon="fluent:delete-48-filled"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Task;
