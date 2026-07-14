// ============================================================
// 🏠  EVENT LISTENERS — HOMEWORK
// ============================================================
// Mini Project: Interactive Task Board
//
// The Task Board from DOM Manipulation is back — now make it
// fully interactive with event listeners.
//
// Every interaction must use addEventListener.
// All DOM operations must be inside named functions.
// ============================================================

// ============================================================
// THE DATA
// ============================================================
const tasks = [
  {
    id: 1,
    title: "Design landing page",
    assignee: "Alex",
    priority: "high",
    status: "todo",
  },
  {
    id: 2,
    title: "Set up project repo",
    assignee: "Sofia",
    priority: "high",
    status: "done",
  },
  {
    id: 3,
    title: "Write API docs",
    assignee: "Liam",
    priority: "medium",
    status: "inprogress",
  },
  {
    id: 4,
    title: "Fix login bug",
    assignee: "Alex",
    priority: "high",
    status: "inprogress",
  },
  {
    id: 5,
    title: "Add dark mode",
    assignee: "Maya",
    priority: "low",
    status: "todo",
  },
  {
    id: 6,
    title: "Code review PR #42",
    assignee: "Sofia",
    priority: "medium",
    status: "todo",
  },
  {
    id: 7,
    title: "Deploy to staging",
    assignee: "Liam",
    priority: "high",
    status: "done",
  },
  {
    id: 8,
    title: "Update dependencies",
    assignee: "Maya",
    priority: "low",
    status: "todo",
  },
];

// ----------------------------------------------------------
// TASK 1 — createTaskCard (returns a DOM element)
// ----------------------------------------------------------
// Declare a function called createTaskCard.
// Parameter: task (object)
//
// Build and return a complete <li> element:
//   1. Create <li> — class "task-card", dataset.id = task.id,
//      dataset.priority = task.priority
//   2. Create <p class="task-title"> — textContent: task.title
//   3. Create <div class="task-meta">:
//      - <span> with priority class + text: task.priority.toUpperCase()
//      - <span>: "👤 " + task.assignee
//   4. Create <div class="card-actions">:
//      - <button class="complete-btn"> textContent: "✅ Complete"
//      - <button class="remove-btn">   textContent: "🗑️ Remove"
//   5. If task.status === "done" → add class "completed" to the <li>
//   6. Append title, meta, and actions to the <li>
//   7. Return the <li>

function createTaskCard(task) {
const li = document.createElement("li");
li.classList.add("task-card");
li.dataset.id = task.id;
li.dataset.priority = task.priority;



const p = document.createElement("p");
p.classList.add("task-tile");
p.textContent = task.title;

const divMeta = document.createElement("div");
divMeta.classList.add("task-meta");

const spanPriority = document.createElement("span");
spanPriority.classList.add("priority-" + task.priority);
spanPriority.textContent = task.priority.toUpperCase();

const spanAssignee = document.createElement("span");
spanAssignee.textContent = `👤 ${task.assignee}`;


divMeta.appendChild(spanPriority);
divMeta.appendChild(spanAssignee);

const cardActions = document.createElement("div");
cardActions.classList.add("card-actions");

const completeBtn = document.createElement("btn");
completeBtn.classList.add("complete-btn");
completeBtn.textContent = `✅ Complete`;

const removeBtn = document.createElement("btn");
removeBtn.classList.add("remove-btn");
removeBtn.textContent = `🗑️ Remove`;

task.status === "done" ? li.classList.add("completed") : null;

li.append(p, divMeta, cardActions);

return(li);

}

// append() adds at the end 
// prepend() adds at the start
// appendChild() adds one at the end


// ----------------------------------------------------------
// TASK 2 — renderBoard + updateCounts
// ----------------------------------------------------------
// Declare a function called renderBoard.
// Parameter: taskList
//
// Clear all three lists first (set innerHTML = ""):
//   #list-todo, #list-inprogress, #list-done
//
// Loop through taskList using forEach.
// Call createTaskCard(task) for each.
// Append to the correct list based on task.status.
//
// After appending call updateCounts(taskList).
//
// ---
// Declare a function called updateCounts.
// Parameter: taskList
//
// Update all six count displays:
//   #task-count       → taskList.length + " tasks"
//   #completed-count  → "✅ " + done.length + " done"
//   #pending-count    → "⏳ " + pending.length + " pending"
//   #count-todo       → todo tasks count
//   #count-inprogress → inprogress tasks count
//   #count-done       → done tasks count

