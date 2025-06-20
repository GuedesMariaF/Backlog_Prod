document.addEventListener('DOMContentLoaded', function() {
    let currentScreen = 0;
    const screens = document.querySelectorAll('.screen');
    const homeBtn = document.getElementById('homeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const navCenter = document.querySelector('.nav-center');
    const mainVideo = document.getElementById('mainVideo');
    const options = document.querySelectorAll('#screen-2 .option');
    const backButton = document.querySelector('.back-button');

  
    if (mainVideo) {
        mainVideo.addEventListener('ended', function() {
            nextScreen();
        });
        startVideo();
    }


    if (options.length > 0) {
        options.forEach(option => {
            option.addEventListener('click', function() {
                handleOptionClick(this);
            });
        });
    }

    
    if (backButton) {
        backButton.addEventListener('click', function() {
            showScreen(1); 
        });
    }

    function handleOptionClick(clickedOption) {
      
        options.forEach(opt => {
            opt.classList.remove('selected', 'correct');
        });
        
    
        clickedOption.classList.add('selected');
        
     
        if (clickedOption.dataset.correct === 'true') {
            clickedOption.classList.add('correct');
        }
        

        setTimeout(() => {
            nextScreen();
        }, 1000);
    }

    function startVideo() {
        if (mainVideo) {
            const playPromise = mainVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    mainVideo.controls = true;
                    console.log('Autoplay bloqueado:', error);
                });
            }
        }
    }

    function showScreen(index) {
        if (index < 0 || index >= screens.length) return;
        
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        screens[index].classList.add('active');
        currentScreen = index;
        
        updateButtonStates();
        
        const fullscreenBtn = document.querySelector('.fullscreen-button');
        if (fullscreenBtn) {
            fullscreenBtn.style.display = index === 0 ? 'flex' : 'none';
        }
    }

    function updateButtonStates() {
        const fullscreenBtn = document.querySelector('.fullscreen-button');
        if (fullscreenBtn) {
            fullscreenBtn.classList.toggle('inactive', currentScreen !== 0);
        }
      
        if (prevBtn) {
            prevBtn.disabled = currentScreen === 0;
            prevBtn.style.opacity = currentScreen === 0 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentScreen === screens.length - 1;
            nextBtn.style.opacity = currentScreen === screens.length - 1 ? '0.5' : '1';
        }
    }

    function nextScreen() {
        if (currentScreen < screens.length - 1) {
            showScreen(currentScreen + 1);
        }
    }

    function prevScreen() {
        if (currentScreen > 0) {
            showScreen(currentScreen - 1);
        }
    }

    function goHome() {
        window.location.href = "../../index.html";
    }

    function toggleFullscreen() {
        if (currentScreen !== 0) return;
        const videoContainer = document.getElementById('videoContainer');
        const videoElement = document.getElementById('mainVideo');
        
        if (!document.fullscreenElement) {
            if (videoContainer?.requestFullscreen) {
                videoContainer.requestFullscreen().catch(err => {
                    console.error('Erro ao tentar tela cheia:', err);
                    videoElement?.requestFullscreen()?.catch(err => {
                        console.error('Fallback também falhou:', err);
                    });
                });
            } else if (videoElement?.requestFullscreen) {
                videoElement.requestFullscreen().catch(err => {
                    console.error('Erro ao tentar tela cheia no vídeo:', err);
                });
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
   

    homeBtn?.addEventListener('click', goHome);
    prevBtn?.addEventListener('click', prevScreen);
    nextBtn?.addEventListener('click', nextScreen);
    navCenter?.addEventListener('click', toggleFullscreen);

    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                prevScreen();
                break;
            case 'ArrowRight':
                nextScreen();
                break;
            case 'Home':
                goHome();
                break;
        }
    });

 
    showScreen(0);
});