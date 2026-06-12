function filterLivery(kategori, tombol){
    let cards = document.querySelectorAll(".card");
    let buttons = document.querySelectorAll(".kategori button");

    buttons.forEach(btn => btn.classList.remove("active"));
    tombol.classList.add("active");

    cards.forEach(card => {
        let cardKategori = card.getAttribute("data-kategori");
        card.style.display = (kategori === "all" || cardKategori === kategori) ? "block" : "none";
    });
}

function searchLivery(){
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let nama = card.getAttribute("data-nama").toLowerCase();
        card.style.display = nama.includes(input) ? "block" : "none";
    });
}

function openDetail(nama, truck, gambar, deskripsi, link){
    document.getElementById("modalNama").innerText = nama;
    document.getElementById("modalTruck").innerText = truck;
    document.getElementById("modalImg").src = gambar;
    document.getElementById("modalDesk").innerText = deskripsi;

    document.querySelector(".download").href = link;
    document.getElementById("detailModal").style.display = "flex";
}

function closeDetail(){
    document.getElementById("detailModal").style.display = "none";
}