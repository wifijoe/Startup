function login() {
    const nameEl = document.querySelector("#user-name");
    localStorage.setItem("username", nameEl.value);
    window.location.href = "Home.html";
  }