import React, { useContext, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ThemeContext } from "../../context/ThemeContext";
import AppContext from "../../context/AppContext";

const TaskChartLast7Days = () => {
  const chartRef = useRef(null);
  const { trans, isArabic } = useContext(ThemeContext);
  const { tasks } = useContext(AppContext);

  useEffect(() => {
    const getDayName = (index) => {
      const days = isArabic
        ? [
            "الأحد",
            "الاثنين",
            "الثلاثاء",
            "الاربعاء",
            "الخميس",
            "السبت",
            "الجمعه",
          ]
        : [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
      return days[index];
    };

    const getDaysOfWeek = () => {
      const daysOfWeek = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayIndex = date.getDay();
        const dayName = getDayName(dayIndex);
        daysOfWeek.push(dayName);
      }
      return daysOfWeek;
    };

    const daysOfWeek = getDaysOfWeek();

    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: daysOfWeek,
        datasets: [
          {
            label: trans("Active ", " النشطه"),
            data: [12, 19, 3, 5, 2, 3, 10],
            borderColor: "#2dd4bf ",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
          {
            label: trans("Completed ", " المكتمله"),
            data: [5, 9, 15, 20, 7, 10, 3],
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            titleFont: {
              family: "Almarai",
            },
            bodyFont: {
              family: "Almarai",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                family: "Almarai",
              },
            },
          },
          y: {
            ticks: {
              font: {
                family: "Almarai",
              },
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [isArabic]);

  return (
    <div className="m-auto h-[70vh] flex-col  ">
      <canvas ref={chartRef} className="w-full h-[63vh]"></canvas>
      <span className="mt-5 block text-slate-700 dark:text-slate-400">
        {trans("Hint: it`s a static data", "ملحوظه : هذه بيانات ثابته")}
      </span>
    </div>
  );
};

export default TaskChartLast7Days;
