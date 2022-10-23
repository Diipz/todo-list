export function loadInbox() {
    let main = document.querySelector(".main");


    //check title page name and amend
    if (main.firstElementChild.textContent == "Inbox" || main.firstElementChild.textContent == "Today's Tasks") {
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






