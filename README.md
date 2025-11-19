# 📝 Task Manager App

A responsive, interactive task management application built with vanilla JavaScript, HTML, and CSS. The app allows users to add, view, and manage tasks with deadlines. It includes live countdowns, localStorage persistence, modals for adding and viewing task details, and elegant UI/UX interactions.

---

## 🚀 Live Features

### ✅ Core Features

- **Add New Task**
  - Input title, description (note), and deadline via modal.
  - Validation ensures title and time are required.

- **View Task Details**
  - Click on a task to open a modal showing:
    - Task title
    - Description
    - Countdown to deadline

- **Countdown Timer**
  - Real-time countdown per task (days, hours, minutes, seconds).
  - Updates every second.

- **Mark as Completed**
  - Check off a task to remove it from the list with a smooth slide-out animation.

- **Local Storage Persistence**
  - Tasks remain saved even after refreshing or reopening the browser.

- **Responsive Design**
  - Fully mobile-friendly layout.
  - Touch-optimized interactions and modal sizing for small screens.

- **Form Validation and Feedback**
  - Required fields show warnings if left empty.
  - Modals close on Escape key or overlay click.

---

## 🧠 Programming Paradigms & Patterns

### 💡 Object-Oriented Programming (OOP)
- The app uses classes to encapsulate logic:
  - `Task`: Handles individual task data, parsing time, rendering, and countdown logic.
  - `Modal`: Inherits from `Task`, handles uploading new tasks and rendering modals.

### 📦 Modular Design
- All logic is encapsulated within classes and clean functions.
- Event listeners are organized by feature and bound properly.

### 🧼 Declarative & Imperative Mix
- Declarative: Uses `.innerHTML` and template strings to build the DOM in a readable way.
- Imperative: DOM events and countdown logic are handled step-by-step (setInterval, classList manipulations, etc.)

### ♻️ DRY Principles
- Task rendering and event bindings are abstracted to avoid repetition.
- Countdown logic is reused for both inline and modal displays.

---

## 🛠️ Technologies Used

| Tech           | Purpose                         |
|----------------|----------------------------------|
| HTML5          | Semantic structure              |
| CSS3           | Styling and responsive design   |
| JavaScript (ES6+) | Application logic, DOM, OOP |
| Local Storage  | Persistent data storage         |
| Font Awesome   | Icons and visual feedback       |

---

## 📱 Responsive Design

The UI adapts gracefully to different screen sizes:

- Modals scale based on viewport width/height.
- Inputs and buttons are touch-friendly.
- On smaller screens:
  - Task notes resize vertically.
  - Modal content and buttons realign automatically.

---

## 📦 Setup & Usage

1. **Clone the Repo**
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
