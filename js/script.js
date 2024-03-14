function loadContent() {
    const buzzWrapper = document.querySelector('.buzz_wrapper');
    const textContainer = buzzWrapper.querySelector('.text');
    const existingClones = textContainer.querySelectorAll('.cloned');
    existingClones.forEach(clone => clone.remove());
    const textSpan = textContainer.querySelector('pre');

    for (let i = 0; i < 4; i++) {
        const clonedTextSpan = textSpan.cloneNode(true);
        clonedTextSpan.classList.add('cloned');
        textContainer.prepend(clonedTextSpan);
    }
}

function playSound(soundobj) {
    var thissound = document.getElementById(soundobj);
    if (soundobj == "cyberpunk") {
        alert("Wykryto uszkodzenie chipu Relic!")
        document.querySelector(".buzz_wrapper pre:nth-child(4)").style.color="yellow";
        document.querySelector(".buzz_wrapper pre:nth-child(3)").style.color="rgb(128, 128, 0)";
        document.querySelectorAll(".blue, a").forEach(element => {
            element.style.color="rgb(102, 237, 237)";
        });
        document.querySelector(".buzz_wrapper").style.animation="pulse calc(6s / 9) linear infinite reverse";
        setTimeout(() => document.querySelector(".buzz_wrapper").style.animation="none", 71000);
    }
    thissound.play();
}

function scuderiaJumpscare(soundobj) {
    var thissound = document.getElementById(soundobj);
    document.getElementById("sf").style.opacity="0.08";
    thissound.play();
    setTimeout(() => document.getElementById("sf").style.opacity="0", 5000);
}

function setupTypewriter(t) {
    var HTML = t.innerHTML;
    t.innerHTML = "";
    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 1,
    tempTypeSpeed = 0;

    var type = function() {
        if (writingTag === true) {
            tag += HTML[cursorPosition];
        }
        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
            loadContent();
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 5;
            }
            t.innerHTML += HTML[cursorPosition];
            loadContent();
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * typeSpeed) + 5;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }
        cursorPosition += 1;
        if (cursorPosition < HTML.length - 1) {
            setTimeout(type, tempTypeSpeed);
        }
    };
    return { type: type };
}
// Design funkcji oparty na pracy użytkownika Stove z CodePen (https://codepen.io/stevn/pen/jEZvXa)


// Uruchamia efekt pisania tylko przy pierwszej wizycie na stronie (localstoraż hehe)
if (!sessionStorage.getItem("firstVisit")) {
    var typer = document.getElementById('typewriter');
    typewriter = setupTypewriter(typewriter);
    typewriter.type();
    sessionStorage.setItem("firstVisit", "true");
} 
else {
    loadContent();
}