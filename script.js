// Animasi muncul saat halaman dimuat
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// Efek klik card
const cards = document.querySelectorAll(".service-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.style.transform = "scale(.97)";

        setTimeout(() => {
            card.style.transform = "";
        }, 150);
    });
});

window.addEventListener("load",()=>{

    setTimeout(()=>{

        document
        .getElementById("loader")
        .classList.add("hide");

    },2000);

});

const services = [

{
name:"Bot & Panel",
desc:"WhatsApp Bot dan Panel Pterodactyl",
link:"bot-panel/index.html"
},

{
name:"Livery TOE3",
desc:"Koleksi livery Truckers Of Europe 3",
link:"livery/index.html"
},

{
name:"Top Up Game",
desc:"Top up berbagai game",
link:"topup/index.html"
},

{
name:"Roblox Development",
desc:"Jasa pembuatan script Roblox",
link:"roblox/index.html"
},

{
name:"Website Developer",
desc:"Pembuatan website dan logo",
link:"website/index.html"
},

{
name:"Poster Design",
desc:"Poster, logo, banner dan thumbnail",
link:"poster/index.html"
},

{
name:"VPS Hosting",
desc:"VPS dan Pterodactyl Panel",
link:"vps/index.html"
},

{
name:"Minecraft Server",
desc:"Setup dan optimasi server Minecraft",
link:"minecraft/index.html"
}

];

document
const searchInput = document.getElementById("globalSearch");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("keyup", function(){
    const value = this.value.toLowerCase().trim();

    searchResults.innerHTML = "";

    if(value === ""){
        searchResults.style.display = "none";
        return;
    }

    searchResults.style.display = "grid";

    services.forEach(service => {
        if(
            service.name.toLowerCase().includes(value) ||
            service.desc.toLowerCase().includes(value)
        ){
            searchResults.innerHTML += `
                <div class="result-card">
                    <a href="${service.link}">
                        <h3>${service.name}</h3>
                        <p>${service.desc}</p>
                    </a>
                </div>
            `;
        }
    });
});