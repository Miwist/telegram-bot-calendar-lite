# Calendar [RUS]

Простое создание календаря в телеграм боте

## Установка

```bash
npm install telegram-bot-calendar-lite
```

## Опции

| Название      | Тип      | По умолчанию        | Описание                                     |
| ------------- | -------- | ------------------- | -------------------------------------------- |
| dateNew       | Date     | new Date()          | Инициализирует дату для создания календаря   |
| selectDay     | string   | current day         | Может применяться для выбора нескольких дат  |
| monthNames    | string[] | Russian month names | Название месяцев                             |
| datesLock     | Date[]   | []                  | Закрывает выбранные даты                     |
| closeIcon     | string   | "❌"                | Позволяет изменить иконку закрытых дат       |
| selectIcon    | string   | "✅"                | Позволяет изменить иконку выбранных дат      |
| nextMonthIcon | string   | ">>>"               | Позволяет изменить иконку кнопки след. месяц |
| prevMonthIcon | string   | "<<<"               | Позволяет изменить иконку кнопки пред. месяц |

## Использование

```JS
const bot = new TelegramBot(token, {
  polling: true,
});
const { telegramCalendar } = require('telegram-bot-calendar-lite');

const calendar = new telegramCalendar();
const buttons = calendar.generateCalendar();

bot.sendMessage(chatId, "text", {
    reply_markup: buttons,
});
```

## Использование со всеми аргументами

```JS
const calendar = new telegramCalendar(new Date(2024, 7, 1), 1, '2', "X", "*", "→", "←");
```

## Переключение месяцев

> Необходимо обработать callback «next_month» / «prev_month». Это включает добавление или вычитание месяца, передачу результата в функцию, а затем повторный вызов функции. Можно создать новое сообщение или отредактировать текущее.

```JS
const calendar = new telegramCalendar();

const botCallback = bot.on("callback_query", async (msg, match) => {
    const data = msg.data;

    if (data.includes("month_next")) {
        const newDate = new Date();

        newDate.setMonth(newDate.getMonth() + 1);
        calendar.setDate(newDate);

        let buttons = calendar.generateCalendar();

        bot.sendMessage(chatId, "test", {
            reply_markup: buttons,
        });
    }
})
```

## Получение выбранной даты

```JS
const botCallback = bot.on("callback_query", async (msg, match) => {
    const data = msg.data;

    if (data.includes(".day_calendar")) {
        const date = data.replace(/\..*$/, "");

        /**
         * next code...
         */
    }
})
```

## Существующие методы

```JS
• setDate(date) // Sets the calendar's current date.
• setMonthNames(names) // Sets custom month names.
• setSelectIcon(icon) // Sets the icon for selected dates.
• setPrevMonthIcon(icon) // Sets the icon for the previous month navigation.
• setNextMonthIcon(icon) // Sets the icon for the next month navigation.
• setCloseIcon(icon) // Sets the icon to close the calendar.
• setSelectDay(selectDay) // Sets the initially selected day.
• setDatesLock(datesLock) // Sets an array of dates to block.
```

# Calendar [ENG]

Easy Telegram calendar creation

## Bash install package

```bash
npm install telegram-bot-calendar-lite
```

## Options

| name          | type     | default             | description                          |
| ------------- | -------- | ------------------- | ------------------------------------ |
| dateNew       | Date     | new Date()          | initial Date display by the calendar |
| selectDay     | string   | current day         | helps in choosing multiple dates     |
| monthNames    | string[] | Russian month names | Months names                         |
| datesLock     | Date[]   | []                  | closes selected dates                |
| closeIcon     | string   | "❌"                | choose close icon                    |
| selectIcon    | string   | "✅"                | choose select icon                   |
| nextMonthIcon | string   | ">>>"               | choose next month icon               |
| prevMonthIcon | string   | "<<<"               | choose prev month icon               |

## Using sample

```JS
const bot = new TelegramBot(token, {
  polling: true,
});
const { telegramCalendar } = require('telegram-bot-calendar-lite');

const calendar = new telegramCalendar();
const buttons = calendar.generateCalendar();

bot.sendMessage(chatId, "text", {
    reply_markup: buttons,
});
```

## Using all options

```JS
const calendar = new telegramCalendar(new Date(2024, 7, 1), 1, '2', "X", "*", "→", "←");
```

## Switch months

> The "next_month" / "prev_month" callback needs to be handled. This involves adding or subtracting a month, passing the result to the function, and then recursively calling the function. A new message can be created or the current one edited.

```JS
const calendar = new telegramCalendar();

const botCallback = bot.on("callback_query", async (msg, match) => {
    const data = msg.data;

    if (data.includes("month_next")) {
        const newDate = new Date();

        newDate.setMonth(newDate.getMonth() + 1);
        calendar.setDate(newDate);

        let buttons = calendar.generateCalendar();

        bot.sendMessage(chatId, "test", {
            reply_markup: buttons,
        });
    }
})
```

## Getting date

```JS
const botCallback = bot.on("callback_query", async (msg, match) => {
    const data = msg.data;

    if (data.includes(".day_calendar")) {
        const date = data.replace(/\..*$/, "");

        /**
         * next code...
         */
    }
})
```

## Methods

```JS
• setDate(date) // Sets the calendar's current date.
• setMonthNames(names) // Sets custom month names.
• setSelectIcon(icon) // Sets the icon for selected dates.
• setPrevMonthIcon(icon) // Sets the icon for the previous month navigation.
• setNextMonthIcon(icon) // Sets the icon for the next month navigation.
• setCloseIcon(icon) // Sets the icon to close the calendar.
• setSelectDay(selectDay) // Sets the initially selected day.
• setDatesLock(datesLock) // Sets an array of dates to block.

```
