document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const celebration = document.getElementById('celebration');
    const closeCelebration = document.getElementById('close-celebration');
    
    let runCount = 0;
    const maxRunCount = 15;
    const messages = [
        "Не в этот раз",
        "Прекрати, что ты делаешь?",
        "Серьёзно, хватит!",
        "Я не шучу!",
        "Ты меня бесишь!",
        "Последнее предупреждение!",
        "Ну всё, ты пожалеешь!",
        "Ладно, ты победила...",
        "Нажми на 'Да' уже!"
    ];

    yesBtn.addEventListener('click', function() {
        celebration.classList.remove('hidden');
        createConfetti();
        sendResponse(true);
    });

    noBtn.addEventListener('mouseover', function() {
        if (runCount >= maxRunCount) return;
        
        const btn = this;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const btnRect = btn.getBoundingClientRect();
        
        const padding = 50;
        const maxX = windowWidth - btnRect.width - padding;
        const maxY = windowHeight - btnRect.height - padding;
        
        let randomX = Math.floor(Math.random() * maxX) + padding/2;
        let randomY = Math.floor(Math.random() * maxY) + padding/2;
        
        btn.style.position = 'fixed';
        btn.style.left = randomX + 'px';
        btn.style.top = randomY + 'px';
        
        // Меняем текст при наведении
        if (runCount < messages.length) {
            btn.textContent = messages[runCount];
        }
        
        runCount++;
        
        if (runCount >= maxRunCount) {
            btn.textContent = "Ок, нажми меня";
            btn.style.position = 'static';
            btn.style.left = 'auto';
            btn.style.top = 'auto';
        }
    });

    noBtn.addEventListener('click', function() {
        if (runCount >= maxRunCount) {
            sendResponse(false);
            alert("Ты всё равно не смогла отказаться по-настоящему!");
        }
    });

    closeCelebration.addEventListener('click', function() {
        celebration.classList.add('hidden');
    });

    function createConfetti() {
        const colors = ['#e75480', '#ffcc00', '#00ccff', '#ff00cc', '#00ff66'];
        const celebrationDiv = document.getElementById('celebration');
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -10 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 12 + 3 + 'px';
            confetti.style.height = Math.random() * 12 + 3 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 1 + 's';
            
            celebrationDiv.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 6000);
        }
    }

    function sendResponse(answer) {
        const response = {
            answer: answer ? "Да" : "Нет",
            timestamp: new Date().toLocaleString(),
            page: window.location.href
        };
        
        console.log("Ответ:", response);
        localStorage.setItem('lastResponse', JSON.stringify(response));
    }
});