let currentType = 'sedan';
let activeServices = { wash: false, nano: false };

// Harga Default mengikut jenis kenderaan
const prices = {
    sedan: { wash: 15, nano: 20 },
    suv: { wash: 25, nano: 20 }
};

function selectVehicle(type) {
    currentType = type;
    document.getElementById('v-sedan').classList.toggle('active', type === 'sedan');
    document.getElementById('v-suv').classList.toggle('active', type === 'suv');
    
    // Kemaskini paparan harga
    document.getElementById('price-wash').innerText = prices[type].wash;
    document.getElementById('price-nano').innerText = prices[type].nano;
    
    calculate();
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
    
    // Mesej WhatsApp
    let msg = `Salam XD Waterless, saya nak booking servis:\n\n🚗 Kenderaan: ${currentType.toUpperCase()}\n✨ Servis: ${selected.join(" + ") || "Belum dipilih"}\n💰 Total Estimasi: RM${total}\n\n(Saya nak kumpul stamp Cuci 6 Free 1!)`;
    
    document.getElementById('btn-booking').href = `https://wa.me/60167003569?text=${encodeURIComponent(msg)}`;
}

// Jalankan fungsi awal
selectVehicle('sedan');
