import { loadInbox } from "./inbox";
import { loadTodayPage } from "./today.js";
import { loadProjectTaskList } from "./project.js";
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
const projectNames = Array.from(document.querySelectorAll(".sidebar-tab-2"));


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

modalSubmit.addEventListener("click", addTaskDetails)


function addTaskDetails() {
    let title = document.getElementById("title").value;
    let unformattedDate = document.getElementById("date").value;

    let date = format(parseISO(unformattedDate), "dd/MM/yyyy");

    addTaskToList(title, date);
    modalBg.classList.toggle("active");
    document.getElementById("modal").reset();

}

function Task(title, date) {
    this.title = title;
    this.date = date;
}

function addTaskToList(title, date) {
    let newTask = new Task(title, date);
    let heading = document.querySelector("h1");
    let projectNames = Array.from(document.querySelectorAll(".sidebar-tab-2"));

    myTaskList.push(newTask);

    //check if user on project page and push task to project array if so
    for (let i = 0; i < projectNames.length; i++) {
        if (projectNames[i].textContent == heading.textContent) {
            window[projectNames[i].textContent].push(newTask);
        }
    }

    if (heading.textContent == "Inbox") {
        createInboxTaskList();
    } else if (heading.textContent == "Today's Tasks") {
        loadTodayPage();
    } else {
        loadProjectTaskList();
    }

}

//add to tasks to main section of page
function createInboxTaskList() {
    let newNode = document.querySelector(".task-list");
    newNode.textContent = "";

    let heading = document.querySelector("h1");


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

            //loop through project array and delete task if on current project page
            for (let j = 0; j < projectNames.length; j++) {
                if (projectNames[j].textContent == heading.textContent) {
                    window[projectNames[j].textContent].splice(j, 1);
                }
            }

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
    let projectArrName = document.getElementById("project-title").value;


    if (projectTitle == "") {
        alert("Must enter project name");

    } else {
        projects.push(projectTitle);
        window[projectArrName] = [];

        //add project to sidebar list
        let wrapper = document.createElement("div");
        wrapper.classList.add("icon-wrapper");
        projectList.appendChild(wrapper);


        let projectName = document.createElement("div");
        let projectHeading = document.createElement("h1");
        projectName.classList.add("sidebar-tab-2");
        projectName.textContent = projectTitle;
        projectHeading.textContent = projectTitle;
        projectName.addEventListener("click", () => {
            main.removeChild(main.firstElementChild);
            main.insertBefore(projectHeading, main.children[0]);
            loadProjectTaskList();
        });


        let icon = document.createElement("img");
        icon.classList.add("sidebar-icon-2");
        icon.src = "../src/img/minus.svg";
        icon.addEventListener("click", () => {
            //loop through specific project array and myTaskList array to remove identical tasks
            for (let i = 0; i < window[projectHeading.textContent].length; i++) {
                for (let j = 0; j < myTaskList.length; j++) {
                    if (window[projectHeading.textContent][i].title == myTaskList[j].title) {
                        myTaskList.splice(j, 1);
                    }
                }

            }
            //remove parent node 
            icon.parentNode.parentNode.removeChild(icon.parentNode);
            //remove project from project array
            projects.splice(projects.indexOf(projectTitle), 1);
            //empty task list of project
            window[projectHeading.textContent] = [];

            if (projectTitle == projectHeading.textContent) {
                loadInbox();
                createInboxTaskList();
            }

        });

        wrapper.appendChild(icon);
        wrapper.appendChild(projectName);

    }



    document.getElementById("modal-2").reset();
    modalBg2.classList.toggle("active");
});






