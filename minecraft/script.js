function searchMinecraft(){

    const input =
    document.getElementById("searchInput")
    .value.toLowerCase();

    const cards =
    document.querySelectorAll(".project-card");

    cards.forEach(card=>{

        const title =
        card.innerText.toLowerCase();

        card.style.display =
        title.includes(input)
        ? "block"
        : "none";

    });

}

function openDetail(title,desc,features){

    document.getElementById("detailTitle")
    .innerText = title;

    document.getElementById("detailDesc")
    .innerText = desc;

    const list =
    document.getElementById("detailFeatures");

    list.innerHTML = "";

    features.split(",").forEach(item=>{

        list.innerHTML +=
        `<li>${item.trim()}</li>`;

    });

    document
    .getElementById("detailModal")
    .classList.add("show");

}

function closeDetail(){

    document
    .getElementById("detailModal")
    .classList.remove("show");

}