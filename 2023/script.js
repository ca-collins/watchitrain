let timer;
let moneyPerSecond = 0;

function startCounter() {
    const yearlySalary = parseFloat(document.getElementById('salary').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;

    if (yearlySalary > 0) {
        moneyPerSecond = yearlySalary / (365 * 24 * 3600);
    } else if (hourlyRate > 0) {
        moneyPerSecond = hourlyRate / 3600;
    }

    clearInterval(timer);
    timer = setInterval(updateCounter, 1000);
    startMoneyAnimation();
}

function updateCounter() {
    const earningElement = document.getElementById('earning');
    const currentEarning = parseFloat(earningElement.textContent) || 0;
    earningElement.textContent = (currentEarning + moneyPerSecond).toFixed(2);
}

function startMoneyAnimation() {
    const moneyAnimationElement = document.getElementById('money-animation');
    moneyAnimationElement.innerHTML = '';

    setInterval(() => {
        const dollarElement = document.createElement('div');
        dollarElement.textContent = '$';
        dollarElement.style.position = 'absolute';
        dollarElement.style.fontSize = Math.random() * 20 + 10 + 'px';
        dollarElement.style.top = Math.random() * 100 + '%';
        dollarElement.style.left = Math.random() * 100 + '%';
        dollarElement.style.transform = 'translate(-50%, -50%)';
        moneyAnimationElement.appendChild(dollarElement);

        setTimeout(() => {
            dollarElement.remove();
        }, 2000);
    }, 200);
}
