"use strict";

// Query Selectors
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
// deleteHeader.className = "tbl-header";

let listBody = document.querySelectorAll(".rows");
let editBug = document.querySelector(".edit-bug");
let deleteBug = document.querySelector(".delete-bug");
let doneBug = document.querySelector(".done-bug");

//Editing Modal
let editForm = document.querySelector(".bug-edit");
let editEmail = document.querySelector(".edit-email");
let editPriority = document.querySelector(".edit-priority");
let editType = document.querySelector(".edit-bug-type");
let editBugName = document.querySelector(".edit-bug-name");
let editBugDescription = document.querySelector(".edit-bug-description");
let editSubmit = document.querySelector(".edit-submit");

let number;

let i = 1;
let errorStatusArr = ["Open", "To-Do", "In Progress"];
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
/******************************************************************************/

//////////////////////////////////////////////////////////////////////////////////

/****************CODE FOR CARD**************/

////FUNCTION TO CHECK IF THERE'S ANYTHING IN LOCAL STORAGE, AND ADDS IT BACK TO THE TABLE
if (retrievedCustomers) {
  parsedCustomers.forEach((e, i) => {
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

    let row = document.createElement("tr");
    number = document.createElement("th");
    let rowBugName = document.createElement("td");
    let rowBugType = document.createElement("td");
    let rowUserName = document.createElement("td");
    let rowdateCreated = document.createElement("td");
    let rowdateComplete = document.createElement("td");
    let rowStatus = document.createElement("td");
    let rowAssignee = document.createElement("td");
    let rowPriorityLevel = document.createElement("td");
    let rowDeleteCell = document.createElement("td");
    let rowDeleteButtons = document.createElement("div");
    let rowEdit = document.createElement("button");
    let rowDelete = document.createElement("button");

    number.innerText = e.id;
    row.className = "rows";
    rowEdit.className = "row-btn";
    rowDelete.className = "row-btn";
    rowDeleteButtons.className = "cell";
    rowDeleteCell.className = "cell-style";
    rowBugName.innerText = e.bugName;

    // rowDelete.type = "button";
    rowDelete.textContent = "Delete";

    // rowEdit.type = "button";
    rowEdit.textContent = "Edit";

    // deleteHeader.innerText = "Delete?";
    deleteHeader.style.display = "none";
    rowDeleteCell.style.display = "none";

    rowBugType.innerText = e.bugType;
    rowUserName.innerText = e.userName;
    rowdateCreated.innerText = e.dateCreated;
    rowdateComplete.innerText = e.dateComplete;
    rowStatus.innerText = e.errorStatus;
    rowAssignee.innerText = e.assignee;
    rowPriorityLevel.innerText = e.priority;

    row.appendChild(number);
    row.appendChild(rowBugName);
    row.appendChild(rowBugType);
    row.appendChild(rowUserName);
    row.appendChild(rowdateCreated);
    row.appendChild(rowdateComplete);
    row.appendChild(rowStatus);
    row.appendChild(rowAssignee);
    row.appendChild(rowPriorityLevel);
    row.appendChild(rowDeleteCell);
    rowDeleteCell.appendChild(rowDeleteButtons);
    rowDeleteButtons.appendChild(rowEdit);
    rowDeleteButtons.appendChild(rowDelete);
    listRow.appendChild(row);

    if (e.errorStatus === "In Progress") {
      rowStatus.style.backgroundColor = "green";
      // rowStatus.style.borderRadius = "20px";
    }

    if (e.errorStatus === "Open") {
      rowStatus.style.backgroundColor = "blue";
      // rowStatus.style.borderRadius = "20px";
    }

    if (e.errorStatus === "Closed") {
      rowStatus.style.backgroundColor = "red";
      // rowStatus.style.borderRadius = "20px";
    }

    if (e.errorStatus === "To-Do") {
      rowStatus.style.backgroundColor = "orange";
      // rowStatus.style.borderRadius = "20px";
    }

    // customers.push(parsedObj);
    // console.log(customerObj.id);

    ////SHOW BUGS FROM POPUP
    submitShowList.addEventListener("click", () => {
      submitPage.style.display = "none";
      submitConfirm.style.display = "none";
      location.reload();
    });

    ////DELETE BUTTON
    deleteBug.addEventListener("click", () => {
      deleteBug.style.display = "none";
      doneBug.style.display = "block";
      deleteHeader.style.display = "block";
      rowDeleteCell.style.display = "block";

      rowEdit.addEventListener("click", () => {
        submitPage.style.display = "block";
        editForm.style.display = "block";

        parsedCustomers.forEach((e, i) => {
          editBugName.value = e.bugName;
          editBugDescription.value = e.bugDescription;

          editSubmit.addEventListener("click", () => {
            submitPage.style.display = "none";
            editForm.style.display = "none";

            new BugInfo(
              e.id,
              e.userFirstName,
              e.userLastName,
              e.userName,
              e.userEmail,
              e.bugType,
              e.priority,
              editBugName.value,
              editBugDescription.value,
              e.dateCreated,
              e.dateComplete,
              e.errorStatus,
              e.assignee
            );

            // parsedObj.bugname = editBugName.value;
            // rowBugName.innertext = editBugName.value;
            // parsedObj.priority = editPriority.value;
            // parsedObj.bugType = editType.value;
            // parsedObj.errorType = editPriority.value;
            // parsedObj.errorDescription = editBugDescription.value;

            // customers.push(parsedObj);
            // console.log(parsedObj.bugname);
            // location.reload();
          });
        });

        rowDelete.addEventListener("click", () => {
          // e.style.display = "none";
          parsedCustomers.forEach((e, i) => {
            e.slice();
            customers[i].slice();
          });
          // if (number.textContent === parsedCustomers[i].id) {
          // parsedCustomers[i].splice();
          // parsedCustomers[i].splice();
          // }
        });

        //     ////EDIT BUTTON
      });
    });

    doneBug.addEventListener("click", () => {
      doneBug.style.display = "none";
      deleteBug.style.display = "block";
      deleteHeader.style.display = "none";
      rowDeleteCell.style.display = "none";
    });
  });
}

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

