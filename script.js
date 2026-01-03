let currentType = 'sedan';
let activeServices = { wash: false, nano: false };

const prices = {
    sedan: { wash: 15, nano: 20 },
    suv: { wash: 25, nano: 40 }
};

function selectVehicle(type) {
    currentType = type;
    document.getElementById('v-sedan').className = type === 'sedan' ? 'v-btn active' : 'v-btn';
    document.getElementById('v-suv').className = type === 'suv' ? 'v-btn active' : 'v-btn';
    document.getElementById('price-wash').innerText = prices[type].wash;
    document.getElementById('price-nano').innerText = prices[type].nano;
    calculate();
}

function toggleService(s) {
    activeServices[s] = !activeServices[s];
    const el = document.getElementById('card-' + s);
    el.style.borderColor = activeServices[s] ? '#ccff00' : '#2a2a2a';
    el.style.background = activeServices[s] ? 'rgba(204,255,0,0.05)' : '#1a1a1a';
    calculate();
}

function calculate() {
    let total = 0;
    let selected = [];
    if(activeServices.wash) { total += prices[currentType].wash; selected.push("Wash"); }
    if(activeServices.nano) { total += prices[currentType].nano; selected.push("Nano"); }
    document.getElementById('grand-total').innerText = "RM " + total;
}

function sendBooking() {
    let total = document.getElementById('grand-total').innerText;
    if(total === "RM 0") return alert("Sila pilih servis!");
    let msg = `Salam XD Waterless, booking:\nKereta: ${currentType.toUpperCase()}\nTotal: ${total}`;
    window.location.href = `https://wa.me/60167003569?text=${encodeURIComponent(msg)}`;
}

selectVehicle('sedan');
