let selectedGame = "";
let selectedNominal = "";
let selectedPrice = "";

const nominalData = {
    "Mobile Legends": [
        ["5 Diamonds", "Rp 2.000"],
        ["12 Diamonds", "Rp 4.000"],
        ["28 Diamonds", "Rp 8.000"],
        ["59 Diamonds", "Rp 16.000"],
        ["85 Diamonds", "Rp 22.000"],
        ["170 Diamonds", "Rp 44.000"]
    ],

    "Free Fire": [
        ["70 Diamonds", "Rp 10.000"],
        ["140 Diamonds", "Rp 20.000"],
        ["355 Diamonds", "Rp 50.000"],
        ["720 Diamonds", "Rp 100.000"],
        ["Membership Mingguan", "Rp 30.000"],
        ["Membership Bulanan", "Rp 90.000"]
    ],

    "PUBG Mobile": [
        ["60 UC", "Rp 15.000"],
        ["325 UC", "Rp 75.000"],
        ["660 UC", "Rp 150.000"],
        ["1800 UC", "Rp 380.000"]
    ],

    "Honor Of Kings": [
        ["80 Token", "Rp 15.000"],
        ["240 Token", "Rp 45.000"],
        ["400 Token", "Rp 75.000"],
        ["800 Token", "Rp 150.000"]
    ],

    "Genshin Impact": [
        ["60 Genesis Crystal", "Rp 15.000"],
        ["300 Genesis Crystal", "Rp 75.000"],
        ["980 Genesis Crystal", "Rp 230.000"],
        ["Blessing Welkin Moon", "Rp 75.000"]
    ],

    "Roblox": [
        ["80 Robux", "Rp 15.000"],
        ["400 Robux", "Rp 70.000"],
        ["800 Robux", "Rp 140.000"],
        ["1700 Robux", "Rp 280.000"]
    ]
};

function openTopup(game){
    selectedGame = game;

    document.getElementById("gameTitle").innerText = game;

    const nominalGrid = document.getElementById("nominalGrid");
    nominalGrid.innerHTML = "";

    nominalData[game].forEach((item, index) => {
        nominalGrid.innerHTML += `
            <button onclick="selectNominal(this, '${item[0]}', '${item[1]}')" class="${index === 0 ? "active" : ""}">
                ${item[0]}
                <span>${item[1]}</span>
            </button>
        `;
    });

    selectedNominal = nominalData[game][0][0];
    selectedPrice = nominalData[game][0][1];

    document.getElementById("topupModal").classList.add("show");
}

function closeTopup(){
    document.getElementById("topupModal").classList.remove("show");
}

function selectNominal(button, nominal, price){
    document.querySelectorAll(".nominal-grid button").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
    selectedNominal = nominal;
    selectedPrice = price;
}

function searchGame(){
    const input = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".game-card");

    cards.forEach(card => {
        const title = card.innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}

function orderWhatsApp(){
    const userId = document.getElementById("userId").value;
    const serverId = document.getElementById("serverId").value;

    if(userId.trim() === ""){
        alert("ID game wajib diisi dulu ayang!");
        return;
    }

    const nomorWa = "6289524501105";

    let pesan = `Halo admin KazeraaID, saya mau top up:%0A%0A`;
    pesan += `Game: ${selectedGame}%0A`;
    pesan += `ID: ${userId}%0A`;

    if(serverId.trim() !== ""){
        pesan += `Server: ${serverId}%0A`;
    }

    pesan += `Nominal: ${selectedNominal}%0A`;
    pesan += `Harga: ${selectedPrice}%0A%0A`;
    pesan += `Mohon diproses ya admin.`;

    window.location.href = `https://wa.me/${nomorWa}?text=${pesan}`;
}

window.onclick = function(event){
    const modal = document.getElementById("topupModal");

    if(event.target === modal){
        closeTopup();
    }
}