function updateCounts(taskList) {

  const todoTasks = taskList.filter(task => task.status === "todo");
  const inprogressTasks = taskList.filter(task => task.status === "inprogress");
  const doneTask = taskList.filter(task => task.status === "done");

  const pendingCount = todoTasks.length + inprogressTasks.length;

  document.getElementById("task-count").textContent = `${taskList.length} tasks`;
  document.getElementById("completed-count").textContent = `✅${doneTask.length} done`;
  document.getElementById("pending-count").textContent = `⏳${pendingCount} pending`;
  document.getElementById("count-todo").textContent = todoTasks.length;
  document.getElementById("count-inprogress").textContent = inprogressTasks.length;
  document.getElementById("count-done").textContent = doneTask.length;

}

function renderBoard(taskList) {
  document.getElementById("list-todo").innerHTML = "";
  document.getElementById("list-inprogress").innerHTML = "";
  document.getElementById("list-done").innerHTML = "";

  taskList.forEach(task => {
    const card = createTaskCard(task);
    if(task.status === "todo") {
      document.getElementById("list-todo").append(card);
    } else if (task.status === "inprogress") {
      document.getElementById("list-inprogress").append(card);
    } else {
      document.getElementById("list-done").append(card);
    }
  });

  updateCounts(taskList);

}

// ----------------------------------------------------------
// TASK 3 — handleAddTask (click event on the Add button)
// ----------------------------------------------------------
// Declare a function called handleAddTask.
//
// Inside:
//   1. Read values from:
//      - #task-title-input    (.value.trim())
//      - #task-assignee-input (.value.trim())
//      - #task-priority-input (.value)
//      - #task-status-input   (.value)
//   2. If title is empty → log "Title is required" and return early
//   3. Create a new task object:
//      { id: Date.now(), title, assignee: assignee || "Unassigned",
//        priority, status }
//   4. Push the new task to the tasks array
//   5. Re-render: call renderBoard(tasks)
//   6. Clear the title and assignee inputs
//
// Wire it up:
//   document.getElementById("add-task-btn")
//     .addEventListener("click", handleAddTask);

function handleAddTask() {

  const taskTitle = document.getElementById("task-title-input").value.trim();
  const taskAssignee = document.getElementById("task-assignee-input").value.trim();
  const taskPriority = document.getElementById("task-priority-input").value;
  const statusInput = document.getElementById("task-status-input").value;

  if (taskTitle === ""){
    console.log("Title is required");
    return;
  }

  const newTask = {
    id: Date.now(),
    title: taskTitle, 
    assignee: taskAssignee || "Unassigned",
    priority: taskPriority,
    status: statusInput,
  }

  tasks.push(newTask);

  renderBoard(tasks);

  document.getElementById("task-title-input").value = "";
  document.getElementById("task-assignee-input").value = "";
  //newTask.classList.remove(title, assignee);
}

// wire up here
document.getElementById("add-task-btn")
  .addEventListener("click", handleAddTask);
// ----------------------------------------------------------
// TASK 4 — handleBoardClick (event delegation for complete + remove)
// ----------------------------------------------------------
// Instead of adding listeners to every button individually,
// use delegation on each column's task list.
//
// Declare a function called handleBoardClick.
// Parameter: event
//
// Inside:
//   - Get the clicked element: event.target
//   - Get the task card: target.closest(".task-card")
//     (.closest() walks UP the DOM tree to find the nearest matching ancestor)
//   - If no card found → return early
//   - Get the task id: parseInt(card.dataset.id)
//   - Find the task in the tasks array using find
//
//   IF target.classList.contains("complete-btn"):
//     - Set task.status = "done"
//     - Add class "completed" to card
//     - Move card to #list-done using appendChild
//     - Call updateCounts(tasks)
//
//   IF target.classList.contains("remove-btn"):
//     - Remove the task from tasks array:
//       const index = tasks.findIndex(t => t.id === taskId)
//       tasks.splice(index, 1)
//     - Remove the card from the DOM: card.remove()
//     - Call updateCounts(tasks)
//
// Wire ONE listener to document.getElementById("board"):
//   Wait — the <main> has class "board" not id "board".
//   Use document.querySelector(".board")
//     .addEventListener("click", handleBoardClick);
//
// Write a comment: why use .closest() instead of event.target directly?

