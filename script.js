const displayKey = document.querySelector('.key-container');
const keyChancePanel = document.querySelector('.key-chance-panel');
const keyWrapper = document.querySelector('.key-wrapper');

const keys = [
    'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ',
    'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р',
    'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т',
    'ь', 'б', 'ю', 'ё'
];

keys.forEach(key => {
    const newChancePanelItem = document.createElement('div');
    newChancePanelItem.classList.add('key-chance-item');
    
    newChancePanelItem.textContent = key;
    
    keyChancePanel.appendChild(newChancePanelItem);
    
});

const keyChanceItems = document.querySelectorAll('.key-chance-item');




const keysWithChance = {};
let chanceSegmentSize = 0;
const CHANCE_RATIO = 4;

keys.forEach(key => {
    keysWithChance[key] = {};
});

const countChances = () => {
    keyChanceItems.forEach(item => {
        let chanceValue = 0;
        
        for (const index in item.children) {
            if (item.children[index].classList && item.children[index].classList.contains('key-chance-value')) {
                chanceValue = item.children[index].textContent;
            }
        }
        
        keysWithChance[item.textContent[0]] = {value: chanceValue};
    });
    
    let currentPosition = -1;
    for (const key in keysWithChance) {
        keysWithChance[key].startPoint = currentPosition + 1;
        keysWithChance[key].finishPoint = +keysWithChance[key].startPoint + +keysWithChance[key].value * CHANCE_RATIO;
        
        currentPosition = +keysWithChance[key].finishPoint;
    }
    
    chanceSegmentSize = currentPosition;
    
    console.log(keysWithChance);
    console.log(currentPosition);
}








const checkKey = (key) => {
    if (displayKey.textContent === key.toString()) {
        // console.log('success');
        displayKey.style.borderColor = 'wheat';
    
        generateKey();
    } else {
        displayKey.style.borderColor = 'red';
    }
}

const generateKey = () => {
    const index = Math.floor(Math.random() * (chanceSegmentSize + 1));
    
    for (const key in keysWithChance) {
        const item = keysWithChance[key];
        displayKey.textContent = '';
        
        if (index >= item.startPoint && index <= item.finishPoint) {
            setTimeout(() => {
                displayKey.textContent = key, 10;
                displayKey.style.left = `${Math.floor(Math.random() * (keyWrapper.clientWidth - 200 + 1)) + 100}px`;
                displayKey.style.top = `${Math.floor(Math.random() * (keyWrapper.clientHeight - 200 + 1)) + 100}px`;
            });
        }
    }
}












const createListeners = (incBtn, decBtn, chanceValue) => {
    incBtn.addEventListener('click', () => {
        chanceValue.textContent = +chanceValue.textContent +  1;
        
        countChances();
    });
    decBtn.addEventListener('click', () => {
        if (chanceValue.textContent !== '0') {
            chanceValue.textContent = +chanceValue.textContent - 1;
        }
        
        countChances();
    });
}

keyChanceItems.forEach(item => {
    const incBtn = document.createElement('div');
    incBtn.classList.add('key-chance-inc');
    incBtn.textContent = '+';
    
    const decBtn = document.createElement('div');
    decBtn.classList.add('key-chance-dec');
    decBtn.textContent = '-';
    
    const keyChanceValue = document.createElement('div');
    keyChanceValue.classList.add('key-chance-value');
    keyChanceValue.textContent = '0';
    
    item.append(incBtn, decBtn, keyChanceValue);
   
    createListeners(incBtn, decBtn, keyChanceValue);
});










window.addEventListener('keydown', event => {
    checkKey(event.key);
});

countChances();
generateKey();