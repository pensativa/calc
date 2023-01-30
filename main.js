//base values

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
const findMin = () => {
  const results = document.querySelectorAll('.calc__result');
  const numbers = []

  results.forEach(res => {
    res.classList.remove('min')
    let num = Number(res.innerText.replace(/\D+/g,"")) / 100
    numbers.push(num)
  });

  const min = [...numbers];
  min.sort((a,b) => a - b);
  let i = min[0];

  results.forEach(res => res.classList.remove('min'));

  if (storageNum == 0 && transferNum == 0) {
    return
  }

  results[numbers.indexOf(min[0])].classList.add('min');
  for (let n = 1; n < min.length; n++) {
    if (i === Number(min[n])) {
      results[numbers.lastIndexOf(min[n])].classList.add('min')
    }
  }
}

//calculation backblaze or vultr
const sumSimple = (title) => {
    let min,
        storage;

    title === 'backblaze' ? (min = 7, storage = 0.005) : (min = 5, storage = 0.01);
    const total = sumHandle(storage, 0.01);
    if (total > min) {
        return total.toFixed(2);
    } else if (total === 0) {
        return 0.00;
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

//Main calculation
const calculate = () => {
    const resultArray = document.querySelectorAll('.calc__item');

    resultArray.forEach(result => {
        const resultId = result.getAttribute('id');
        const outputResult = result.lastElementChild;

        switch (resultId) {
            case 'bunny':
                outputResult.innerHTML = `<span>${sumBunny()} $</span>`
                outputResult.style.height = `calc(20px + ${sumBunny()/2}vh)`
                break;

            case 'scaleway':
                outputResult.innerHTML = `<span>${sumScaleway()} $</span>`
                outputResult.style.height = `calc(20px + ${sumScaleway()/2}vh)`
                break;
            
            default:
                outputResult.innerHTML = `<span>${sumSimple(resultId)} $</span>`
                outputResult.style.height = `calc(20px + ${sumSimple(resultId)/2}vh)`
                break;
        }
    });
}

//Init sliders
const rangeSlider = (el) => {
    el.previousElementSibling.firstChild.nextElementSibling.innerText = el.value;
    storageNum = document.getElementById('storage').value;
    transferNum = document.getElementById('transfer').value;
    calculate()
    findMin()
};
    