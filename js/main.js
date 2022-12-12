"use strict";

/*******************QUERY SELECTORS*********************/

//Form Fields
let bugForm = document.querySelector(".bug-form");
let firstName = document.querySelector(".first-name");
let lastName = document.querySelector(".last-name");
let userEmail = document.querySelector(".email");
let priorityLevel = document.querySelector(".priority-level");
let bugType = document.querySelector(".bug-type");
let bugName = document.querySelector(".user-bug-name");
let bugDescription = document.querySelector(".area .bug-description");
let submit = document.querySelector(".bug-submit");
let showList = document.querySelector(".show-my-list");

//Submit Modal
let submitPage = document.querySelector(".popup-page");
let submitConfirm = document.querySelector(".popup-confirm");
let submitMessage = document.querySelector(".popup-page p");
let submitShowList = document.querySelector(".modal-button");

//Table of Bugs
let list = document.querySelector(".table");
let listRow = document.querySelector(".tbl-rows");
let tableHeader = document.querySelector(".row-header");
let deleteHeader = document.querySelector(".hide");

let listBody = document.querySelectorAll(".rows");
let editBug = document.querySelector(".edit-bug");
let deleteBug = document.querySelector(".delete-bug");
let doneBug = document.querySelector(".done-bug");

//Editing Modal
let editForm = document.querySelector(".bug-edit");
let editFirstName = document.querySelector(".edit-first-name");
let editLastName = document.querySelector(".edit-last-name");
let editEmail = document.querySelector(".edit-email");
let editPriority = document.querySelector(".edit-priority");
let editType = document.querySelector(".edit-bug-type");
let editBugName = document.querySelector(".edit-bug-name");
let editBugDescription = document.querySelector(".edit-bug-description");
let editSubmit = document.querySelector(".edit-submit");

/****************HELPER CODE********************/

let i = 1;
let errorStatusArr = ["Open", "To-Do", "In Progress", "Closed"];
let assigneeArr = [
  "Kevin",
  "Andre",
  "Brandon",
  "Murphy",
  "Johanna",
  "Lauren",
  "Candice",
];

////WHAT GETS ITEMS FROM LOCAL STORAGE TO ADD BACK TO TABLE
let customers = [];

let retrievedCustomers = localStorage.getItem("bugs");
let parsedCustomers = JSON.parse(retrievedCustomers);

/****************CODE FOR DATES****************/

////VARIABLES FOR EACH SECTION OF THE TIME
let currentDate = new Date();
let futureDate;
let timeOfDay;

let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; ////ALLOWS FOR CORRECT NUMERICAL MONTH TO DISPLAY
let year = currentDate.getFullYear();
let hour = currentDate.getHours();
let minute = currentDate.getMinutes();

////CONVERTS MILITARY TIME TO AMERICAN TIME
if (hour > 12) {
  timeOfDay = "PM";
  hour = hour - 12;
} else if (hour === 0) {
  timeOfDay = "AM";
  hour = 12;
} else {
  timeOfDay = "AM";
}

////FIXES ISSUE WHERE MINUTES UNDER 10 IS IN SINGLE DIGIT FORMAT
if (minute < 10) {
  minute = `0${minute}`;
}

////STANDARD FORMAT FOR CURRENT AND FUTURE DATE AND TIME
let today = `${month}-${day}-${year} @ ${hour}:${minute} ${timeOfDay}`;

let futureDay = `${month}-${
  day + (Math.floor(Math.random() * assigneeArr.length) + 1)
}-${year} @ ${hour}:${minute} ${timeOfDay}`;

////CONSTRUCTOR STORING ALL OF THE VALUES TO BE PULLED FROM
function BugInfo(
  id,
  userFirstName,
  userLastName,
  userName,
  userEmail,
  bugType,
  priority,
  bugName,
  bugDescription,
  dateCreated,
  dateComplete,
  errorStatus,
  assignee
) {
  this.id = id;
  this.userFirstName = userFirstName;
  this.userLastName = userLastName;
  this.userName = userName;
  this.userEmail = userEmail;
  this.bugType = bugType;
  this.priority = priority;
  this.bugName = bugName;
  this.bugDescription = bugDescription;
  this.dateCreated = dateCreated;
  this.dateComplete = dateComplete;
  this.errorStatus = errorStatus;
  this.assignee = assignee;

  customers.push(this);
}
/******************************************************************************/

//////////////////////////////////////////////////////////////////////////////////

/**************************CODE FOR CARD/TABLE******************************/

////SUBMIT BUTTON THAT ADDS THE NEWLY CREATED OBJECT TO LOCAL STORAGE
submit.addEventListener("click", () => {
  showList.style.display = "block";
  submitPage.style.display = "block";
  submitConfirm.style.display = "block";

  ////OBJECT CREATION FROM CONSTRUCTOR
  new BugInfo(
    customers.length + 1,
    firstName.value,
    lastName.value,
    `${firstName.value} ${lastName.value}`,
    userEmail.value,
    bugType.value,
    priorityLevel.value,
    bugName.value,
    bugDescription.value,
    today,
    futureDay,
    errorStatusArr[Math.floor(Math.random() * errorStatusArr.length)],
    assigneeArr[Math.floor(Math.random() * assigneeArr.length)]
  );

  ////SETS OBJECT IN LOCAL STORAGE
  let stringifiedCustomers = JSON.stringify(customers);
  localStorage.setItem("bugs", stringifiedCustomers);
});

