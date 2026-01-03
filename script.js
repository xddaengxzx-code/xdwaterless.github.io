let selectedVehicle="sedan";
let selectedService="basic";
let prices={};

fetch("harga.json")
  .then(r=>r.json())
  .then(d=>{prices=d;updateTotal();});

function updateTotal(){
  let total = prices[selectedVehicle].basic;
  if(selectedService==="nano") total+=prices.addon.nano;
  document.getElementById("total").innerText="RM "+total;
}

document.querySelectorAll(".vehicle-btn").forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll(".vehicle-btn").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    selectedVehicle=b.dataset.vehicle;
    updateTotal();
  };
});

document.querySelectorAll(".service-card").forEach(c=>{
  c.onclick=()=>{
    document.querySelectorAll(".service-card").forEach(x=>x.classList.remove("selected"));
    c.classList.add("selected");
    selectedService=c.dataset.service;
    updateTotal();
  };
});

function submitBooking(){
  const name=custName.value;
  const phone=custPhone.value;
  const car=custCar.value;
  if(!name||!phone||!car){alert("Sila isi semua maklumat");return;}

  let total = prices[selectedVehicle].basic;
  let service="Basic Wash";
  if(selectedService==="nano"){total+=prices.addon.nano;service+=" + Nano";}

  // GOOGLE SHEET
  fetch("PASTE_APPS_SCRIPT_URL_DI_SINI",{
    method:"POST",
    body:JSON.stringify({
      name, phone, car,
      vehicle:selectedVehicle,
      service, total
    })
  });

  // WHATSAPP
  const msg =
`Tempahan XD Waterless
Nama: ${name}
WhatsApp: ${phone}
Kereta: ${car}
Kenderaan: ${selectedVehicle}
Servis: ${service}
Jumlah: RM ${total}

PROMO: Cuci 6 kali, FREE 1 kali`;

  window.open("https://wa.me/60167003569?text="+encodeURIComponent(msg));
}
