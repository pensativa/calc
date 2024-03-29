//init values

let storageNum = 0;
let transferNum = 0;

//Standard Calculations
const sumHandle = (storage, transfer) => {
    const storageSum = storageNum * storage;
    const transferSum = transferNum * transfer;
    return storageSum + transferSum;
}

//Switching buttons
const setActive = (el) => {
    const parent = el.parentElement;
    const childrens = parent.querySelectorAll('button')
    childrens.forEach((element) => element.classList.remove('active'));
    el.classList.add('active');

    calculate()
    findMin()
}

//Finding the smallest result
const findMinHandle = (item) => {
    return Number(item.innerText.replace(/\D+/g,"")) / 100
}
const findMin = () => {
  const results = document.querySelectorAll('.calc__result');
  const numbers = []

  results.forEach(res => {
    const num = findMinHandle(res);
    numbers.push(num)
  });

  const min = [...numbers];
  min.sort((a,b) => a - b);
  let i = min[0];

  if (storageNum == 0 && transferNum == 0) {
    results.forEach(res => res.classList.remove('min'));
    return;
  }

   results.forEach(res => findMinHandle(res) === i ? res.classList.add('min') : res.classList.remove('min'));
}

//calculation backblaze or vultr
const sumSimple = (title) => {
    let min,
        storage;

    title === 'backblaze' ? (min = 7, storage = 0.005) : (min = 5, storage = 0.01);
    const total = sumHandle(storage, 0.01);
    if (total > min) {
        return total.toFixed(2);
    } else if (total == 0) {
        return '0.00';
    } else {
      return min.toFixed(2)
    }
}

//calculation bunny
const sumBunny = () => {
    const max = 10,
          transfer = 0.01;
    let storage;
    document.getElementById('hdd').classList.contains('active') ? storage = 0.01 : storage = 0.02;
    const total = sumHandle(storage, transfer);
    if (total < max) {
        return total.toFixed(2);
    } else {
        return max.toFixed(2);
    }
}

//calculation scaleway
const sumScaleway = () => {
    const limit = 75,
          transfer = 0.02

    let storage,
        storageSum,
        transferSum

    document.getElementById('multi').classList.contains('active') ? storage = 0.06 : storage = 0.03;


    (storageNum <= limit) ? storageSum = 0 : (storageSum = (storageNum - limit) * storage);


    (transferNum <= limit) ? transferSum = 0 : (transferSum = (transferNum - limit) * transfer);

    
    return (storageSum + transferSum).toFixed(2);
}

const calcProgressResult = (res) => {
    const sum = 2 + Number(res);
    return `${sum}vw`;
}

//Main calculation
const calculate = () => {
    const resultArray = document.querySelectorAll('.calc__item');

    resultArray.forEach(result => {
        const resultId = result.getAttribute('id');
        const outputResult = result.lastElementChild;

        switch (resultId) {
            case 'bunny':
                outputResult.innerHTML = `<span>${sumBunny()} $</span>`
                outputResult.style.height = calcProgressResult(sumBunny())
                break;

            case 'scaleway':
                outputResult.innerHTML = `<span>${sumScaleway()} $</span>`
                outputResult.style.height = calcProgressResult(sumScaleway())
                break;
            
            default:
                outputResult.innerHTML = `<span>${sumSimple(resultId)} $</span>`
                outputResult.style.height = calcProgressResult(sumSimple(resultId))
                break;
        }
    });
}

//Init sliders
const progressCalc = (num) => {
    return (num / 1000 * 100);
}

const getValue = (e) => {
    let currentValue = Number(e.value);
    const currentId = e.getAttribute('data-id');
    const sameValue = document.querySelectorAll(`input[data-id = ${currentId}]`);
    if (currentValue > 1000) {
        e.value = 1000;
        currentValue = 1000;
    }
    sameValue.forEach((el) => el.value = currentValue);
    storageNum = document.querySelector(`input[data-id = storage]`).value;
    transferNum = document.querySelector(`input[data-id = transfer]`).value;
    document.getElementById('storage').style.background = `linear-gradient(to right, var(--teal), var(--teal) ${progressCalc(storageNum)}%, var(--shade) ${progressCalc(storageNum)}%, var(--shade) 100%)`;
    document.getElementById('transfer').style.background = `linear-gradient(to right, var(--teal), var(--teal) ${progressCalc(transferNum)}%, var(--shade) ${progressCalc(transferNum)}%, var(--shade) 100%)`;
    calculate()
    findMin()
}