const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

document.addEventListener("click", e=>{
  if(e.target.classList.contains("next")){
    index = Math.min(index+1, slides.length-1);
    showSlide(index);
  }
  if(e.target.classList.contains("prev")){
    index = Math.max(index-1, 0);
    showSlide(index);
  }
});
