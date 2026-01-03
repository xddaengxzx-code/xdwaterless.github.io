let currentType = 'sedan';
let prices = { sedan: { wash: 0, nano: 0 }, suv: { wash: 0, nano: 0 } };

// Tarik data dari harga.json
fetch('harga.json')
    .then(r => r.json())
    .then(data => {
        document.getElementById('promo').innerText = data.promo;
        prices.sedan.wash = parseInt(data.sedan.basic);
        prices.sedan.nano = parseInt(data.sedan.nano);
        prices.suv.wash = parseInt(data.suv.basic);
        prices.suv.nano = parseInt(data.suv.nano);
        updateDisplay();
    });

function updateDisplay() {
    document.getElementById('disp-wash').innerText = "RM " + prices[currentType].wash;
    document.getElementById('disp-nano').innerText = "RM " + prices[currentType].nano;
    calculateTotal();
}

document.getElementById('btn-sedan').addEventListener('click', () => {
    currentType = 'sedan';
    toggleActive('btn-sedan', 'btn-suv');
    updateDisplay();
});

document.getElementById('btn-suv').addEventListener('click', () => {
    currentType = 'suv';
    toggleActive('btn-suv', 'btn-sedan');
    updateDisplay();
});

function toggleActive(activeId, inactiveId) {
    document.getElementById(activeId).classList.add('active');
    document.getElementById(inactiveId).classList.remove('active');
}

function calculateTotal() {
    let total = 0;
    let selected = [];
    document.querySelectorAll('.service-check').forEach(check => {
        if(check.checked) {
            total += prices[currentType][check.value];
            selected.push(check.parentElement.innerText);
        }
    });
    document.getElementById('total-price').innerText = total;
    
    // Update WhatsApp link
    let msg = `Assalam XD Waterless, saya nak booking (${currentType.toUpperCase()}) - ${selected.join(", ")}. Total: RM${total}`;
    document.getElementById('wa-booking').href = `https://wa.me/60167003569?text=${encodeURIComponent(msg)}`;
}

document.querySelectorAll('.service-check').forEach(c => c.addEventListener('change', calculateTotal));
