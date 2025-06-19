document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.querySelector(".fa-home")?.closest("button");
  
    if (homeBtn) {
      homeBtn.addEventListener("click", function () {
        window.location.href = "../../index.html";
      });
    }
  
    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
      startBtn.addEventListener("click", function () {
        window.location.href = "../index.html";
      });
    }
  });
  