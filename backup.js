const inputTask = document.querySelector(".newTask");
const submitTask = document.querySelector(".add");
const closeModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const titleTask = document.querySelector(".titleTask");
// const time = document.querySelector(".form__input").value;
// console.log(this);
const workouts = [];
const arrDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const arrMonths = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
function saveWorkoutsToLocalStorage() {
  localStorage.setItem("workouts", JSON.stringify(workouts));
}

function loadWorkoutsFromLocalStorage() {
  const data = localStorage.getItem("workouts");
  return data ? JSON.parse(data) : [];
}
function startCountdown(id, timestamp) {
  const deadlineEl = document.getElementById(`deadline-${id}`);
  if (!deadlineEl) {
    console.warn("Missing element for countdown:", `deadline-${id}`);
    return;
  }

  function update() {
    const now = Date.now();
    const diff = timestamp - now;

    if (isNaN(diff)) {
      deadlineEl.textContent = "Invalid date";
      clearInterval(interval);
      return;
    }

    // if (diff <= 0) {
    //   deadlineEl.textContent = "⏰ Deadline reached!";
    //   clearInterval(interval);
    //   return;
    // }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    deadlineEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update(); // initial call
  const interval = setInterval(update, 1000);
}
function renderAllWorkouts() {
  const classParent = document.querySelector(".class");
  // console.log(main.childNodes);
  classParent.innerHTML = "";
  // document.querySelector(".workout").remove();
  workouts
    .slice()
    .reverse()
    .forEach((work) => {
      const t = new task(work.title, work.time);
      t.renderTask(work);

      t.workoutEl =
        document.querySelectorAll(".workout")[
          document.querySelectorAll(".workout").length - 1
        ];
      if (t.workoutEl) {
        t.workoutEl.dataset.id = work.id;
      }
      startCountdown(work.id, work.timeRem);
    });
}

function handleCheckboxChange(event) {
  const checkbox = event.target;
  const workoutEl = checkbox.closest(".workout");
  if (!workoutEl) return;

  const workoutId = workoutEl.dataset.id;

  workoutEl.remove();

  const index = workouts.findIndex((work) => work.id === workoutId);
  if (index !== -1) {
    workouts.splice(index, 1);
  }

  saveWorkoutsToLocalStorage();
}

class task {
  day;
  // remDays;
  month;
  // date
  standard = 1000 * 60 * 60;
  // _data;
  // date;
  timeLeft;
  time = document.querySelector(".form__input").value;
  nowDay = new Date().getTime() / this.standard;
  year = +this.time.slice(0, 4);
  month = +this.time.slice(5, 7);
  // date = +this.time.slice(8, 10);
  hour = +this.time.slice(11, 13);
  date = +this.time.slice(8, 10);
  remDays = this.realDate - 30 - this.nowDay;
  workoutEl = "";
  constructor(data, time = null) {
    //subtracting one because months are zero based meaning january is 0
    this.data = data;
    this.time = time || document.querySelector(".form__input").value; // fallback only if no time passed

    // if (!this.time || this.time.length < 16) {
    //   console.warn("Invalid or missing time input. Using default deadline.");
    //   this.timeLeft = "No deadline set";
    //   return;
    // }

    this.standard = 1000 * 60 * 60;

    this.year = +this.time.slice(0, 4);
    this.month = +this.time.slice(5, 7);
    this.date = +this.time.slice(8, 10);
    this.hour = +this.time.slice(11, 13);

    this.nowDay = new Date().getTime() / this.standard;

    const realDate =
      new Date(this.year, this.month - 1, this.date, this.hour).getTime() /
      this.standard;

    const daysLeft = ((realDate - this.nowDay) / 24).toFixed(5);
    const hoursLeft = (+`0.${daysLeft.slice(-5)}` * 24).toFixed(5);
    const minutesLeft = (+`0.${hoursLeft.slice(-5)}` * 60).toFixed(0);

    this.timeLeft = `${
      +daysLeft >= 1 ? Math.floor(+daysLeft) + "days" : ""
    } ${Math.floor(+hoursLeft)}hour(s) ${Math.floor(+minutesLeft)}minutes`;

    // you can keep this:
    this.workoutEl = "";
  }

  // console.log(Math.floor(daysLeft() / 24));
  // console.log(`${daysLeft}`.slice(0, 1));
  // console.log(`${daysLeft}`.slice(-2) / 100);
  // console.log(Math.ceil(daysLeft), minutesLeft + 2);
  // console.log(this.date);
  // console.log(
  //   new Date(this.year, this.month - 1, this.date, this.hour).getTime() /
  //     this.standard -
  //     this.nowDay
  // );

  // console.log(this.year, this.month, this.date, this.hour);
  // console.log(this.nowDay);
  // console.log(this.standard);
  // // console.log(this.realDate);
  // this.data = data;
  // // console.log(remDays);
  // let accMonth = arrMonths.filter(
  //   (mon, count) =>
  //     count === new Date(this.year, this.month, this.date, 12).getMonth()
  // );

  // this.day = arrDays.filter(
  //   (day, count) =>
  //     count === new Date(this.year, this.month, this.date - 2, 12).getDay()
  // );
  // // this.date = `${this.day}-${date}-${accMonth}-${year}`;
  // // console.log(
  // //   ...arrMonths.filter(
  // //     (mon, count) => count === new Date(year, month, date, 12).getMonth()
  // //   )
  // // );
  // console.log(+`${new Date()}`.slice(8, 10));
  // console.log(this.time);
  // console.log(realDate);
  // document
  //   .querySelector(".save-note-btn")
  //   .addEventListener("click", this._renderModal.bind(this));
  // this.data = data;
  // this.renderTask();

  countDown(date) {
    const nowDay = Math.ceil(new Date().getTime() / (3600000 * 24));
    console.log(nowDay);

    return date - nowDay;
    console.log(3600000 * 24);
    console.log(daysLeft);
    // if (monthThen > monthNow) {
    //   let monLeft = monthThen - monthNow;
    //   daysLeft = daysLeft * monLeft;
    // }
  }
  // determineDate() {}
  _parentElement = document.querySelector(".class");
  _upload = document.querySelector(".save-note-btn");

  renderTask(data, pos) {
    const id = data && data.id ? data.id : `${Date.now()}`;
    const html = `<div class="workout" data-id="${id}">
      <!-- From Uiverse.io by boryanakrasteva -->
      <label class="checkbox-btn">
      <label for="checkbox"></label>
      <input id="checkbox" type="checkbox" />
      <span class="checkmark"></span>
      </label>
      <h4 class = "data" >${
        this.data.length > 21 ? this.data.slice(0, 21) + "..." : this.data
      }</h4>
        
        </div>`;
    // console.log(remDays);
    console.log(html);
    this._parentElement.insertAdjacentHTML("afterend", html);

    const addedWorkout = this._parentElement.nextElementSibling;
    const checkbox = addedWorkout.querySelectorAll("#checkbox");

    checkbox.forEach((check) =>
      check.addEventListener("change", function (e) {
        const workoutEl = e.target.closest(".workout");
        const workoutId = workoutEl.dataset.id;

        workoutEl.classList.add("slide-out");
        setTimeout(() => {
          workoutEl.remove();

          const index = workouts.findIndex((work) => work.id === workoutId);
          if (index !== -1) workouts.splice(index, 1);

          saveWorkoutsToLocalStorage();
        }, 2000);
      })
    );
  }

  renderModal(e) {
    this.workoutEl = e.querySelectorAll(".workout");
    if (!this.workoutEl) return;

    // const workout = workouts.find((work) => work.id === work.dataset.id);
  }
  uploadTask(handler) {
    this._upload.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
class Modal extends task {
  _parentElement = document.querySelector(".modal");
  _intervalId = null;
  constructor(data, modal) {
    super(data);
    // this._renderModal.bind(this);
    // this.addHandlerUpload();
    console.log(workouts);
    console.log(this.timeLeft);
  }

  //fix needed here
  addHandlerUpload() {
    const title = document.querySelector(".titleTask").value.trim();
    const timeStr = document.querySelector(".form__input").value;
    const note = document.querySelector(".task-note").value.trim();

    if (!title || !timeStr) return; // no empty tasks

    const deadlineTS = new Date(timeStr).getTime();
    const duplicate = workouts.some(
      (w) => w.title === title && w.timeRem === deadlineTS
    );

    if (duplicate) return; // stop duplicates

    workouts.unshift({
      id: `${Date.now()}`,
      title,
      note,
      time: timeStr,
      timeRem: deadlineTS,
    });

    saveWorkoutsToLocalStorage();
    renderAllWorkouts(); // re‑render list once
  }

  renderModal(data) {
    const html = `<div> <p>${data}</p> </div>`;
    this._parentElement.insertAdjacentHTML(html, "afterbegin");
  }

  addHandlerClick(e) {
    const workout = document.querySelector(".workout");
    // console.log(e.target.classList());
    const closeWorkout = e.target.closest(".workout");
    if (!closeWorkout) return;
    const task = workouts.find((work) => work.id === closeWorkout.dataset.id);
    if (task) {
      console.log(task.title);
      this.addTaskModal(task);
    } else {
      console.warn(
        "No matching workout found for id:",
        closeWorkout.dataset.id
      );
    }

    console.log(task.title);
    this.addTaskModal(task);
  }
  addTaskModal(task) {
    const modalTitle = document.querySelector(".modalTitle");
    const addANote = document.querySelector(".addANote");
    const deadline = document.querySelector(".Deadline");
    // const countdownDisplay = document.getElementById("liveCountdown");

    modalTitle.textContent = task.title;
    addANote.textContent = task.note;
    // deadline.textContent = task.time;

    if (this._intervalId) clearInterval(this._intervalId);

    setTimeout(() => {
      // const countdownDisplay = document.querySelector(".deadline");
      if (!deadline) {
        console.warn("Countdown element not found in DOM.");
        return;
      }

      // Clear any previous countdown to avoid multiple intervals
      if (this._intervalId) clearInterval(this._intervalId);

      const updateCountdown = () => {
        const now = Date.now();
        const diff = task.timeRem - now;

        if (diff <= 0) {
          deadline.textContent = "⏰ Deadline reached!";
          clearInterval(this._intervalId);
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        deadline.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      };

      updateCountdown();
      this._intervalId = setInterval(updateCountdown, 1000);
    }, 50);
  }
}

const checkbox = document.querySelectorAll(".checkbox");
// setTimeout(console.log(checkbox), 1000);
const dataRen = new Modal();
submitTask.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(inputTask.value);
  document.querySelector(".modal").classList.remove("hidden");
});
window.addEventListener("DOMContentLoaded", function () {
  // Load workouts from local storage

  const loaded = loadWorkoutsFromLocalStorage();
  if (loaded.length > 0) {
    workouts.length = 0; // Clear current array
    loaded.forEach((w) => workouts.push(w));
    renderAllWorkouts();
    console.log(workouts);
    // const one = new task(titleTask.value);
    // one.renderTask(one);
    // const main = document.querySelector(".main");
    // one.renderModal(main);
    // console.log(one);

    // if (one.workoutEl && one.workoutEl.length > 0) {
    //   [...one.workoutEl].forEach((working, count) => {
    //     console.log(working.dataset.id);
    //     if (workouts[count]) {
    //       workouts[count].id = working.dataset.id;
    //     }
    //   });
    // } else {
    //   console.warn("workoutEl not found, cannot assign id.");
    // }
    // const dataRen = new Modal();
    document.querySelectorAll(".workout").forEach((work) => {
      if (!work) return;
      work.addEventListener("click", function (e) {
        console.log(work.id);
        document.querySelector(".taskAbout").classList.remove("hidden");
        dataRen.addHandlerClick(e);
      });
    });
  }
});
document.querySelector(".closeTask").addEventListener("click", function () {
  document.querySelector(".taskAbout").classList.add("hidden");
});

document
  .querySelector(".save-note-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    dataRen.addHandlerUpload();
    console.log(workouts);
    // if (workouts[0].title === "") {
    //   // document.querySelector(".warning").classList.remove("hidden");
    //   // document.querySelector(".modal").classlist.remove("hidden");
    // } else if (workouts[0].title !== "") {
    // dataRen.upload();
    document.querySelector(".warning").classList.add("hidden");

    document.querySelector(".modal").classList.add("hidden");
    const one = new task(
      titleTask.value,
      document.querySelector(".form__input").value
    );
    one.renderTask(one);
    const main = document.querySelector(".main");
    one.renderModal(main);

    console.log(main.querySelector(".workout"));
    console.log(one.workoutEl);
    // let id = null;
    if (one.workoutEl && one.workoutEl.length > 0) {
      [...one.workoutEl].forEach((working, count) => {
        console.log(working.dataset.id);
        if (workouts[count]) {
          workouts[count].id = working.dataset.id;
        }
      });
    } else {
      console.warn("workoutEl not found, cannot assign id.");
    }
    console.log(new Date().getTime());
    location.reload();

    document.querySelectorAll(".workout").forEach((work) => {
      if (!work) return;
      work.addEventListener("click", function (e) {
        console.log(work.id);
        const dataRen = new Modal();
        dataRen.addHandlerClick(e);
      });
    });
    console.log(workouts);
    // console.log([...document.querySelectorAll(".workout")]);
  });

// Define dataRen before using it in the event listener
// const dataRen = new Modal();
console.log(document.querySelectorAll(".workout"));
// localStorage.clear();

closeModal.addEventListener("click", function () {
  document.querySelector(".modal").classList.add("hidden");
});
document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape") {
    document.querySelector(".modal").classList.add("hidden");
  }
});
const date = new Date();
console.log(date);
console.log(`${date}`.slice(0, 15));
