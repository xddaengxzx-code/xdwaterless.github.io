let currentType = 'sedan';
let activeServices = { wash: false, nano: false };

const prices = {
    sedan: { wash: 15, nano: 20 },
    suv: { wash: 25, nano: 20 }
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
    el.style.borderColor = activeServices[s] ? '#ccff00' : '#444';
    el.style.background = activeServices[s] ? 'rgba(204,255,0,0.1)' : '#222';
    calculate();
}

function calculate() {
    let total = 0;
    let selected = [];
    if(activeServices.wash) { total += prices[currentType].wash; selected.push("Wash"); }
    if(activeServices.nano) { total += prices[currentType].nano; selected.push("Nano"); }
    document.getElementById('grand-total').innerText = "RM " + total;
    let msg = `Salam XD Waterless, booking ${currentType.toUpperCase()}: ${selected.join("+")}. Total RM${total}`;
    document.getElementById('btn-booking').href = `https://wa.me/60167003569?text=${encodeURIComponent(msg)}`;
}

selectVehicle('sedan');
