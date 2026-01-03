let selectedVehicle = "sedan";
let selectedService = "basic";

const prices = {
  sedan: {
    basic: 15,
    nano: 35
  },
  suv: {
    basic: 20,
    nano: 45
  }
};

const totalEl = document.getElementById("total");
const confirmBtn = document.getElementById("confirmBtn");

function updateTotal(){
  totalEl.innerText = "RM " + prices[selectedVehicle][selectedService];
}

/* VEHICLE */
document.querySelectorAll(".vehicle-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".vehicle-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    selectedVehicle = btn.dataset.vehicle;
    updateTotal();
  });
});

/* SERVICE */
document.querySelectorAll(".service-card").forEach(card=>{
  card.addEventListener("click",()=>{
    document.querySelectorAll(".service-card").forEach(c=>c.classList.remove("selected"));
    card.classList.add("selected");
    selectedService = card.dataset.service;
    updateTotal();
  });
});

/* WHATSAPP */
confirmBtn.addEventListener("click",()=>{
  const price = prices[selectedVehicle][selectedService];
  const msg =
    `Hai, saya nak booking XD Waterless.%0A`+
    `Kenderaan: ${selectedVehicle.toUpperCase()}%0A`+
    `Servis: ${selectedService.toUpperCase()}%0A`+
    `Harga: RM ${price}`;

  window.open("https://wa.me/60167003569?text="+msg,"_blank");
});

/* INIT */
updateTotal();
