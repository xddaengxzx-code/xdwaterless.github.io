let selectedVehicle = "sedan";
let selectedService = "basic";
let prices = {};

const totalEl = document.getElementById("total");
const confirmBtn = document.getElementById("confirmBtn");

/* LOAD PRICES */
fetch("harga.json")
  .then(res => res.json())
  .then(data => {
    prices = data;
    updateTotal();
  });

function updateTotal(){
  let total = prices[selectedVehicle].basic;
  if(selectedService === "nano"){
    total += prices.addon.nano;
  }
  totalEl.innerText = "RM " + total;
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
  let total = prices[selectedVehicle].basic;
  let service = "Basic Wash";

  if(selectedService === "nano"){
    total += prices.addon.nano;
    service = "Basic Wash + Nano Coating";
  }

  const msg =
    `Hai, saya nak booking XD Waterless.%0A`+
    `Kenderaan: ${selectedVehicle.toUpperCase()}%0A`+
    `Servis: ${service}%0A`+
    `Jumlah: RM ${total}`;

  window.open(
    "https://wa.me/60167003569?text="+msg,
    "_blank"
  );
});
