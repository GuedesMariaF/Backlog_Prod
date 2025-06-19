document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.querySelector(".fa-home").closest("button");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const videoPlayer = document.getElementById("videoPlayer");
  
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
  
    const nextBtn = document.querySelector(".fa-step-forward").closest("button");
    nextBtn.addEventListener("click", function () {
      window.location.href = "../questions/index.html";
    });
  
    const prevBtn = document.querySelector(".fa-step-backward").closest("button");
    prevBtn.addEventListener("click", function () {
        window.location.href = "../player/index.html";
    
    });
  
    videoPlayer.addEventListener("ended", function () {
      window.location.href = "../questions/index.html";
    });
  });