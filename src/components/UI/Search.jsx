import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../context/AppContext";
import { lastSegment } from "../../services/http/connection";
import "./Search.css";
import { ThemeContext } from "../../context/ThemeContext";
import { InlineIcon } from "@iconify/react";
const Search = ({ setFilteredTasks, setIsLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState("");
  const { tasks } = useContext(AppContext);
  const { trans, langDir, isArabic } = useContext(ThemeContext);
  const labelRef = useRef();
  const inputRef = useRef();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    let filtered = [...tasks];
    if (lastSegment() == "completed") {
      filtered = tasks.filter(
        (task) => task.title.toLowerCase().includes(query) && task.completed
      );
    } else if (lastSegment() == "active") {
      filtered = tasks.filter(
        (task) => task.title.toLowerCase().includes(query) && !task.completed
      );
    } else if (lastSegment() == "tasks") {
      filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(query)
      );
    }
    setFilteredTasks(filtered);
  };

  const openFilterHandler = () => {
    setFilterOpen((prev) => !prev);
  };

  const dateFilterHandler = () => {
    setIsLoading(true);
    const sortedTasks = tasks.slice().sort((a, b) => {
      return new Date(a.timestamp) - new Date(b.timestamp);
    });
    setTimeout(() => {
      setFilteredTasks((prev) => sortedTasks);
      setIsLoading(false);
    }, 500);
  };
  const alphFilterHandler = () => {
    setIsLoading(true);

    const sortedTasks = tasks.slice().sort((a, b) => {
      const titleA = a.title.toUpperCase(); // Convert titles to uppercase for case-insensitive sorting
      const titleB = b.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

    setTimeout(() => {
      setFilteredTasks((prev) => sortedTasks);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    inputRef.current.addEventListener("focus", () => {
      labelRef.current.classList.add("label-top");
    });
    inputRef.current.addEventListener("blur", (e) => {
      if (!e.target.value) {
        labelRef.current.classList.remove("label-top");
      }
    });
  }, []);

  return (
    <div className="flex input-with-placeholder justify-center">
      <div className=" sm:w-1/2 w-10/12">
        <input
          type="text"
          ref={inputRef}
          value={searchQuery}
          onChange={handleSearch}
          id="search"
          className="rounded-md dark:bg-slate-600 drop-shadow outline-none focus:bg-white/90 focus:dark:bg-slate-500 mx-1"
        />
        <label
          ref={labelRef}
          className="text-slate-400 pr-4 max-w-max top-0"
          htmlFor="search"
        >
          {trans("Search Name...", "بحث بالاسم...")}
        </label>
      </div>
      <div className="filter relative mx-3 px-3 pt-2 cursor-pointer drop-shadow-sm rounded-md dark:bg-slate-400 bg-slate-200 flex">
        <div onClick={openFilterHandler} className="w-full h-full flex">
          <span className="w-full h-full">{trans("filter", "تصنيف")}</span>
          <InlineIcon icon="clarity:filter-solid" className=" m-1" />
        </div>

        <div
          dir={langDir}
          className={`box-filter w-[93px] flex flex-col overflow-hidden  duration-300 justify-start items-start absolute rounded-md top-11 text-slate-500 bg-slate-200  ${
            filterOpen ? " h-12" : "h-0"
          } ${isArabic ? " right-0" : " left-0"}`}
        >
          <span
            onClick={dateFilterHandler}
            className="hover:bg-teal-400 w-full  px-2 pb-[1px] hover:text-black "
          >
            {trans("Date", `  تاريخ  `)}
          </span>
          <span
            onClick={alphFilterHandler}
            className="hover:bg-teal-400 w-full px-2 hover:text-black"
          >
            {trans("Alphabetic", " أبجدي")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
