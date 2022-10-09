export function loadInbox() {

    const main = document.querySelector(".main");
    const modalBg = document.querySelector(".modal-bg");
    const modalCancel = document.querySelector("#cancel-btn");
    const modalSubmit = document.querySelector("#submit-btn");
    const taskDock = document.querySelector(".task-list");

    let myTaskList = [];
    let taskCalendar = [];

    const inboxTitle = document.createElement("h1");
    inboxTitle.textContent = "Inbox";
    main.insertBefore(inboxTitle, main.children[0]);

    const addTaskBtn = document.querySelector("#add-task-btn");
    addTaskBtn.addEventListener("click", () => {
        modalBg.classList.toggle("active");
    });

    modalCancel.addEventListener("click", () => {
        modalBg.classList.toggle("active");
    });

    modalSubmit.addEventListener("click", () => {
        let title = document.getElementById("title").value;
        let date = document.getElementById("date").value;

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
        createTaskList();
    }

    function createTaskList() {
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
                createTaskList();
            });

            //create name of task
            let title = document.createElement("p");
            title.textContent = myTaskList[i].title;

            //create date of task
            let date = document.createElement("h5");
            date.classList.add("date");
            date.textContent = myTaskList[i].date;

            //push dates to taskCalendar array
            taskCalendar.push(date.textContent);

            console.log(date.textContent);

            taskItem.appendChild(checkBox);
            taskItem.appendChild(title);
            taskItem.appendChild(date);
        }
    }


}



