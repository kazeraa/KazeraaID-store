const modal = document.getElementById("productModal");
const productCards = document.querySelectorAll(".product-card");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.querySelector(".modal-desc");
const variantGrid = document.querySelector(".variant-grid");

let selectedVariant = "";
let selectedPrice = 0;
let cart = [];

const productData = {
    "Panel Pterodactyl": {
        desc: "Panel Pterodactyl hosting bot/game dengan performa stabil.",
        variants: [
            ["1GB RAM", 2000],
            ["2GB RAM", 3000],
            ["3GB RAM", 4000],
            ["4GB RAM", 5000],
            ["5GB RAM", 6000],
            ["6GB RAM", 7000],
            ["7GB RAM", 8000],
            ["8GB RAM", 9000],
            ["9GB RAM", 10000],
            ["Unli RAM", 12000]
        ]
    },
    "Jasa Pembuatan Fitur": {
        desc: "Jasa tambah fitur bot WhatsApp sesuai request.",
        variants: [
            ["Fitur Simple", 5000],
            ["Fitur Medium", 10000],
            ["Fitur Premium", 20000]
        ]
    },
    "Sewa Bot & Jadibot": {
        desc: "Sewa bot WhatsApp aktif dan siap pakai.",
        variants: [
            ["Sewa 7 Hari", 5000],
            ["Sewa 30 Hari", 15000],
            ["Jadibot 30 Hari", 10000]
        ]
    },
    "Sell Script Bot": {
        desc: "Script bot WhatsApp siap pakai.",
        variants: [
            ["Script Basic", 25000],
            ["Script Premium", 50000],
            ["Script Full Fitur", 75000]
        ]
    },
    "Jasa Rename Script": {
        desc: "Jasa rename nama bot, owner, watermark, dan tampilan script.",
        variants: [
            ["Rename Basic", 5000],
            ["Rename Full", 10000]
        ]
    },
    "Domain & Hosting": {
        desc: "Layanan domain dan hosting untuk kebutuhan web atau bot.",
        variants: [
            ["Hosting Basic", 10000],
            ["Hosting Premium", 25000],
            ["Domain Custom", 30000]
        ]
    }
};

productCards.forEach(card => {
    card.addEventListener("click", () => {
        const productName = card.querySelector("h3").innerText;
        const data = productData[productName];

        modalTitle.innerText = productName;
        modalDesc.innerText = data.desc;
        variantGrid.innerHTML = "";

        data.variants.forEach((item, index) => {
            variantGrid.innerHTML += `
                <button onclick="selectVariant(this,'${item[0]}',${item[1]})" class="${index === 0 ? "active" : ""}">
                    ${item[0]}
                    <span>Rp ${item[1].toLocaleString("id-ID")}</span>
                </button>
            `;
        });

        selectedVariant = data.variants[0][0];
        selectedPrice = data.variants[0][1];
        modalPrice.innerText = "Rp " + selectedPrice.toLocaleString("id-ID");

        modal.classList.add("show");
    });
});

function closeModal(){
    modal.classList.remove("show");
}

function selectVariant(button, variant, price){
    document.querySelectorAll(".variant-grid button").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
    selectedVariant = variant;
    selectedPrice = price;
    modalPrice.innerText = "Rp " + price.toLocaleString("id-ID");
}

function addToCart(){
    cart.push({
        name: modalTitle.innerText,
        variant: selectedVariant,
        price: selectedPrice
    });

    renderCart();
    saveCart();
    closeModal();
}

function renderCart(){
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.variant}</p>
                </div>

                <div>
                    <strong>Rp ${item.price.toLocaleString("id-ID")}</strong>
                    <button onclick="removeCart(${index})">Hapus</button>
                </div>
            </div>
        `;
    });

    cartTotal.innerText = "Rp " + total.toLocaleString("id-ID");

    saveCart();
    updateCartBadge();
}

function removeCart(index){
    cart.splice(index, 1);
    renderCart();
    saveCart();
}

function updateCartBadge(){
    const badge = document.getElementById("cartBadge");

    if(cart.length > 0){
        badge.style.display = "flex";
        badge.innerText = cart.length;
    }else{
        badge.style.display = "none";
    }
}

function saveCart(){
    localStorage.setItem("kazeraaCart", JSON.stringify(cart));
}

function loadCart(){
    const savedCart = localStorage.getItem("kazeraaCart");

    if(savedCart !== null){
        cart = JSON.parse(savedCart);
    }

    renderCart();
}

function searchProduct(){
    const input = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const title = card.innerText.toLowerCase();
        card.style.display = title.includes(input) ? "flex" : "none";
    });
}

function showPage(pageId){
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    document.getElementById(pageId).classList.add("active-page");

    document.querySelectorAll(".bottom-nav a").forEach(nav => {
        nav.classList.remove("active");
    });
}

function goToPayment(){
    if(cart.length === 0){
        alert("Keranjang masih kosong boskuh!");
        return;
    }

    updatePaymentDetail();
    showPage("paymentPage");
}

const paymentData = {
    Dana: "089524501105",
    OVO: "belum terserdia",
    GoPay: "089524501105",
    QRIS: "https://files.catbox.moe/9apmz8.png"
};

function getCartTotal(){
    return cart.reduce((total, item) => total + item.price, 0);
}

function updatePaymentDetail(){
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const total = getCartTotal();

    document.getElementById("paymentName").innerText = payment;

    if(payment === "QRIS"){
        document.getElementById("paymentLabel").innerText = "Link QRIS:";
        document.getElementById("paymentNumber").innerText = paymentData.QRIS;
        document.querySelector(".copy-btn").innerText = "Salin Link QRIS";
    }else{
        document.getElementById("paymentLabel").innerText = "Nomor Pembayaran:";
        document.getElementById("paymentNumber").innerText = paymentData[payment];
        document.querySelector(".copy-btn").innerText = "Salin Nomor Pembayaran";
    }

    document.getElementById("paymentTotal").innerText =
        "Rp " + total.toLocaleString("id-ID");
}

function copyPayment(){
    const text = document.getElementById("paymentNumber").innerText;
    navigator.clipboard.writeText(text);
    alert("Berhasil disalin!");
}

function checkoutWhatsApp(){
    if(cart.length === 0){
        alert("Keranjang masih kosong boskuh!");
        return;
    }

    const nomorWa = "6289524501105";
    const payment = document.querySelector('input[name="payment"]:checked').value;

    let pesan = "Halo admin KazeraaID Store, saya mau order:%0A%0A";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        pesan += `${index + 1}. ${item.name}%0A`;
        pesan += `Varian: ${item.variant}%0A`;
        pesan += `Harga: Rp ${item.price.toLocaleString("id-ID")}%0A%0A`;
    });

    pesan += `Total: Rp ${total.toLocaleString("id-ID")}%0A`;
    pesan += `Metode Pembayaran: ${payment}%0A%0A`;
    pesan += "Mohon diproses ya admin.";

    window.location.href =
    `https://wa.me/6289524501105?text=${encodeURIComponent(pesan)}`;
}

document.querySelectorAll('input[name="payment"]').forEach(input => {
    input.addEventListener("change", updatePaymentDetail);
});

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

if(slides.length > 0){
    setInterval(() => {
        slides[currentSlide].classList.remove("active");

        currentSlide++;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        slides[currentSlide].classList.add("active");
    }, 3000);
}

modalTitle.innerText

loadCart();
