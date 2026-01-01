const hargaData = {
    'Sedan': { 'Basic Wash': 15, 'Nano Coating': 35, 'Engine Detailing': 45 },
    'SUV/MPV': { 'Basic Wash': 25, 'Nano Coating': 45, 'Engine Detailing': 55 }
};

let currentVehicle = 'Sedan';
let selectedServices = [];

function setVehicle(type) {
    currentVehicle = type;
    // Update UI
    document.getElementById('btnSedan').classList.toggle('active', type === 'Sedan');
    document.getElementById('btnSUV').classList.toggle('active', type === 'SUV/MPV');
    
    // Update labels harga
    document.getElementById('p-basic').innerText = `RM${hargaData[type]['Basic Wash']}`;
    document.getElementById('p-nano').innerText = `RM${hargaData[type]['Nano Coating']}`;
    document.getElementById('p-engine').innerText = `RM${hargaData[type]['Engine Detailing']}`;
    
    calculate();
}

function toggleService(name, id) {
    const idx = selectedServices.indexOf(name);
    if (idx > -1) {
        selectedServices.splice(idx, 1);
        document.getElementById(id).classList.remove('selected');
    } else {
        selectedServices.push(name);
        document.getElementById(id).classList.add('selected');
    }
    calculate();
}

function calculate() {
    let total = 0;
    selectedServices.forEach(svc => {
        total += hargaData[currentVehicle][svc];
    });
    
    document.getElementById('totalDisplay').innerText = `RM ${total}`;
    
    const summaryText = document.getElementById('summary-text');
    if (selectedServices.length > 0) {
        summaryText.innerHTML = `<b>Jenis:</b> ${currentVehicle}<br><b>Servis:</b> ${selectedServices.join(', ')}`;
    } else {
        summaryText.innerText = "Sila pilih servis...";
    }
}

function sendWhatsApp() {
    const total = document.getElementById('totalDisplay').innerText;
    if (total === 'RM 0') return alert('Sila pilih servis dahulu boss!');
    
    const msg = `Tempahan XD Waterless (PROMO 6+1):%0A------------------------%0AKenderaan: ${currentVehicle}%0AServis: ${selectedServices.join(', ')}%0ATotal: ${total}%0A------------------------%0ASaya nak claim promo cuci ke-6 nanti!`;
    window.location.href = `https://wa.me/60167003569?text=${msg}`;
}
