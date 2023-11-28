import { InlineIcon } from "@iconify/react";
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import "./Task.css";
import { ThemeContext } from "../../context/ThemeContext";
import { auth, db } from "../../firebase-config";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
const randomstring = require("randomstring");

const AddTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const { trans, langDir } = useContext(ThemeContext);
  const { taskCRUD, isLocal } = useContext(AppContext);

  const addTaskHandler = async () => {
    let task = {};
    Swal.fire({
      title: trans("Create Task", "إنشاء مهمه"),
      html:
        `<input id="title" dir="${langDir}" class="title-task-input" placeholder="${trans(
          "Task Title",
          "إسم المهمه"
        )}" value="${title}" required>` +
        `<textarea dir="${langDir}" id="description" class="desc-task-input" placeholder="${trans(
          "Task Description",
          "وصف المهمه"
        )}" required>${description}</textarea>` +
        `<div id="options" dir="${langDir}">` +
        `<label for="completed" class="swal2-checkbox-label">${trans(
          "Completed ?",
          "مكتمله ؟"
        )}</label>` +
        `<input id="completed" type="checkbox" class="swal2-checkbox" ${
          completed ? "checked" : ""
        }>` +
        `</div>`,
      showCancelButton: true,
      confirmButtonText: trans("Create", "إنشاء"),
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
        setTitle(titleInput.value);
        setDescription(descriptionInput.value);
        setCompleted(document.getElementById("completed").checked);
        task.title = titleInput.value;
        task.description = descriptionInput.value;
        task.completed = document.getElementById("completed").checked;
        task.timestamp = Date.now();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: trans("Adding Task...", "...جاري اضافه المهمه"),
          allowOutsideClick: false,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        if (isLocal) {
          taskCRUD(task, "insert");
        } else {
          createTask(task);
        }
      }
    });
  };

  const createTask = async (task) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser || isLocal) {
        if (!isLocal) {
          const userUid = currentUser.uid;
          const taskRef = doc(
            db,
            `users/${userUid}/tasks`,
            randomstring.generate(7)
          );

          await runTransaction(db, async (transaction) => {
            let docSnapshot = await transaction.get(taskRef);
            if (!docSnapshot.exists()) {
              transaction.set(taskRef, task);
            } else {
              transaction.update(taskRef, { completed: true });
            }
          });
        }
        taskCRUD(task, "insert");

        Swal.fire({
          title: trans("Task Created!", "تم انشاء المهمه بنجاح"),
          text: ` ${task.title}`,
          icon: "success",
          confirmButtonText: trans("Ok", "حسناً"),
        });

        setTitle("");
        setDescription("");
        setCompleted(false);
      } else {
        Swal.fire({
          title: trans("Error", "خطأ"),
          text: trans("No user signed in", "من فضلك قم بتسجيل الدخول أولا"),
          icon: "error",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: trans("Error", "خطأ"),
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full flex justify-end p-5 ">
      <div
        onClick={addTaskHandler}
        className="max-w-max  font-bold flex  cursor-pointer hover:bg-teal-500 drop-shadow-sm text-white rounded-md px-3 py-2 bg-teal-600"
      >
        <span className="mx-1">{trans("New Task", "إنشاء مهمه")}</span>
        <InlineIcon icon="basil:add-solid" className="text-2xl" />
      </div>
    </div>
  );
};

export default AddTask;
