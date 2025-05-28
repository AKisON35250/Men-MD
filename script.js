let startZeit;

function startDienst() {
  const name = document.getElementById("name").value.trim();
  if (!name) return alert("Bitte Namen eintragen!");

  startZeit = new Date();

  document.getElementById("status").innerText =
    `${name} ist eingestempelt um ${startZeit.toLocaleTimeString()}`;
  document.getElementById("dauer").innerText = "";

  // Google Sheet speichern
  fetch("https://script.google.com/macros/s/AKfycbynz8eHMH3Z8-2mZPUgAAPHDk86i7QRexBzU4yk64B2/dev", {
    method: "POST",
    body: new URLSearchParams({
      name: name,
      aktion: "Dienst gestartet"
    })
  });
}


function endDienst() {
  const name = document.getElementById("name").value.trim();
  if (!startZeit || !name) return alert("Bitte vorher einstempeln und Name eintragen!");

  const endZeit = new Date();
  const dauer = ((endZeit - startZeit) / 3600000).toFixed(2);
  const aktion = "Dienst beendet";

  document.getElementById("status").innerText =
    `${name} hat sich um ${endZeit.toLocaleTimeString()} ausgestempelt.`;
  document.getElementById("dauer").innerText = `⏱️ Dauer: ${dauer} Stunden`;

  // Google Sheet speichern
  fetch("https://script.google.com/macros/s/AKfycbynz8eHMH3Z8-2mZPUgAAPHDk86i7QRexBzU4yk64B2/dev", {
    method: "POST",
    body: new URLSearchParams({
      name: name,
      aktion: aktion,
      dauer: dauer
    })
  });

  startZeit = null;
}
