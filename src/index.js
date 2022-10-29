import { loadInbox } from "./inbox";
import { loadTodayPage } from "./today.js";
import { parseISO, format } from 'date-fns';

window.myTaskList = [];
window.todaysTasks = [];
window.projects = [];


const inboxPage = document.querySelector("#inbox-page");
const todayPage = document.querySelector("#today-page");

const main = document.querySelector(".main");
const modalBg = document.querySelector(".modal-bg");
const modalCancel = document.querySelector("#cancel-btn");
const modalSubmit = document.querySelector("#submit-btn");
const taskDock = document.querySelector(".task-list");
const addTaskBtn = document.querySelector("#add-task-btn");

const projectList = document.querySelector(".project")
const modalBg2 = document.querySelector(".modal-bg-2");
const modalCancel2 = document.querySelector("#cancel-btn-2");
const modalSubmit2 = document.querySelector("#submit-btn-2");
const addProjectBtn = document.querySelector("#project-page");


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

//add project button and modal event listeners
addProjectBtn.addEventListener("click", () => {
    modalBg2.classList.toggle("active");
});

modalCancel2.addEventListener("click", () => {
    modalBg2.classList.toggle("active");
});

modalSubmit2.addEventListener("click", () => {
    //add project to array
    let projectTitle = document.getElementById("project-title").value;

    if (projectTitle == "") {
        alert("Must enter project name");

    } else {
        projects.push(projectTitle);

        //add project to sidebar list
        let wrapper = document.createElement("div");
        wrapper.classList.add("icon-wrapper");
        projectList.appendChild(wrapper);

        let icon = document.createElement("img");
        icon.classList.add("sidebar-icon-2");
        icon.src = "../src/img/minus.svg";
        icon.addEventListener("click", () => {
            icon.parentNode.parentNode.removeChild(icon.parentNode);
            projects.splice(projects.indexOf(projectTitle), 1);
        });

        let projectName = document.createElement("div");
        projectName.classList.add("sidebar-tab");
        projectName.textContent = projectTitle;

        wrapper.appendChild(icon);
        wrapper.appendChild(projectName);
    }

    document.getElementById("modal-2").reset();
    modalBg2.classList.toggle("active");
});