////SUBMIT
submit.addEventListener("click", () => {
  showList.style.display = "block";
  submitPage.style.display = "block";
  submitConfirm.style.display = "block";

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

  let stringifiedCustomers = JSON.stringify(customers);
  localStorage.setItem("bugs", stringifiedCustomers);
  console.log(customers);
});

/********************CODE FOR TABLE*******************/

// console.log(number.textContent);

/***************TEST CODE******************/

// console.log("Today:" + today);
// console.log("Future:" + futureDay);

// let hourAM = `${hour}:${minute} AM`;
// let hourPM = `${hour - 12}:${minute} PM`;

// if (hour > 12) {
//   futureDate = `${randomDate} @ ${hourPM}`;
// } else if (hour === 0) {
//   futureDate = `${randomDate} @ 12:${minute} AM`;
// } else {
//   futureDate = `${randomDate} @ ${hourAM}`;
// }

// if (minute < 10) {
//   futureDate = `${randomDate} @ ${hour}:${minuteUnderTen} AM`;
// } else if (hour === 0 && minute < 10) {
//   futureDate = `${randomDate} @ 12:${minuteUnderTen} AM`;
// }

// console.log(futureDate);

// console.log(currentDate.toJSON().slice(0, 10));
// console.log(currentDate.toString().slice(16, 24));

// let BugInfo = (
//   errorType,
//   userName,
//   dateCreated,
//   dateComplete,
//   errorStatus,
//   assignee,
//   priority
// ) => {
//   this['errorType'] = errorType;
//   this.userName = userName;
//   this.dateCreated = dateCreated;
//   this.dateComplete = dateComplete;
//   this.errorStatus =
//     errorStatus;
//   this.assignee = assignee;
//   this.priority = priority;

//   customers.push(this);
// };

// new BugInfo(bugName.value,`${firstName.value} ${lastName.value}`,today, futureDay, errorStatusArr[Math.floor(Math.random() * errorStatusArr.length)],assigneeArr[Math.floor(Math.random() * assigneeArr.length)], priorityLevel.value);

// BugInfo("syntax", "kevin", today, futureDay, "open", "andre", "A");
// console.log(customers);

// let bugInfo = {
//   errorType: bugName,
//   userName: `${firstName} ${lastName}`,
//   dateCreated: currentDate.toJSON().slice(0, 10),
//   dateComplete: currentDate.setDate(currentDate.getDate()),
//   // errorStatus: Math.floor(Math.random() * errorStatusArr.length),
//   // assignee: Math.floor(Math.random() * assigneeArr.length),
//   priority: priorityLevel,
// };

// bugInfo();

// console.log(
//   `${
//     day + (Math.floor(Math.random() * assigneeArr.length) + 1)
//   }/${month}/${year} @ ${hour}:${minute}`
// );

// errorStatusArr.forEach((e, i) => {
//   Math.floor(Math.random() * e.length);
//   console.log(e);
// });

// let parsedObj = {
//   id: e.id,
//   firstName: e.userFirstName,
//   lastName: e.userLastName,
//   userName: e.userName,
//   userEmail: e.userEmail,
//   priority: e.priority,
//   bugType: e.bugType,
//   bugname: e.bugName,
//   errorDescription: e.errorDescription,
//   dateCreated: e.dateCreated,
//   dateComplete: e.dateComplete,
//   errorStatus: e.errorStatus,
//   assignee: e.assignee,
// };

// console.log(parsedObj.bugname);

// let customerObj = {
//   id: customers.length + 1,
//   userFirstName: firstName.value,
//   userLastName: lastName.value,
//   userName: `${firstName.value} ${lastName.value}`,
//   userEmail: userEmail.value,
//   bugType: bugType.value,
//   priority: priorityLevel.value,
//   bugName: bugName.value,
//   errorDescription: bugDescription.value,
//   dateCreated: today,
//   dateComplete: futureDay,
//   errorStatus:
//     errorStatusArr[Math.floor(Math.random() * errorStatusArr.length)],
//   assignee: assigneeArr[Math.floor(Math.random() * assigneeArr.length)],
// };

// customers.push(customerObj);
