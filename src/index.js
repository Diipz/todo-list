import { loadInbox } from "./inbox";
import { loadTodayPage } from "./today.js";
import { parseISO, format } from 'date-fns';

window.myTaskList = [];
window.todaysTasks = [];


const inboxPage = document.querySelector("#inbox-page");
const todayPage = document.querySelector("#today-page");

let main = document.querySelector(".main");
let modalBg = document.querySelector(".modal-bg");
let modalCancel = document.querySelector("#cancel-btn");
let modalSubmit = document.querySelector("#submit-btn");
let taskDock = document.querySelector(".task-list");
let addTaskBtn = document.querySelector("#add-task-btn");


loadInbox();

//add tasks to main section of page if myTaskList not empty
if (myTaskList !== "") {
    createInboxTaskList();
}


inboxPage.addEventListener("click", () => {
    loadInbox();
    createInboxTaskList();
});

todayPage.addEventListener("click", () => {
    loadTodayPage();
});


//add task button and modal event listeners
addTaskBtn.addEventListener("click", () => {
    modalBg.classList.toggle("active");
});

modalCancel.addEventListener("click", () => {
    modalBg.classList.toggle("active");
});

modalSubmit.addEventListener("click", () => {
    let title = document.getElementById("title").value;
    let unformattedDate = document.getElementById("date").value;
    let date = format(parseISO(unformattedDate), "dd/MM/yyyy");


    addTaskToList(title, date);
    document.getElementById("modal").reset();
    modalBg.classList.toggle("active");
});

function Task(title, date) {
    this.title = title;
    this.date = date;
}

function addTaskToList(title, date) {
    let newTask = new Task(title, date);
    myTaskList.push(newTask);
    createInboxTaskList();
}

//add to tasks to main section of page
function createInboxTaskList() {
    let newNode = document.querySelector(".task-list");
    newNode.textContent = "";

    for (let i = 0; i < myTaskList.length; i++) {
        let taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskDock.appendChild(taskItem);

        //create checkbox icon to remove task once complete
        let checkBox = document.createElement("img");
        checkBox.src = "../src/img/crop-square.svg";
        checkBox.addEventListener("click", () => {
            myTaskList.splice(i, 1);
            todaysTasks.splice(i, 1);
            createInboxTaskList();
        });

        //create name of task
        let title = document.createElement("p");
        title.textContent = myTaskList[i].title;

        //create date of task
        let date = document.createElement("h5");
        date.classList.add("date");
        date.textContent = myTaskList[i].date;


        taskItem.appendChild(checkBox);
        taskItem.appendChild(title);
        taskItem.appendChild(date);
    }


    if (main.firstElementChild.textContent == "Today's Tasks") {
        loadTodayPage();
    }

}