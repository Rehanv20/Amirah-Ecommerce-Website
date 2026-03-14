document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ─── ADD TO CART BUTTONS (product pages) ───
    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            let name  = this.dataset.name;
            let price = parseInt(this.dataset.price);
            // FIX: use absolute URL so image works on cart.html too
            let img   = new URL(this.dataset.img, window.location.href).href;
            let id    = this.dataset.id || name; // fallback to name if no id

            let existing = cart.find(item => item.id === id);

            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ id, name, price, img, qty: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();

            // 🔊 Sound
            let sound = document.getElementById("cartSound");
            if (sound) { sound.currentTime = 0; sound.play(); }

            // 💚 Popup
            let popup = document.getElementById("popup");
            if (popup) {
                popup.classList.add("show");
                setTimeout(() => popup.classList.remove("show"), 2000);
            }

            // 🚀 Flying image
            flyToCart(img, e.clientX, e.clientY);
        });
    });

    // ─── UPDATE CART COUNT ───
    function updateCartCount() {
        let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        let countBox = document.querySelector(".quantity");
        if (countBox) {
            countBox.innerText = totalQty;
            countBox.classList.add("bump");
            setTimeout(() => countBox.classList.remove("bump"), 300);
        }
    }

    updateCartCount();

});

// ─── FLYING IMAGE ANIMATION ───
function flyToCart(imgSrc, clickX, clickY) {
    let cartIcon = document.getElementById("cartIcon");
    if (!cartIcon) return;

    let flyImg = document.createElement("img");
    flyImg.src = imgSrc;
    flyImg.className = "fly-img";
    flyImg.style.left = clickX + "px";
    flyImg.style.top  = clickY + "px";
    document.body.appendChild(flyImg);

    let rect = cartIcon.getBoundingClientRect();
    setTimeout(() => {
        flyImg.style.left    = rect.left + "px";
        flyImg.style.top     = rect.top  + "px";
        flyImg.style.width   = "20px";
        flyImg.style.height  = "20px";
        flyImg.style.opacity = "0.2";
    }, 50);

    setTimeout(() => flyImg.remove(), 1000);
}

function printBill(){
   window.print();
}