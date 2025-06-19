document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.querySelector(".fa-home").closest("button");
    homeBtn.addEventListener("click", function () {
      window.location.href = "../../index.html";
    });
  
    fullscreenBtn.addEventListener("click", function () {
      if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch((err) => {
          console.error(`Erro ao tentar entrar em tela cheia: ${err.message}`);
  
          document.documentElement.requestFullscreen();
        });
      } else {
        document.exitFullscreen();
      }
    });
  
    const nextBtn = document.querySelector(".fa-step-backward").closest("button");
    nextBtn.addEventListener("click", function () {});
  
    const prevBtn = document.querySelector(".fa-step-backward").closest("button");
    prevBtn.addEventListener("click", function () {
      window.location.href = "../index.html";
    });
  
    
    const options = document.querySelectorAll(".option");
    const modal = document.getElementById("feedbackModal");
    const closeModal = document.getElementById("closeModal");
  
    options.forEach((option) => {
      option.addEventListener("click", () => {
        modal.classList.remove("hidden");
      });
    });
  
    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  });
  