document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const celebration = document.getElementById('celebration');
    const closeCelebration = document.getElementById('close-celebration');
    
    let runCount = 0;
    const maxRunCount = 10;

    yesBtn.addEventListener('click', function() {
        celebration.classList.remove('hidden');
        createConfetti();
        sendResponse(true);
    });

    noBtn.addEventListener('mouseover', function() {
        if (runCount >= maxRunCount) return;
        
        const btn = this;
        const container = btn.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        
        const padding = 20;
        const maxX = containerRect.width - btnRect.width - padding;
        const maxY = containerRect.height - btnRect.height - padding;
        
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * maxX) + padding/2;
            randomY = Math.floor(Math.random() * maxY) + padding/2;
        } while (
            Math.abs(randomX - parseInt(btn.style.left || 0)) < btnRect.width || 
            Math.abs(randomY - parseInt(btn.style.top || 0)) < btnRect.height
        );
        
        btn.style.position = 'absolute';
        btn.style.left = randomX + 'px';
        btn.style.top = randomY + 'px';
        
        runCount++;
        
        if (runCount === maxRunCount - 2) {
            btn.textContent = "Я серьезно, не нажимай!";
        } else if (runCount >= maxRunCount) {
            btn.textContent = "Ладно, попробуй...";
            btn.style.position = 'static';
            btn.style.left = 'auto';
            btn.style.top = 'auto';
        }
    });

    noBtn.addEventListener('click', function() {
        if (runCount >= maxRunCount) {
            sendResponse(false);
            alert("Ну как хочешь... Может, передумаешь?");
        }
    });

    closeCelebration.addEventListener('click', function() {
        celebration.classList.add('hidden');
    });

    function createConfetti() {
        const colors = ['#e75480', '#ffcc00', '#00ccff', '#ff00cc', '#00ff66'];
        const celebrationDiv = document.getElementById('celebration');
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '100vh';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            celebrationDiv.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    function sendResponse(answer) {
        const response = {
            answer: answer ? "Да" : "Нет",
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            pageUrl: window.location.href
        };
        
        console.log("Ответ получен:", response);
        
        const responses = JSON.parse(localStorage.getItem('dateResponses') || '[]');
        responses.push(response);
        localStorage.setItem('dateResponses', JSON.stringify(responses));
    }
});