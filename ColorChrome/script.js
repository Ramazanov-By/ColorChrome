const colorPickerBtn = document.querySelector('.picker-color');
const colorList = document.querySelector('.all-colors');
const clearAll = document.querySelector('.picked-header__clear');
const pickedColors = JSON.parse(localStorage.getItem('picked-colors') || "[]");

const copyColor = elem => {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = 'Copied';
    setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}

const showColors = () => {
    if(!pickedColors.length) return;
    
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="color__rect" style="background: ${color}; border: 1px solid ${color == '#ffffff' ? '#ccc': color}"></span>
            <span class="color__value" data-color="${color}">${color}</span>
        </li>
    `).join('');

    document.querySelector('.picked-colors').classList.remove('hide');

    document.querySelectorAll('.color').forEach(li => {
        li.addEventListener('click', e => copyColor(e.currentTarget.lastElementChild));
    });
}

showColors();

colorPickerBtn.addEventListener('click', async () => {
    const eyeDropper = new EyeDropper();
    const {
        sRGBHex
    } = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex);

    // Повторение. Если такого цвета нет, то добавить
    if (!pickedColors.includes(sRGBHex)) {
        pickedColors.push(sRGBHex);
        localStorage.setItem('picked-colors', JSON.stringify(pickedColors));
        showColors();
    }
});

clearAll.addEventListener('click', () => {
    pickedColors.length = 0;
    localStorage.setItem('picked-colors', JSON.stringify(pickedColors));
    document.querySelector('.picked-colors').classList.add('hide');
})
