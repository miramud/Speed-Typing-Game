const randomWords_API = 'http://api.quotable.io/random';
const timer = document.querySelector('.timer');
const words = document.querySelector('#words');
const typer = document.querySelector('#typer');


const getRandom = async ()=>{
    const res = await fetch(randomWords_API);
    const data = await res.json();
    return data.content;
}
// console.log(getRandom())

async function getNextQuote() {
    const quote = await getRandom();
    words.innerHTML = '';
    // console.log(quote)
    quote.split('').forEach(chars => {
        const charSpan = document.createElement('span');
        charSpan.innerText = chars;
        words.appendChild(charSpan);
    })
    typer.value = null
    setTimer();
}

getNextQuote()

typer.addEventListener('input', ()=>{
    const arrayWords = words.querySelectorAll('span');
    const arrayTyper = typer.value.split('');

    let allCorrect = true;

    arrayWords.forEach((charSpan, index) =>{
        const letter = arrayTyper[index];

        if (letter == null) {
            charSpan.classList.remove('correct-word');
            charSpan.classList.remove('wrong-word');
            allCorrect = false
        }
        else if (letter === charSpan.innerText) {
            charSpan.classList.add('correct-word');
            charSpan.classList.remove('wrong-word')        
        }
        else {
            charSpan.classList.remove('correct-word')
            charSpan.classList.add('wrong-word')
            allCorrect = false
        };
  })

  if (allCorrect) getNextQuote();

});

let startTime;
const setTimer =()=> {
    timer.innerText = 0;
    startTime = new Date();

    setInterval(()=> {
        timer.innerText = getTime();
    }, 1000)
}

function getTime() {
    return Math.floor((new Date() - startTime) / 1000)
}
