const favorites = JSON.parse(
localStorage.getItem("favorites")
) || [];

const grid =
document.getElementById("favoriteGrid");

if(favorites.length === 0){

    grid.innerHTML =
    `<div class="empty">
        Belum ada layanan favorit 😭
    </div>`;

}
else{

    grid.innerHTML = "";

    favorites.forEach(item=>{

        grid.innerHTML += `

        <div class="favorite-card">

            <h3>${item.name}</h3>

            <p>${item.desc}</p>

        </div>

        `;

    });

}