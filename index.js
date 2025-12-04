
const result = document.getElementById('result');
const length = document.getElementById('length');

const uppercase = document.getElementById('uppercase');

const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');

const symbols = document.getElementById('symbols');
const generate = document.getElementById('generate');

const clipboard = document.getElementById('clipboard');

const clear = document.getElementById('clear');
const notification = document.getElementById('notification');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }]
        .filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

generate.addEventListener('click', () => {
    const lengthValue = +length.value;
    const hasLower = lowercase.checked;
    const hasUpper = uppercase.checked;
    const hasNumber = numbers.checked;
    const hasSymbol = symbols.checked;


    result.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, lengthValue);
});


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}



clipboard.addEventListener('click', async () => {
    const password = result.innerText;
    if (!password) {
        alert("Please generate a password first");
         showNotification('No password to clear!','warning');
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        alert("Password copied to clipboard!");
         showNotification('Password copied to clipboard!', 'success');
    } catch (err) {
        console.error("Failed to copy: ", err);
        showNotification('Failed to copy password!', 'error');

    }
});

clear.addEventListener('click', () => {
    result.innerText = '';
    alert("Password cleared");
    showNotification('Password cleared!', 'error');

});



function showNotification(message, type = 'success') {
    notification.classList.remove('show');
    
    notification.className = 'notification';
    
    notification.querySelector('span').textContent = message;
    
    if (type === 'success') {
        notification.classList.add('success');
    } else if (type === 'error') {
        notification.classList.add('error');
    } else if (type === 'warning') {
        notification.classList.add('warning');
    }
     void notification.offsetWidth; 
      notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);

}
    
    


