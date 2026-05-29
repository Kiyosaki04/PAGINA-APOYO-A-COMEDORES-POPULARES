// REGISTRO DE USUARIO (LOCAL)
function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    if (username === "" || email === "") {
        document.getElementById("message").innerText = "Completa los campos";
        return;
    }

    const user = {
        username,
        email
    };

    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("message").innerText = "Usuario registrado correctamente";
}


const map = L.map('map').setView([-12.0464, -77.0428], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const comedores = [
    {
        nombre: "Comedor San Martín",
        lat: -12.05,
        lng: -77.04,
        contacto: "987654321"
    },
    {
        nombre: "Comedor Esperanza",
        lat: -12.06,
        lng: -77.03,
        contacto: "912345678"
    },
       
];

// Agregar marcadores
comedores.forEach(comedor => {
    const marker = L.marker([comedor.lat, comedor.lng]).addTo(map);

    marker.bindPopup(`<b>${comedor.nombre}</b>`);

    marker.on("click", () => {
        mostrarInfo(comedor);
    });
});

// Mostrar info
function mostrarInfo(comedor) {
    const info = `
        <h3>${comedor.nombre}</h3>
        <p>📞 Contacto: ${comedor.contacto}</p>
        <p>Puedes acercarte o llamar para donar</p>
    `;

    document.getElementById("info").innerHTML = info;
}

// GEOLOCALIZACIÓN EN TIEMPO REAL
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        L.marker([lat, lng]).addTo(map)
            .bindPopup("Tu ubicación")
            .openPopup();
    });
}