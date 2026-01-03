let total = 15;
const totalEl = document.getElementById("total");
const confirmBtn = document.getElementById("confirmBtn");

// SERVICE SELECTION
document.querySelectorAll(".service-card").forEach(card=>{
  card.addEventListener("click",()=>{
    document.querySelectorAll(".service-card")
      .forEach(c=>c.classList.remove("selected"));

    card.classList.add("selected");
    total = card.dataset.price;
    totalEl.innerText = "RM " + total;
  });
});

// CONFIRM BOOKING → WHATSAPP
confirmBtn.addEventListener("click",()=>{
  const msg = `Tempahan XD Waterless%0AJumlah: RM ${total}`;
  window.open(
    "https://wa.me/60167003569?text=" + msg,
    "_blank"
  );
});