function handleBoardClick(event) {
  const target = event.target;
  const taskCard = target.closest(".task-card");
    if (!taskCard){
      return;
    }
  const taskId = parseInt(taskCard.dataset.id);
  const foundTask = tasks.find(task => task.id === taskId);

  if (target.classList.contains("complete-btn")){
    foundTask.status = "done"
    taskCard.classList.add("completed")
    document.getElementById("list-done").appendChild(taskCard)
    updateCounts(tasks)
  };

  if (target.classList.contains("remove-btn")){
    const index = tasks.findIndex(t => t.id === taskId)
      tasks.splice(index, 1);
      taskCard.remove()
      updateCounts(tasks)
  };
}

// wire up here
document.querySelector(".board").addEventListener("click", handleBoardClick);
// ----------------------------------------------------------
// TASK 5 — handleFilterClick (filter buttons)
// ----------------------------------------------------------
// The header has four filter buttons with data-filter attributes:
//   data-filter="all", "high", "medium", "low"
//
// Declare a function called handleFilterClick.
// Parameter: event
//
// Inside:
//   - Get the filter value: event.target.dataset.filter
//   - If no filter value → return (clicked something that's not a button)
//
//   - Remove "active" class from ALL .filter-btn elements
//     (use querySelectorAll + forEach)
//   - Add "active" class to event.target
//
//   - Select ALL .task-card elements
//   - For each card:
//       IF filter === "all" → remove class "hidden"
//       ELSE IF card.dataset.priority === filter → remove "hidden"
//       ELSE → add "hidden"
//
// Use delegation on the .header-right div:
//   document.querySelector(".header-right")
//     .addEventListener("click", handleFilterClick);
//
// Write a comment: why use delegation here instead of
// individual listeners on each button?

function handleFilterClick(event) {
  const filterValue = event.target.dataset.filter;
  if(!filterValue){
    return("clicked something that's not a button")
  };

 const filterBtn = document.querySelectorAll(".filter-btn").forEach((btn)=>{
  btn.classList.remove("active");
 });

 event.target.classList("active");

 document.querySelectorAll(".task-card").forEach((card)=>{
  if (filter === "all" || card.dataset.priority === filter){
    card.classList.remove("hidden");
  } else {
 card.classList.add("hidden");
  }
 })


 
 
}

// wire up here
document.querySelector(".header-right").addEventListener("click", handleFilterClick);
// ----------------------------------------------------------
// TASK 6 — handleKeyDown (keyboard shortcuts)
// ----------------------------------------------------------
// Declare a function called handleKeyDown.
// Parameter: event
//
// Inside:
//   IF event.key === "Escape":
//     - Clear both input fields (#task-title-input, #task-assignee-input)
//     - Log: "Inputs cleared"
//
//   IF event.key === "Enter" AND event.target.id === "task-title-input":
//     - Call handleAddTask()
//     (lets users press Enter in the title field to add a task)
//
// Wire it up to document.

function handleKeyDown(event) {
  // your code here
}

// wire up here

// ----------------------------------------------------------
// TASK 7 — Connect the dots: init
// ----------------------------------------------------------
// Declare a function called init.
// Inside: call renderBoard(tasks).
//
// Call init() at the bottom.

function init() {
  // your code here
}

// ----------------------------------------------------------
// ⭐ STRETCH GOAL — live search
// ----------------------------------------------------------
// Add a search input somewhere on the page (you can add a
// plain <input id="search-input"> anywhere in the HTML above
// the board, inside .add-task-bar).
//
// Declare a function called handleSearch.
// Parameter: event
//
// Inside:
//   - Get the search query: event.target.value.toLowerCase().trim()
//   - Select all .task-card elements
//   - For each card:
//       Get the title text: card.querySelector(".task-title").textContent.toLowerCase()
//       IF the title includes the query → remove class "hidden"
//       ELSE → add class "hidden"
//
// Wire it up:
//   document.getElementById("search-input")
//     .addEventListener("input", handleSearch);
//
// Write a comment: why use "input" and not "change" for live search?

// ============================================================
// WIRE UP ALL LISTENERS (above init)
// ============================================================

// ============================================================
// START
// ============================================================
init();
