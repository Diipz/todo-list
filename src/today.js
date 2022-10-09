import { isToday } from 'date-fns';

export function loadTodayPage() {
    const main = document.querySelector(".main");
    const taskDock = document.querySelector(".task-list");

    //check title page name and amend
    if (main.firstElementChild.textContent == "Inbox" || main.firstElementChild.textContent == "Today's Tasks") {
        main.removeChild(main.firstElementChild);
        const todayTitle = document.createElement("h1");
        todayTitle.textContent = "Today's Tasks";
        main.insertBefore(todayTitle, main.children[0]);
    } else {
        const todayTitle = document.createElement("h1");
        todayTitle.textContent = "Today's Tasks";
        main.insertBefore(todayTitle, main.children[0]);
    }


}
