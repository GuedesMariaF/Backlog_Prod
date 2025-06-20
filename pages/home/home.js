document.addEventListener('DOMContentLoaded', function() {
    let currentScreen = 0;
    const screens = document.querySelectorAll('.screen');
    const homeBtn = document.getElementById('homeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const navCenter = document.querySelector('.nav-center');
    const mainVideo = document.getElementById('mainVideo');

    // Adiciona o listener para o evento 'ended' do vídeo
    if (mainVideo) {
        mainVideo.addEventListener('ended', function() {
            nextScreen();
        });
        
        // Opcional: Remove os controles padrão se quiser controles customizados
        // mainVideo.removeAttribute('controls');
    }

    function showScreen(index) {
        if (index < 0 || index >= screens.length) return;
        
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        screens[index].classList.add('active');
        currentScreen = index;
        
        updateButtonStates();
    }

    function updateButtonStates() {
        const fullscreenBtn = document.querySelector('.fullscreen-button');
        if (currentScreen === 0) {
            fullscreenBtn.classList.remove('inactive');
        } else {
            fullscreenBtn.classList.add('inactive');
        }
      
        if (currentScreen === 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.5';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '1';
        }
        
        if (currentScreen === screens.length - 1) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.5';
        } else {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
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
        window.location.href = "../../../index.html";
    }

    function toggleFullscreen() {
        if (currentScreen !== 0) return;
        const videoContainer = document.getElementById('videoContainer');
        const videoElement = document.getElementById('mainVideo');
        
        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen().catch(err => {
                    console.error('Erro ao tentar tela cheia:', err);
                    videoElement.requestFullscreen().catch(err => {
                        console.error('Fallback também falhou:', err);
                    });
                });
            } else if (videoElement.requestFullscreen) {
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
   
    homeBtn.addEventListener('click', goHome);
    prevBtn.addEventListener('click', prevScreen);
    nextBtn.addEventListener('click', nextScreen);
    navCenter.addEventListener('click', toggleFullscreen);

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