////FUNCTION TO CHECK IF THERE'S ANYTHING IN LOCAL STORAGE, AND CREATES A TABLE ROW WITH IT
if (retrievedCustomers) {
  ////LOOPS THROUGH EVERYTHING LOCAL STORAGE AND REDECLARES IT TO BE USED TO MAKE THE TABLE
  parsedCustomers.forEach((e) => {
    new BugInfo(
      e.id,
      e.userFirstName,
      e.userLastName,
      e.userName,
      e.userEmail,
      e.bugType,
      e.priority,
      e.bugName,
      e.bugDescription,
      e.dateCreated,
      e.dateComplete,
      e.errorStatus,
      e.assignee
    );

    ////Table Creation
    let row = document.createElement("tr");
    let number = document.createElement("th");
    let rowBugName = document.createElement("td");
    let rowBugType = document.createElement("td");
    let rowUserName = document.createElement("td");
    let rowdateCreated = document.createElement("td");
    let rowdateComplete = document.createElement("td");
    let rowStatus = document.createElement("td");
    let rowAssignee = document.createElement("td");
    let rowPriorityLevel = document.createElement("td");
    let rowViewCell = document.createElement("td");
    let rowButtons = document.createElement("div");
    let rowView = document.createElement("button");
    // let rowDelete = document.createElement("button");

    number.innerText = e.id;
    row.className = "rows";
    rowView.className = "row-btn";
    // rowDelete.className = "row-btn";
    rowButtons.className = "cell";
    rowViewCell.className = "cell-style";
    rowBugName.innerText = e.bugName;
    rowView.textContent = "View";
    deleteHeader.style.display = "none";
    rowViewCell.style.display = "none";

    rowBugType.innerText = e.bugType;
    rowUserName.innerText = e.userName;
    rowdateCreated.innerText = e.dateCreated;
    rowdateComplete.innerText = e.dateComplete;
    rowStatus.innerText = e.errorStatus;
    rowAssignee.innerText = e.assignee;
    rowPriorityLevel.innerText = e.priority;

    row.appendChild(number);
    row.appendChild(rowPriorityLevel);
    row.appendChild(rowUserName);
    row.appendChild(rowBugName);
    row.appendChild(rowBugType);
    row.appendChild(rowdateCreated);
    row.appendChild(rowdateComplete);
    row.appendChild(rowStatus);
    row.appendChild(rowAssignee);
    row.appendChild(rowViewCell);
    rowViewCell.appendChild(rowButtons);
    rowButtons.appendChild(rowView);
    // rowButtons.appendChild(rowDelete);
    listRow.appendChild(row);

    rowStatus.style.borderRadius = "10px";

    if (e.errorStatus === "In Progress") {
      rowStatus.style.backgroundColor = "green";
    }

    if (e.errorStatus === "Open") {
      rowStatus.style.backgroundColor = "blue";
    }

    if (e.errorStatus === "Closed") {
      rowStatus.style.backgroundColor = "red";
    }

    if (e.errorStatus === "To-Do") {
      rowStatus.style.backgroundColor = "orange";
    }

    ////SHOW TABLE FROM POPUP
    submitShowList.addEventListener("click", () => {
      submitPage.style.display = "none";
      submitConfirm.style.display = "none";
      location.reload();
    });

    ////DELETE BUTTON(NOT BEING USED BUT KEPT IT JUST IN CASE)
    deleteBug.addEventListener("click", () => {
      deleteBug.style.display = "none";
      doneBug.style.display = "block";
      deleteHeader.style.display = "block";
      rowViewCell.style.display = "block";

      ////Reveals the Modal
      rowView.addEventListener("click", () => {
        submitPage.style.display = "block";
        editForm.style.display = "block";

        /**************CODE TO POPULATE THE MODAL*******************/

        ////MAKES THE VALUE OF PRIORITY THE DEFAULT SELECTED
        let priorityList = document.querySelectorAll(
          ".edit-priority-level option"
        );

        for (let i = 0; i < priorityList.length; i++) {
          if (priorityList[i].value === e.priority) {
            priorityList[i].selected = "selected";
          }
        }

        ////MAKES THE VALUE OF BUG TYPE THE DEFAULT SELECTED
        let typeList = document.querySelectorAll(".edit-bug-type option");

        for (let i = 0; i < typeList.length; i++) {
          if (typeList[i].value === e.bugType) {
            typeList[i].selected = "selected";
          }
        }

        editFirstName.value = e.userFirstName;
        editLastName.value = e.userLastName;
        editEmail.value = e.userEmail;
        editBugName.value = e.bugName;
        editBugDescription.value = e.bugDescription;
        /************************************************************/

        ////MAKES THE MODAL HIDDEN AGAIN
        editSubmit.addEventListener("click", (e) => {
          e.preventDefault();
          submitPage.style.display = "none";
          editForm.style.display = "none";
        });
      });
    });

    ////SWITCHES THE DONE BUTTON BACK TO THE VIEW BUTTON
    doneBug.addEventListener("click", () => {
      doneBug.style.display = "none";
      deleteBug.style.display = "block";
      deleteHeader.style.display = "none";
      rowViewCell.style.display = "none";
    });
  });
}
