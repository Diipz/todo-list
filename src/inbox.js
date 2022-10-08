export function loadInbox() {



    const main = document.querySelector(".main");
    const taskList = document.querySelector(".task-list");

    const inboxTitle = document.createElement("h1");
    inboxTitle.textContent = "Inbox";
    main.insertBefore(inboxTitle, main.children[0]);


}
