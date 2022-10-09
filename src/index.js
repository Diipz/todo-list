import { loadInbox } from "./inbox";
import { loadTodayPage } from "./today.js";
import { isToday } from 'date-fns';

let myTaskList = [];
let taskCalendar = [];

loadInbox();

const main = document.querySelector(".main");
const inboxPage = document.querySelector("#inbox-page");
const todayPage = document.querySelector("#today-page");


inboxPage.addEventListener("click", () => {
    loadInbox();
});

todayPage.addEventListener("click", () => {
    loadTodayPage();
});


