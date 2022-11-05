export function loadProjectTaskList() {
    const main = document.querySelector(".main");
    const taskDock = document.querySelector(".task-list");

    //loop through project names to identify if title matches
    for (let i = 0; i < projects.length; i++) {

        if (projects[i] == main.firstElementChild.textContent) {

            let newNode = document.querySelector(".task-list");
            newNode.textContent = "";

            //loop through project array and add tasks to list
            for (let j = 0; j < window[projects[i]].length; j++) {

                let taskItem = document.createElement("div");
                taskItem.classList.add("task-item");
                taskDock.appendChild(taskItem);


                //create checkbox icon to remove task once complete
                let checkBox = document.createElement("img");
                checkBox.src = "../src/img/crop-square.svg";
                checkBox.addEventListener("click", () => {
                    for (let k = 0; k < myTaskList.length; k++) {
                        if (window[projects[i]][j].title == myTaskList[k].title) {
                            myTaskList.splice(k, 1);
                        }
                    }
                    window[projects[i]].splice(j, 1);

                });

                //create name of task
                let title = document.createElement("p");
                title.textContent = window[projects[i]][j].title;

                //create date of task
                let date = document.createElement("h5");
                date.classList.add("date");
                date.textContent = window[projects[i]][j].date;

                taskItem.appendChild(checkBox);
                taskItem.appendChild(title);
                taskItem.appendChild(date);
            }
        }
    }

}
