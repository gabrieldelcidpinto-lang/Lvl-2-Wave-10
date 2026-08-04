// ============================================================
// 🏠  localStorage — HOMEWORK
// ============================================================
// Mini Project: Persistent Task Board
//
// The Task Board from Event Listeners — now with persistence.
// Every change is saved to localStorage automatically.
// Refreshing the page restores exactly where the user left off.
//
// STORAGE KEY: "taskBoardData"
// Store the full tasks array under this key.
// ============================================================

// ============================================================
// DEFAULT TASKS — used only when nothing is saved yet
// ============================================================
const defaultTasks = [
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
];

// This is your working tasks array — start it empty.
// loadTasks() will fill it from localStorage (or from defaultTasks).
let tasks = [];

// ----------------------------------------------------------
// TASK 1 — saveTasks
// ----------------------------------------------------------
// Declare a function called saveTasks.
// No parameters.
//
// Inside:
//   1. Save tasks to localStorage:
//      localStorage.setItem("taskBoardData", JSON.stringify(tasks))
//
//   2. Flash the save indicator:
//      Select #save-indicator
//      Add class "visible"
//      After 1500ms, remove class "visible":
//        setTimeout(function() {
//          saveIndicator.classList.remove("visible");
//        }, 1500);
//
// This function will be called after EVERY change.

function saveTasks() {
  localStorage.setItem("taskBoardData", JSON.stringify(tasks));

  const savedIndicator = document.getElementById("save-indicator");

  savedIndicator.classList.add("visible")

  setTimeout(function(){
    savedIndicator.classList.remove("visible");
  }, 1500);
}
// ----------------------------------------------------------
// TASK 2 — loadTasks
// ----------------------------------------------------------
// Declare a function called loadTasks.
// No parameters. Returns nothing — populates the tasks array.
//
// Inside:
//   1. const raw = localStorage.getItem("taskBoardData")
//
//   2. IF raw is null (nothing saved yet):
//      Set tasks = [...defaultTasks]  (copy the defaults)
//      Call saveTasks() to save them immediately
//      Return early
//
//   3. ELSE:
//      Set tasks = JSON.parse(raw)
//
// ⚠️  Always check for null before parsing.

function loadTasks() {
  const raw = localStorage.getItem("taskBoardData")

if (!raw){
  tasks = [...defaultTasks];
  saveTasks();
  return;
}

tasks = JSON.parse(raw)
}

// ----------------------------------------------------------
// TASK 3 — createTaskCard (returns a DOM element)
// ----------------------------------------------------------
// Carried from Event Listeners — same structure.
// Parameter: task (object)
//
// Build and return a <li> with:
//   - class "task-card"
//   - dataset.id = task.id
//   - dataset.priority = task.priority
//   - A title <p class="task-title">
//   - A meta <div class="task-meta"> with priority and assignee spans
//   - An actions <div class="card-actions"> with Complete and Remove buttons
//   - class "completed" if task.status === "done"
//
// Return the <li> — do NOT append it here.

function createTaskCard(task) {
  const li = document.createElement("li");

  li.classList.add("task-card");
  li.dataset.id = task.id;
  li.dataset.priority = task.priority;

  const paragraphTitle = document.createElement("p");
  paragraphTitle.textContent = task.title
  paragraphTitle.classList.add("task-title");

  const meta =  document.createElement("div");
  meta.classList.add("task-meta");

  const prioritySpan = document.createElement("span");
  prioritySpan.textContent = task.priority.toUpperCase()

  const assigneeSpan = document.createElement("span");
  assigneeSpan.textContent = task.assignee;

  meta.append(prioritySpan, assigneeSpan);

  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.textContent = "Complete";
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove";
  
  actions.append(completeBtn, removeBtn);

  
  task.status === "done" ? li.classList.add("completed") : null;

 li.append(paragraphTitle, meta, actions);

  return(li);
}

// ----------------------------------------------------------
// TASK 4 — renderBoard + updateCounts
// ----------------------------------------------------------
// Declare a function called renderBoard.
// No parameters — uses the global tasks array.
//
// Clear all three lists (innerHTML = "").
// Loop through tasks, call createTaskCard, append to correct list.
// Call updateCounts() after.
//
// ---
// Declare a function called updateCounts.
// No parameters.
//
// Update all six count elements using the tasks array.
// (Same as Event Listeners homework)

function updateCounts() {
const done = tasks.filter(task => task.status === "done");
const pending = tasks.filter(task => task.status !== "done");
const todo = tasks.filter(task => task.status === "todo");
const inprogress = tasks.filter(task => task.status === "inprogress");

document.getElementById("task-count").textContent = tasks.length + "tasks";
document.getElementById("completed-count").textContent = `${done.length} done`;
document.getElementById("pending-count").textContent = `${pending.length} pending`;
document.getElementById("count-todo").textContent = `${todo.length}`;
document.getElementById("count-inprogress").textContent = `${inprogress.length}`;
document.getElementById("count-done").textContent = `${done.length}`;

}

