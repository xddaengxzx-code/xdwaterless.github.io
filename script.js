let currentVehicle = 'sedan';
let activeServices = { wash: false, nano: false };
let priceList = { sedan: { wash: 0, nano: 0 }, suv: { wash: 0, nano: 0 } };

// 1. Tarik data harga dari harga.json
fetch('harga.json')
    .then(r => r.json())
    .then(data => {
        priceList.sedan.wash = parseInt(data.sedan.basic);
        priceList.sedan.nano = parseInt(data.sedan.nano);
        priceList.suv.wash = parseInt(data.suv.basic);
        priceList.suv.nano = parseInt(data.suv.nano);
        updatePrices();
    })
    .catch(e => console.error("Gagal muat harga.json", e));

// 2. Fungsi tukar jenis kenderaan
function selectVehicle(type) {
    currentVehicle = type;
    document.getElementById('v-sedan').classList.toggle('active', type === 'sedan');
    document.getElementById('v-suv').classList.toggle('active', type === 'suv');
    updatePrices();
}

// 3. Fungsi pilih servis
function toggleService(service) {
    activeServices[service] = !activeServices[service];
    
    // Beri kesan visual pada card yang dipilih
    const cardId = service === 'wash' ? 'card-wash' : 'card-nano';
    const card = document.querySelector(`.service-card:nth-child(${service === 'wash' ? 1 : 2})`);
    if(card) {
        card.style.borderColor = activeServices[service] ? '#ccff00' : '#333';
        card.style.background = activeServices[service] ? 'rgba(204, 255, 0, 0.05)' : '#1a1a1a';
    }
    calculateTotal();
}

// 4. Kemaskini paparan harga
function updatePrices() {
    document.getElementById('price-wash').innerText = priceList[currentVehicle].wash;
    document.getElementById('price-nano').innerText = priceList[currentVehicle].nano;
    calculateTotal();
}

// 5. Kira jumlah & kemaskini link WhatsApp
function calculateTotal() {
    let total = 0;
    let selected = [];
    
    if(activeServices.wash) {
        total += priceList[currentVehicle].wash;
        selected.push("Basic Wash");
    }
    if(activeServices.nano) {
        total += priceList[currentVehicle].nano;
        selected.push("Nano Coating");
    }
    
    document.getElementById('grand-total').innerText = total;
    
    // Sediakan mesej WhatsApp
    let vehicleName = currentVehicle === 'sedan' ? "SEDAN/HATCH" : "SUV/MPV";
    let msg = `Salam XD Waterless, saya nak booking:\n🚗 Jenis: ${vehicleName}\n✨ Servis: ${selected.join(" + ") || "Tiada"}\n💰 Total: RM${total}`;
    
    document.getElementById('btn-booking').href = `https://wa.me/60167003569?text=${encodeURIComponent(msg)}`;
}
