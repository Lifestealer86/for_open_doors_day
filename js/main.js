let anchorBottom = document.querySelector('.bottom-anchor');
let anchorRight = document.querySelector('.right-anchor');
let anchorTop = document.querySelector('.top-anchor');
let anchorSecondBottom = document.querySelector('.second-bottom-anchor');

document.addEventListener('DOMContentLoaded', function(){
    anchorRight.style.visibility = 'hidden';
    anchorTop.style.visibility = 'hidden';
    anchorSecondBottom.style.visibility = 'hidden';
});

anchorBottom.addEventListener("click", (ev) => {
    ev.preventDefault();
    anchorBottom.innerHTML = "Эта кнопка ничего не делает";
    anchorBottom.style.fontSize = "1.3rem";
    anchorRight.style.visibility = "visible";
})

anchorRight.addEventListener("click", (ev) => {
    ev.preventDefault();
    anchorRight.classList.toggle("show-anchor");
    if (anchorRight.classList.contains("show-anchor")) {
        setTimeout(() => {
            anchorRight.style.fontSize = "1.5rem";
            anchorRight.innerHTML = "&gt; Тоже ничего";
        }, 1000);
    } else {
        anchorRight.innerHTML = "&gt;";
        setTimeout(() => {
            anchorRight.style.fontSize = "2rem";
            anchorRight.innerHTML = "&lt;";
            anchorTop.style.visibility = "visible";
        }, 1000);
    }
})

anchorTop.addEventListener("click", (ev) => {
    ev.preventDefault();
    anchorTop.innerHTML = "Опять не работает =(";
    anchorTop.style.left = "350px";
    hide();
})

let remove = (ev) => {
    ev.preventDefault();
}
anchorSecondBottom.addEventListener("click", function handler(ev) {
    ev.preventDefault();
    anchorSecondBottom.addEventListener('click', remove);
    const text = "Неа. Но следующая точно поможет!";
    anchorSecondBottom.innerHTML = "";
    printText(anchorSecondBottom, text, 100);
    setTimeout(() => {
        superButtonGenerate();
    }, 100 * text.length);
}, {once: true});

const hide = () => {
    requestAnimationFrame(() => {
        anchorTop.style.left = parseInt(anchorTop.style.left) - 5 + "px";
        if (parseInt(anchorTop.style.left) > -1500) {
            hide();
        }
    })
    setTimeout(()=> {
       anchorSecondBottom.style.visibility = 'visible';
    }, 3000);
};

let superButtonGenerate = () => {
    const anchor = document.createElement("a");
    anchor.classList.add("super-button");
    anchor.href = "";
    anchor.innerHTML = "Кнопка, которая решит всё!";
    document.querySelector('.main-block').append(anchor);
    runAway();
}

let runAway = () => {
    const anchor = document.querySelector(".super-button");
    anchor.style.border  = "1px solid #000";
    let startMove = false;
    let motivationArray = [
        "Нажми!",
        "Почти!",
        "Удача рядом!",
        "Чуть-чуть осталось!"
    ];
    const moveButton = () => {
        const maxX = window.innerWidth - anchor.offsetWidth;
        const maxY = window.innerHeight - anchor.offsetHeight;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        anchor.style.left = `${newX}px`;
        anchor.style.top = `${newY}px`;
        startMove = true;
    };
    anchor.addEventListener("mouseover", () => {
        anchor.textContent = motivationArray[random(0, motivationArray.length)];
        if(!startMove) {
            setTimeout(()=> {
                showAnswer();
            }, 30000)
        }
        moveButton();
    });
}

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const printText = (el, text, time) => {
    const arr = text.split("");
    let inter = setInterval(() => {
        el.innerHTML += arr.splice(0, 1);
        if(arr.length <= 0) {
            clearInterval(inter);
        }
    }, time);
}

const showAnswer = () => {
    document.body.innerHTML = "";
    const text = "Нет волшебной кнопки!\nНа втором мониторе открыт код,\nон покажет\nИщите свойство visibility\nИзмените его значение\nс hidden на visible!";
    document.body.style = "color: #fff; font-size: 6rem;";
    let pre = document.createElement("pre");
    document.body.appendChild(pre);
    printText(pre, text, 50);
}
