let hargaData = {};

fetch("harga.json")
  .then(res => res.json())
  .then(data => {
    hargaData = data;
  });

function kiraHarga() {
  const servis = document.getElementById("servis").value;
  const size = document.getElementById("size").value;
  const output = document.getElementById("hargaOutput");

  if (!servis || !size) {
    output.innerText = "Sila pilih servis & saiz kenderaan.";
    return;
  }

  const harga = hargaData[servis][size];
  output.innerText = `Harga: RM${harga}`;
}