function renderBoard() {
 const todoList = document.getElementById("list-todo");
  const inprogressList = document.getElementById("list-inprogress");
  const doneList = document.getElementById("list-done");

  todoList.innerHTML = "";
  inprogressList.innerHTML = "";
  doneList.innerHTML = "";
  
  tasks.forEach((task)=>{
const card = createTaskCard(task);

if (task.status === "todo"){
  todoList.appendChild(card)
} else if (task.status === "inprogress"){
  inprogressList.appendChild(card);
} else if (task.status === "done"){
  doneList.appendChild(card);
}
  });
  updateCounts();
}



// ----------------------------------------------------------
// TASK 5 — handleAddTask
// ----------------------------------------------------------
// Declare a function called handleAddTask.
//
// Inside:
//   1. Read the four input values (title, assignee, priority, status)
//   2. If title is empty → return early
//   3. Create a new task object with id: Date.now()
//   4. Push to tasks array
//   5. Call saveTasks()     ← persist immediately
//   6. Call renderBoard()   ← update the view
//   7. Clear title and assignee inputs
//
// Wire it up:
//   document.getElementById("add-task-btn")
//     .addEventListener("click", handleAddTask)

function handleAddTask() {
  const inputTitle = document.getElementById("task-title-input").value.trim();
  const inputAssignee = document.getElementById("task-assignee-input").value.trim();
  const inputPriority = document.getElementById("task-priority-input").value;
  const inputStatus = document.getElementById("task-status-input").value;

  if (!inputTitle) {
    return;
  }

  tasks.push({
    id: Date.now(),
    title: inputTitle,
    assignee: inputAssignee || "unassigned",
    priority: inputPriority,
    status: inputStatus
  })

  saveTasks();
  renderBoard();

  document.getElementById("task-title-input").value = "";
  document.getElementById("task-assignee-input").value = "";
  
}

document
  .getElementById("add-task-btn")
  .addEventListener("click", handleAddTask);

// ----------------------------------------------------------
// TASK 6 — handleBoardClick (delegation for complete + remove)
// ----------------------------------------------------------
// Declare a function called handleBoardClick.
// Parameter: event
//
// Use event.target.closest(".task-card") to get the card.
// Guard: if no card → return.
//
// Get taskId: parseInt(card.dataset.id)
// Find the task in tasks using find.
//
// IF complete button clicked:
//   - Update task.status = "done" in the array
//   - Call saveTasks()
//   - Call renderBoard()
//
// IF remove button clicked:
//   - Remove from tasks: tasks.splice(tasks.findIndex(...), 1)
//   - Call saveTasks()
//   - Call renderBoard()
//
// Wire it up to document.querySelector(".board")

function handleBoardClick(event) {
const card = event.target.closest(".task-card")

if (!card) {
  return;
}

const taskId = parseInt(card.dataset.id);

const task = tasks.find(task => task.id === taskId);

if (event.target.classList.contains("complete-btn")) {
  
  if (!task){
    return;
  }

  task.status = "done";
  saveTasks();
  renderBoard();
}

if(event.target.classList.contains("remove-btn")){
const index = tasks.findIndex(task => task.id === taskId);
if (index !== -1){
  tasks.splice(index, 1);
}
saveTasks()
renderBoard()
  
}
}




document.querySelector(".board").addEventListener("click", handleBoardClick);



// ----------------------------------------------------------
// TASK 7 — handleClearAll
// ----------------------------------------------------------
// Declare a function called handleClearAll.
//
// Inside:
//   1. Confirm the user wants to clear:
//      if (!confirm("Clear all tasks? This cannot be undone.")) return;
//   2. Clear localStorage: localStorage.removeItem("taskBoardData")
//   3. Reset tasks: tasks = [...defaultTasks]
//   4. Call saveTasks() to save the defaults
//   5. Call renderBoard()
//
// Wire it up:
//   document.getElementById("clear-btn")
//     .addEventListener("click", handleClearAll)

function handleClearAll() {
  
  if(!confirm("Clear all tasks? This cannot be undone.")){
    return;
  }

  localStorage.removeItem("taskBoardData");
  tasks = [...defaultTasks];

  saveTasks();
  renderBoard();
  
}

document.getElementById("clear-btn").addEventListener("click", handleClearAll);

// ----------------------------------------------------------
// TASK 8 — init
// ----------------------------------------------------------
// Declare a function called init.
// Inside:
//   1. Call loadTasks()    ← loads from localStorage or defaults
//   2. Call renderBoard()  ← renders whatever loadTasks set up
//
// Call init() at the bottom.

function init() {
loadTasks();
renderBoard();
}

// ----------------------------------------------------------
// ⭐ STRETCH GOAL — persist filter preference
// ----------------------------------------------------------
// The board currently loses the active filter on refresh.
// Add persistence for the current filter setting.
//
// Declare a function called saveFilter.
// Parameter: filterValue (string)
// Saves: localStorage.setItem("taskFilter", filterValue)
//
// Declare a function called loadFilter.
// Returns the saved filter or "all" as default:
//   return localStorage.getItem("taskFilter") || "all"
//
// In your filter click handler:
//   - After applying the filter, call saveFilter(filterValue)
//
// In init():
//   - After renderBoard(), call:
//       const savedFilter = loadFilter()
//       Apply the saved filter (update active button + show/hide cards)
//
// Write a comment: what other UI state might be worth persisting?

// ============================================================
// START
// ============================================================
init();
