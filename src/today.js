import { isToday, parse } from 'date-fns';

export function loadTodayPage() {
    const main = document.querySelector(".main");
    const taskDock = document.querySelector(".task-list");


    //check title page name and amend
    if (main.firstElementChild.textContent !== "") {
        main.removeChild(main.firstElementChild);
        const todayTitle = document.createElement("h1");
        todayTitle.textContent = "Today's Tasks";
        main.insertBefore(todayTitle, main.children[0]);
    } else {
        const todayTitle = document.createElement("h1");
        todayTitle.textContent = "Today's Tasks";
        main.insertBefore(todayTitle, main.children[0]);
    }

    //empty todaysTasks
    window.todaysTasks = [];

    identifyTodaysTasks();
    createTodaysTaskList();

    //function to identify today's tasks and push them into todaysTasks array
    function identifyTodaysTasks() {
        if (myTaskList !== "") {
            //loop through myTaskList to identify tasks dated today
            for (let i = 0; i < myTaskList.length; i++) {
                if (isToday(parse(myTaskList[i].date, "dd/MM/yyyy", new Date()))) {
                    todaysTasks.push(myTaskList[i]);
                }
            }
            return;
        }
    }


    //add today's tasks to main section of page
    function createTodaysTaskList() {
        let newNode = document.querySelector(".task-list");
        newNode.textContent = "";

        for (let i = 0; i < todaysTasks.length; i++) {
            let taskItem = document.createElement("div");
            taskItem.classList.add("task-item");
            taskDock.appendChild(taskItem);

            //create checkbox icon to remove task once complete
            let checkBox = document.createElement("img");
            checkBox.src = "../src/img/crop-square.svg";
            checkBox.addEventListener("click", () => {
                todaysTasks.splice(i, 1);
                myTaskList.splice(i, 1);
                createTodaysTaskList();
            });

            //create name of task
            let title = document.createElement("p");
            title.textContent = todaysTasks[i].title;

            //create date of task
            let date = document.createElement("h5");
            date.classList.add("date");
            date.textContent = todaysTasks[i].date;


            taskItem.appendChild(checkBox);
            taskItem.appendChild(title);
            taskItem.appendChild(date);
        }
    }
}
