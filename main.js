let slideNum = document.querySelector(".slide-num");
let imgs = document.querySelectorAll("img");
let prev = document.querySelector(".prev");
let indicators = document.querySelector(".indicators");
let next = document.querySelector(".next");
let ul = document.createElement("ul");

for(let i = 1; i <= imgs.length; i++){
    let bullet = document.createElement("li");
    bullet.innerHTML=`${i}`;
    ul.appendChild(bullet);
    indicators.appendChild(ul);
}

let lis = Array.from(document.querySelectorAll("ul li"));
let currentSlide = 1;

// set default values
function theChecker(){
    slideNum.innerHTML = `Slide #${currentSlide} Of ${imgs.length}`;
    removeActiveClass();
    imgs[currentSlide - 1].classList.add("active");
    lis[currentSlide - 1].classList.add("active");
    
    // remove active on orev button
    if(currentSlide == 1){
        prev.classList.add("disabled");
    }else{
        prev.classList.remove("disabled");
    }

    // remove active on next button
    if(currentSlide == imgs.length){
        next.classList.add("disabled");
    }else{
        next.classList.remove("disabled");
    }

}

theChecker();

function removeActiveClass(){
    // remove active class on imgs
    imgs.forEach((img) => {
        img.classList.remove("active");
    })
    // remove active class on bullets
    lis.forEach((li) => {
        li.classList.remove("active");
    })
}

next.onclick = () => {
    if(next.classList.contains("disabled")){
        return false;
    }else{
        currentSlide++;
        theChecker();
    }
}

prev.onclick = () => {
    if(prev.classList.contains("disabled")){
        return false;
    }else{
        currentSlide--;
        theChecker();
    }
}

lis.forEach((li) => {
    li.onclick = () => {
        currentSlide = parseInt(li.innerHTML);
        theChecker();
    }
})