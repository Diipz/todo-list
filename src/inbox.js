export function loadInbox() {
    let main = document.querySelector(".main");

    //check title page name and amend
    if (main.firstElementChild.textContent !== "") {
        main.removeChild(main.firstElementChild);
        const inboxTitle = document.createElement("h1");
        inboxTitle.textContent = "Inbox";
        main.insertBefore(inboxTitle, main.children[0]);
    } else {
        const inboxTitle = document.createElement("h1");
        inboxTitle.textContent = "Inbox";
        main.insertBefore(inboxTitle, main.children[0]);
    }

}






