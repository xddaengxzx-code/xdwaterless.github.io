const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const dotsBox = document.getElementById("dots");
let index = 0;

/* DOTS */
slides.forEach((_,i)=>{
  const dot=document.createElement("span");
  if(i===0) dot.classList.add("active");
  dotsBox.appendChild(dot);
});

const dots = dotsBox.querySelectorAll("span");

function update(){
  slider.style.transform = `translateX(-${index*100}vw)`;
  dots.forEach(d=>d.classList.remove("active"));
  dots[index].classList.add("active");
}

/* BUTTONS */
document.querySelectorAll(".next").forEach(b=>{
  b.onclick=()=>{ if(index<slides.length-1){index++;update()} }
});
document.querySelectorAll(".prev").forEach(b=>{
  b.onclick=()=>{ if(index>0){index--;update()} }
});

/* SWIPE */
let startX=0;
slider.addEventListener("touchstart",e=>startX=e.touches[0].clientX);
slider.addEventListener("touchend",e=>{
  const endX=e.changedTouches[0].clientX;
  if(startX-endX>50 && index<slides.length-1){index++;update()}
  if(endX-startX>50 && index>0){index--;update()}
});
