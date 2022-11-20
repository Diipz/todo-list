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


window.storedMyTaskList = JSON.parse(localStorage.getItem("stored-task-list")) || [];
window.storedProjects = JSON.parse(localStorage.getItem("project-list")) || [];


if (storedMyTaskList !== "") {
    myTaskList = storedMyTaskList;
}

if (storedProjects !== "") {
    projects = storedProjects;
    addProjectToSideBar();
}

//loop through projects array to identify stored project content from local storage to add to projects
for (let i = 0; i < projects.length; i++) {

    if (JSON.parse(localStorage.getItem(`${projects[i]}`)) !== "") {
        let projectContent = JSON.parse(localStorage.getItem(`${projects[i]}`));
        window[projects[i]] = projectContent;
    } else {
        window[projects[i]] = [];
    }
}


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

    //add to localStorage
    localStorage.setItem("stored-task-list", JSON.stringify(storedMyTaskList));


    //check if user on project page and push task to project array if so
    for (let i = 0; i < projectNames.length; i++) {
        if (projectNames[i].textContent == heading.textContent) {
            window[projectNames[i].textContent].push(newTask);

            localStorage.setItem(`${projectNames[i].textContent}`, JSON.stringify(window[projectNames[i].textContent]));
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


    for (let i = 0; i < myTaskList.length; i++) {
        let taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskDock.appendChild(taskItem);

        //create name of task
        let title = document.createElement("p");
        title.textContent = myTaskList[i].title;

        //create date of task
        let date = document.createElement("h5");
        date.classList.add("date");
        date.textContent = myTaskList[i].date;

        //create checkbox icon to remove task once complete
        let checkBox = document.createElement("img");
        checkBox.src = "../src/img/crop-square.svg";
        checkBox.addEventListener("click", () => {
            myTaskList.splice(i, 1);
            todaysTasks.splice(i, 1);
            storedMyTaskList.splice(i, 1);

            //update local storage
            localStorage.setItem("stored-task-list", JSON.stringify(storedMyTaskList));

            //loop through project names and delete from specific project array
            for (let j = 0; j < projects.length; j++) {
                //remove task from specific project array and update local storage
                window[projects[j]].splice(j, 1);
                localStorage.setItem(`${projects[j]}`, JSON.stringify(window[projects[j]]));
            }

            createInboxTaskList();
        });


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

    //stop same project names being entered by user
    for (let z = 0; z < projects.length; z++) {
        if (projects[z] == projectTitle) {
            alert("This project already exists, please select a new project name")
            return;
        }
    }

    if (projectTitle == "") {
        alert("Must enter project name");

    } else {
        projects.push(projectTitle);
        window[projectArrName] = [];

        //add to localStorage
        localStorage.setItem("project-list", JSON.stringify(storedProjects));
        localStorage.setItem(`${projectArrName}`, JSON.stringify(window[projectArrName]));

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
                        storedMyTaskList.splice(j, 1);

                        //update local storage
                        localStorage.setItem("stored-task-list", JSON.stringify(storedMyTaskList));
                    }
                }
            }
            //remove parent node 
            icon.parentNode.parentNode.removeChild(icon.parentNode);
            //remove project from project array
            projects.splice(projects.indexOf(projectTitle), 1);
            //update local storage
            localStorage.setItem("project-list", JSON.stringify(storedProjects));
            //empty task list of project and update local storage
            window[projectHeading.textContent] = [];
            localStorage.setItem(`${projectHeading.textContent}`, JSON.stringify(window[projectHeading.textContent]));


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

//append project names to sidebar from local storage
function addProjectToSideBar() {


    for (let h = 0; h < projects.length; h++) {


        let wrapper = document.createElement("div");
        wrapper.classList.add("icon-wrapper");
        projectList.appendChild(wrapper);


        let projectName = document.createElement("div");
        let projectHeading = document.createElement("h1");
        projectName.classList.add("sidebar-tab-2");
        projectName.textContent = projects[h];
        projectHeading.textContent = projects[h];
        projectName.addEventListener("click", () => {
            main.removeChild(main.firstElementChild);
            main.insertBefore(projectHeading, main.children[0]);
            loadProjectTaskList();
        });


        let icon = document.createElement("img");
        icon.classList.add("sidebar-icon-2");
        icon.src = "../src/img/minus.svg";
        icon.addEventListener("click", () => {


            if (window[projectHeading.textContent].length > 0) {

                //loop through specific project array and myTaskList array to remove identical tasks
                for (let i = 0; i < window[projectHeading.textContent].length; i++) {
                    for (let j = 0; j < myTaskList.length; j++) {
                        if (window[projectHeading.textContent][i].title == myTaskList[j].title) {
                            myTaskList.splice(j, 1);
                            storedMyTaskList.splice(j, 1);

                            //update local storage
                            localStorage.setItem("stored-task-list", JSON.stringify(storedMyTaskList));
                        }
                    }
                }
            }


            //remove parent node 
            icon.parentNode.parentNode.removeChild(icon.parentNode);
            //remove project from project array
            projects.splice(projects.indexOf(projects[h]), 1);
            //empty task list of project
            window[projectHeading.textContent] = [];
            localStorage.setItem(`${projectHeading.textContent}`, JSON.stringify(window[projectHeading.textContent]));
            //remove project from local storage array and update
            storedProjects.splice(storedProjects.indexOf(projects[h]), 1);
            localStorage.setItem("project-list", JSON.stringify(storedProjects));

            if (main.firstElementChild.textContent == projectHeading.textContent) {
                loadInbox();
                createInboxTaskList();
            }

        })

        wrapper.appendChild(icon);
        wrapper.appendChild(projectName);
    }

}





