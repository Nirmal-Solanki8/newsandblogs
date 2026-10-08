import "./calender.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Calender = () => {
  const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsofyear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const [currmonth, setcurrmonth] = useState(today.getMonth());
  const [curryear, setcurryear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const daysinmonth = new Date(curryear, currmonth + 1, 0).getDate();
  const firstdayofmonth = new Date(curryear, currmonth, 1).getDay();

  const prevmonth = () => {
    if (currmonth === 0) {
      setcurrmonth(11);
      setcurryear((y) => y - 1);
    } else {
      setcurrmonth((m) => m - 1);
    }
  };

  const nextmonth = () => {
    if (currmonth === 11) {
      setcurrmonth(0);
      setcurryear((y) => y + 1);
    } else {
      setcurrmonth((m) => m + 1);
    }
  };

  const goToToday = () => {
    const now = new Date();
    setcurrmonth(now.getMonth());
    setcurryear(now.getFullYear());
    setSelectedDay(now.getDate());
  };

  const selectedDateFormatted = new Date(
    curryear,
    currmonth,
    selectedDay
  ).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="calendar-widget">
      {/* Calendar Header with Navigation */}
      <div className="calendar-header-nav">
        <div className="calendar-title-group">
          <FontAwesomeIcon icon={faCalendarCheck} className="calendar-title-icon" />
          <div className="calendar-month-year">
            <span className="cal-month">{monthsofyear[currmonth]}</span>
            <span className="cal-year">{curryear}</span>
          </div>
        </div>

        <div className="calendar-nav-controls">
          <button
            type="button"
            className="cal-today-btn"
            onClick={goToToday}
            title="Jump to today"
          >
            Today
          </button>
          <button
            type="button"
            className="cal-nav-arrow"
            onClick={prevmonth}
            aria-label="Previous month"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            type="button"
            className="cal-nav-arrow"
            onClick={nextmonth}
            aria-label="Next month"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {/* Weekday Names Header */}
      <div className="calendar-weekdays">
        {daysofweek.map((day) => (
          <span key={day} className="cal-weekday-label">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="calendar-days-grid">
        {/* Empty padding slots before first day */}
        {[...Array(firstdayofmonth).keys()].map((_, index) => (
          <span key={`empty-${index}`} className="cal-day-cell cal-empty-slot" />
        ))}

        {/* Days of current month */}
        {[...Array(daysinmonth).keys()].map((index) => {
          const dayNumber = index + 1;
          const isToday =
            dayNumber === today.getDate() &&
            currmonth === today.getMonth() &&
            curryear === today.getFullYear();
          const isSelected = dayNumber === selectedDay;

          return (
            <span
              key={dayNumber}
              className={`cal-day-cell ${isToday ? "today-date" : ""} ${
                isSelected ? "selected-date" : ""
              }`}
              onClick={() => setSelectedDay(dayNumber)}
            >
              {dayNumber}
            </span>
          );
        })}
      </div>

      {/* Selected Date Footer Bar */}
      <div className="calendar-footer-badge">
        <FontAwesomeIcon icon={faClock} className="cal-footer-icon" />
        <span className="cal-footer-text">{selectedDateFormatted}</span>
      </div>
    </div>
  );
};

export default Calender;