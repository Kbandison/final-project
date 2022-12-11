//For date: currentDate.toJSON().slice(0,10);
//For time: currentDate.toString().slice(16,24 or 16,21(without seconds));
//To advance date: currentDate.setDate(currentDate.getDate() + amount of days);

//Local Storage: localStorage.setItem, getItem, removeItem
//Step 1: Prepare data using Stringify array of objects(let data = [{...}], let stringifiedData = JSON.stringify(data))
//Step 2: Add to local storage using Set data (localStorage.setItem('myData',stringifiedData))
//Step 3: Get data (localStorage.getItem('myData');
//Step 4: Convert data back to array of objects(let parsedData = JSON.parse(JSON.stringify(data)));

To get the currrent date and time:
let today = `${month}-${day}-${year} @ ${hour}:${minute} ${timeOfDay}`;

to get a random date within the next week (replace assigneeArr with something else):
let futureDay = `${month}-${day + (Math.floor(Math.random() \* assigneeArr.length) + 1)}-${year} @ ${hour}:${minute} ${timeOfDay};

To convert military time into regular american time, and fix discrepancies:
if (hour > 12) {
timeOfDay = "PM";
hour = hour - 12;
} else if (hour === 0) {
timeOfDay = "AM";
hour = 12;
} else {
timeOfDay = "AM";
}

if (minute < 10) {
minute = `0${minute}`;
}
