document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const celebration = document.getElementById('celebration');
    const closeCelebration = document.getElementById('close-celebration');
    
    let runCount = 0;
    const maxRunCount = 12;
    const messages = [
        "Не в этот раз",
        "Прекрати!",
        "Не надо!",
        "Отстань!",
        "Хватит!",
        "Я сержусь!",
        "Ты надоела!",
        "Последний раз!",
        "Ладно, хватит...",
        "Ты победила",
        "Нажми 'Да'!"
    ];
    const margin = 40; // Минимальный отступ от краев

    yesBtn.addEventListener('click', function() {
        celebration.classList.remove('hidden');
        createConfetti();
        sendResponse(true);
    });

    noBtn.addEventListener('mouseover', function() {
        if (runCount >= maxRunCount) return;
        
        const btn = this;
        const btnWidth = btn.offsetWidth;
        const btnHeight = btn.offsetHeight;
        
        // Рассчитываем доступную область для перемещения
        const maxX = document.documentElement.clientWidth - btnWidth - margin;
        const maxY = document.documentElement.clientHeight - btnHeight - margin;
        
        // Генерируем новые координаты с учетом отступов
        const randomX = margin + Math.random() * (maxX - margin);
        const randomY = margin + Math.random() * (maxY - margin);
        
        btn.style.position = 'fixed';
        btn.style.left = `${randomX}px`;
        btn.style.top = `${randomY}px`;
        
        // Меняем текст
        btn.textContent = messages[Math.min(runCount, messages.length - 1)];
        runCount++;
        
        if (runCount >= maxRunCount) {
            btn.textContent = "Ок, нажми";
            btn.style.position = 'static';
        }
    });

    noBtn.addEventListener('click', function() {
        if (runCount >= maxRunCount) {
            sendResponse(false);
            alert("Ну и ладно! Буду ждать другого раза...");
        }
    });

    closeCelebration.addEventListener('click', function() {
        celebration.classList.add('hidden');
    });

    function createConfetti() {
        const colors = ['#e75480', '#ffcc00', '#00ccff', '#ff00cc', '#00ff66'];
        const celebrationDiv = document.getElementById('celebration');
        
        for (let i = 0; i < 120; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -10 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            celebrationDiv.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }

    function sendResponse(answer) {
        const response = {
            answer: answer ? "Да" : "Нет",
            timestamp: new Date().toLocaleString()
        };
        console.log("Ответ:", response);
    }
});