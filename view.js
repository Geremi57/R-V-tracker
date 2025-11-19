class task {
  constructor() {}
  _parentElement = document.querySelector(".class");
  _upload = document.querySelector(".add");
  renderTask(data) {
    const html = `<div class="workout">
          <!-- From Uiverse.io by boryanakrasteva -->
          <label class="checkbox-btn">
            <label for="checkbox"></label>
            <input id="checkbox" type="checkbox" />
            <span class="checkmark"></span>
          </label>
          <h4>${data.inputTask}</h4>
          <p>${data.date}</p>
        </div>`;
    return this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  uploadTask(handler) {
    this._upload.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new task();
