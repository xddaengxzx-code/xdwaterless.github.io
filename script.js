let currentType = 'sedan';
let activeServices = { wash: false, nano: false };
let prices = { sedan: { wash: 0, nano: 0 }, suv: { wash: 0, nano: 0 } };

// Tarik data harga dari harga.json
fetch('harga.json')
    .then(r => r.json())
    .then(data => {
        prices.sedan.wash = parseInt(data.sedan.basic);
        prices.sedan.nano = parseInt(data.sedan.nano);
        prices.suv.wash = parseInt(data.suv.basic);
        prices.suv.nano = parseInt(data.suv.nano);
        updateUI();
    });

function selectVehicle(type) {
    currentType = type;
    document.getElementById('v-sedan').classList.toggle('active', type === 'sedan');
    document.getElementById('v-suv').classList.toggle('active', type === 'suv');
    updateUI();
}

function toggleService(s) {
    activeServices[s] = !activeServices[s];
    const el = document.getElementById(s === 'wash' ? 'card-wash' : 'card-nano');
    
    if(activeServices[s]) {
        el.style.borderColor = "#ccff00";
        el.style.background = "rgba(204,255,0,0.1)";
    } else {
        el.style.borderColor = "#444";
        el.style.background = "#222";
    }
    calculate();
}

function updateUI() {
    document.getElementById('price-wash').innerText = prices[currentType].wash;
    document.getElementById('price-nano').innerText = prices[currentType].nano;
    calculate();
}

function calculate() {
    let total = 0;
    let selected = [];
    
    if(activeServices.wash) {
        total += prices[currentType].wash;
        selected.push("Basic Wash");
    }
    if(activeServices.nano) {
        total += prices[currentType].nano;
        selected.push("Nano Coating");
    }
    
    document.getElementById('grand-total').innerText = "RM " + total;
    
    // LINK WHATSAPP DENGAN MESEJ AUTO
    let vehicle = currentType === 'sedan' ? "SEDAN/HATCH" : "SUV/MPV";
    let msg = `Salam XD Waterless, saya nak booking:\n\n🚗 Kenderaan: ${vehicle}\n✨ Servis: ${selected.join(" + ") || "Tiada"}\n💰 Total: RM${total}\n\n(Saya nak kumpul stamp Cuci 6 Free 1!)`;
    
    document.getElementById('btn-booking').href = `https://wa.me/60167003569?text=${encodeURIComponent(msg)}`;
}
