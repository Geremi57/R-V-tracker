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
window.addEventListener("load", () => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      console.log("Notification permission:", permission);
    });
  }
});
function showNotification(title) {
  if (Notification.permission === "granted") {
    new Notification("⏰ Deadline Reached!", {
      body: `Task: ${title}`,
      icon: "⏰",
    });
  }
}

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

    if (diff <= 0) {
      showNotification(task.title);
      //   deadlineEl.textContent = "⏰ Deadline reached!";
      //   clearInterval(interval);
      //   return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    deadlineEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
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
      // t.renderTask(work);
      const el = t.renderTask(work);

      if (el.workoutEl) el.dataset.id = work.id;

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


 function openInMaps(lat, lon) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
  window.open(url, "_blank");
}


async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  return data.display_name || "Unknown location";
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
    this.data = data;
    this.time = time || document.querySelector(".form__input").value;

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

    this.workoutEl = "";
  }

  countDown(date) {
    const nowDay = Math.ceil(new Date().getTime() / (3600000 * 24));
    return date - nowDay;
  }
  // determineDate() {}
  _parentElement = document.querySelector(".class");
  _upload = document.querySelector(".save-note-btn");

  renderTask(data, pos) {
    const id = data && data.id ? data.id : `${Date.now()}`;
    const html = `<div class="workout" data-id="${id}">
<!-- From Uiverse.io by PriyanshuGupta28 --> 
<label id="checkbox">
    <input type="checkbox" class="input">
    <span class="custom-checkbox"></span>
  </label><h4 class = "data" >${
    this.data.length > 21 ? this.data.slice(0, 21) + "..." : this.data
  }</h4>
        
        </div>`;
    // console.log(remDays);
    this._parentElement.insertAdjacentHTML("afterend", html);

    const addedWorkout = this._parentElement.nextElementSibling;
    const checkbox = addedWorkout.querySelectorAll("#checkbox");

    checkbox.forEach((check) =>
      check.addEventListener("change", function (e) {
        const workoutEl = e.target.closest(".workout");
        const workoutId = workoutEl.dataset.id;
        document.querySelector(".taskAbout").classList.add("hidden");
        workoutEl.classList.add("slide-out");
        setTimeout(() => {
          workoutEl.remove();

          const index = workouts.findIndex((work) => work.id === workoutId);
          if (index !== -1) workouts.splice(index, 1);

          saveWorkoutsToLocalStorage();
        }, 1000);
      })
    );
    return addedWorkout;
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
    console.log(this.timeLeft);
  }

  addHandlerUpload() {
    const title = document.querySelector(".titleTask").value.trim();
    const timeStr = document.querySelector(".form__input").value;
    const note = document.querySelector(".task-note").value.trim();
    const location = document.querySelector(".locationText").value.trim();

    if (!title || !timeStr) return;


      let coords = null;
  try {
    const stored = localStorage.getItem("currentRVLocation");
    if (stored) {
      const parsed = JSON.parse(stored);
      // if the stored item is an object with lat/lon
      if (parsed && parsed.lat && parsed.lon) {
        coords = { lat: parsed.lat, lon: parsed.lon };
      }
    }
  } catch (err) {
    console.warn("Failed to parse currentRVLocation", err);
  }

    const deadlineTS = new Date(timeStr).getTime();
    const duplicate = workouts.some(
      (w) => w.title === title && w.timeRem === deadlineTS
    );
    console.log(location)

    if (duplicate) return;

    workouts.unshift({
      id: `${Date.now()}`,
      location,
      title,
      note,
      time: timeStr,
      timeRem: deadlineTS,
    });

    saveWorkoutsToLocalStorage();
    renderAllWorkouts();

    localStorage.removeItem("currentRVLocation");
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
    console.log(closeWorkout);
    console.log(document.querySelector(".locationText").value.trim())
    if (task) {
      this.addTaskModal(task);
    } else {
    }

    console.log(workouts)

    // console.log(task.title);
    this.addTaskModal(task);
  }
  addTaskModal(task) {
    const modalTitle = document.querySelector(".modalTitle");
    const addANote = document.querySelector(".addANote");
    const deadline = document.querySelector(".Deadline");
    const location = document.querySelector(".location");
    const navigate = document.querySelector(".navigate");

    modalTitle.textContent = task.title;
    addANote.textContent = task.note;
    location.textContent = shortenAddress(task.location)


    if (navigate) {
    navigate.replaceWith(navigate.cloneNode(true)); // quick way to remove previous listeners
  }
  const newNavigate = document.querySelector(".navigate");

  // If coords exist on the task, enable the navigation button
  if (task.coords && task.coords.lat && task.coords.lon) {
    // show button (if hidden) and attach handler
    newNavigate.classList.remove("hidden");
    newNavigate.disabled = false;
    newNavigate.onclick = () =>
      openInMaps(task.coords.lat, task.coords.lon);
  } else {
    // no coords — either hide the button or make it open Google Maps search with the readable location
    newNavigate.classList.remove("hidden"); // optional: show a fallback behavior
    newNavigate.disabled = false;
    // fallback: if we have a readable address, open maps search; otherwise disable
    if (task.location && task.location.trim().length > 0) {
      newNavigate.onclick = () =>
        window.open(
          `https://www.google.com/maps/dir/?api=1&query=${encodeURIComponent(
            task.location
          )}`,
          "_blank"
        );
    } else {
      newNavigate.disabled = true;
      newNavigate.classList.add("disabled");
      newNavigate.onclick = null;
    }
  }

  function shortenAddress(fullAddress) {
  return fullAddress.split(",")[0].trim();
}

// Example:
const short = shortenAddress("Njugu Lane, City Centre sublocation, Starehe location...");
console.log(short); // → "Njugu Lane"



    console.log(task.location)
    // deadline.textContent = task.time;

    if (this._intervalId) clearInterval(this._intervalId);

    setTimeout(() => {
      // const countdownDisplay = document.querySelector(".deadline");
      if (!deadline) {
        console.warn("Countdown element not found in DOM.");
        return;
      }

      if (this._intervalId) clearInterval(this._intervalId);

      const updateCountdown = () => {
        const now = Date.now();
        const diff = task.timeRem - now;

        if (diff <= 0) {
          deadline.textContent = "⏰ Deadline reached!";
          showNotification(task.title);
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

 
  document.querySelector(".modal").classList.remove("hidden");
  e.preventDefault();
  // console.log(inputTask.value);
});
window.addEventListener("DOMContentLoaded", function () {
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
document.querySelectorAll(".closeTask").forEach((el) =>
  el.addEventListener("click", function () {
    closeViewTask();
    closeAddTask();
    // document.querySelector(".taskAbout").classList.add("hidden");
  })
);

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
    closeAddTask()
    // document.querySelector(".modal").classList.add("hidden");
    // const one = new task(
    //   titleTask.value,
    //   document.querySelector(".form__input").value
    // );
    // one.renderTask(one);
    // const main = document.querySelector(".main");
    // one.renderModal(main);

    // console.log(main.querySelector(".workout"));
    // console.log(one.workoutEl);
    // // let id = null;
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

// const dataRen = new Modal();
// localStorage.clear();
function closeAddTask() {
   const title = document.querySelector(".titleTask").value.trim();
    const timeStr = document.querySelector(".form__input").value;
  // const duration = document.querySelector(".form_input--duration")
  // if(title === empty || timeStr === empty){
    // console.log("gotchaa")
    // console.log(duration)
    document.querySelector(".modal").classList.add("hidden");
  // }else{
    console.log(timeStr)
    console.log(title)
    console.log("damn")
    // document.querySelector(".modal").classList.remove("hidden");
  // }
}
function closeViewTask() {
  document.querySelector(".taskAbout").classList.add("hidden");
}
document.querySelector(".close-modal").addEventListener("click", function () {
  // document.querySelector(".modal").classList.add("hidden");
  // closeViewTask();
  // closeAddTask();
});
document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape") {
    closeAddTask();
    closeViewTask();
  }
});
document.querySelector(".taskAbout").addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    closeViewTask();
  }
});

document.querySelector(".modal").addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    closeAddTask();
  }
});
document.querySelector(".useLocation").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    const locationName = await reverseGeocode(latitude, longitude);

    const navigate = document.querySelector(".navigate");
    navigate.addEventListener("click",function() {
      openInMaps(latitude, longitude)
      console.log("yaaaaaah")
    });

    document.querySelector(".locationText").value = locationName;

    localStorage.setItem(
      "currentRVLocation",
      JSON.stringify({ lat: latitude, lon: longitude, address: locationName })
    );

    alert("Location set!");
  });
});

// getCurrentPosition()


document.addEventListener("click", function (e) {
  console.log(e.target.classList);
});
console.log(document.querySelector(".modal").classList.contains("hidden"));
const date = new Date();
