# Bugger-Off!

For my project, I created a bug tracker that takes in the user's information, and bug information, and adds it to a table.

## Operation

- The operation of this app is simple:
  - The user inputs their first name, last name, email, priority level, bug type, bug name, and bug information, and upon clicking submit,
  - The info is added to the constructor, which creates a new object with the information, and pushes it into local storage.
  - A pop-up is shown, letting the user know that their bug has been saved, with a link to the table of bugs.
  - Then, the information is pulled from local storage back into the code, and is then used to create a new row with the object that was added to local storage.
  - In the table, you can see the priority, the name of the reporter, the bug name given by the user, the type of bug it is , the date created(for the current day and time of submit), an anticipated fix date(for a random day within the week, time says the same), the status to simulate the developer setting a new staus for the bug, and the assignee simulating a specific developer being assigned to the bug.
  - There's 2 buttons above the list, allowing the user to be redirected to the card form to create a new bug, and a "view Bug" button that reveals a new column to the table, that reveals a modal that allows the user to view the information for each bug, and a close button to close the modal

<!-- * **Your app has at least three distinct "features"**
  * If you are building a travel planning application, one feature could be allowing users to create a new trip
* Your project contains a `README.md` file that explains what your project is and how to use it
* Your code is clean
  * Proper indentation
  * No unnecessary repetition
  * Variables as camelCase -->

## Misc.

- I had issues figuring out how to edit and delete things from local storage without having to add a new key/value pair for each new object, which was another issue itself, but I had planned on adding those features, so i may have forgotten to change or remove some variables for those features.
- I also added another index page which would have acted as the "developer" side to be able to change the assignee and status of the bug(and since the main page was linked to both indexes, what happens on one page happens on the other), but since I didn't figure out how to edit local storage, I couldn't implement that feature. Also, for some reason, trying to remove the new bug form at the top of the page would make all the bugs that were added disappear.
