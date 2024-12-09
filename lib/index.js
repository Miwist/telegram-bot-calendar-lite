class telegramCalendar {
  constructor(
    date = new Date(),
    selectDay,
    monthNames = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    datesLock = [],
    closeIcon,
    selectIcon,
    nextMonthIcon,
    prevMonthIcon
  ) {
    this.date = date;
    this.currentDay = this.date.getDate();
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();
    this.monthNames = monthNames;
    this.datesLock = datesLock;
    this.selectDay = selectDay;
    this.closeIcon = closeIcon || "❌";
    this.selectIcon = selectIcon || "✅";
    this.nextMonthIcon = nextMonthIcon || ">>>";
    this.prevMonthIcon = prevMonthIcon || "<<<";
  }

  setDate(date) {
    if (typeof date !== "object") {
      throw new Error(
        "date must be date object like 2024-11-09T04:22:57.532Z."
      );
    }
    this.date = date;
    this.currentDay = this.date.getDate();
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();
  }

  setMonthNames(names) {
    if (
      !Array.isArray(names) ||
      !names.every((name) => typeof name === "string")
    ) {
      throw new Error("Month names must be an array of strings.");
    }
    this.monthNames = names;
  }

  setSelectIcon(icon) {
    if (typeof icon !== "string") {
      throw new Error("icon must be string.");
    }
    this.selectIcon = icon;
  }

  setPrevMonthIcon(icon) {
    if (typeof icon !== "string") {
      throw new Error("icon must be string.");
    }
    this.prevMonthIcon = icon;
  }

  setNextMonthIcon(icon) {
    if (typeof icon !== "string") {
      throw new Error("icon must be string.");
    }
    this.nextMonthIcon = icon;
  }

  setCloseIcon(icon) {
    if (typeof icon !== "string") {
      throw new Error("icon must be string.");
    }
    this.closeIcon = icon;
  }

  setSelectDay(selectDay) {
    if (typeof selectDay !== "string") {
      throw new Error("dayStart must be string.");
    }
    this.selectDay = selectDay;
  }

  setDatesLock(datesLock) {
    if (
      !Array.isArray(datesLock) ||
      !datesLock.every((lock) => typeof lock === "string") ||
      !datesLock.every((lock) => typeof lock === "object")
    ) {
      throw new Error("dates lock must be an array of strings or objects.");
    }
    this.datesLock = datesLock;
  }

  generateCalendar() {
    const monthName = this.monthNames[this.currentMonth];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const numDays = lastDayOfMonth.getDate();
    const days = Array.from({ length: numDays }, (_, i) => i + 1);

    const filterDatesLock = this.datesLock.filter(
      (date) =>
        date.getMonth() === this.currentMonth &&
        date.getFullYear() === this.currentYear
    );

    if (this.selectDay) {
      const [day2, month2, year2] = this.selectDay.split(".").map(Number);
      const startDate = new Date(year2, month2 - 1, day2);
      this.datesLock = this.datesLock.filter((date) => date > startDate);
    }

    const calendar = { inline_keyboard: [] };
    calendar.inline_keyboard.push([
      { text: this.prevMonthIcon, callback_data: "month_prev" },
      { text: monthName, callback_data: "no_callback" },
      { text: this.nextMonthIcon, callback_data: "month_next" },
    ]);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    let row = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      row.push({ text: " ", callback_data: " " });
    }

    let isDate = new Date();
    let month = isDate.getMonth();

    days.forEach((day) => {
      let textToPush = day;
      let calbackDay = day < 10 ? "0" + day : day;
      let callbackData = `${this.currentYear}-${
        this.currentMonth + 1
      }-${calbackDay}.day_calendar`;

      if (filterDatesLock.some((date) => date.getDate() === day)) {
        textToPush = this.closeIcon;
      }

      if (this.currentDay > day && this.currentMonth === month) {
        textToPush = this.closeIcon;
        callbackData = "close";
      }

      if (
        this.selectDay &&
        new Date(
          this.currentYear,
          this.currentMonth,
          this.selectDay
        ).getDate() === day
      ) {
        textToPush = this.selectIcon;
      }

      row.push({ text: textToPush, callback_data: callbackData });
      if (row.length === 7) {
        calendar.inline_keyboard.push(row);
        row = [];
      }
    });

    if (row.length > 0) {
      calendar.inline_keyboard.push(row);
    }

    return calendar;
  }
}

module.exports = telegramCalendar;
