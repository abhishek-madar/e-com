function loadCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    if(cart.length === 0){
        cartItems.innerHTML = "<h3>Your cart is empty!</h3>";
        document.getElementById("totalItems").innerText = 0;
        document.getElementById("totalPrice").innerText = "$0";
        return;
    }

    let totalPrice = 0;

    cart.forEach((item,index)=>{
        totalPrice += item.price * item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price}</p>
                </div>

                <div class="qty-controls">
                    <button onclick="updateQty(${index},-1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty(${index},1)">+</button>
                </div>

                <i class="fa fa-trash remove-btn" onclick="removeItem(${index})"></i>
            </div>
        `;
    });

    document.getElementById("totalItems").innerText = cart.length;
    document.getElementById("totalPrice").innerText = "$" + totalPrice;
}

function updateQty(index,value){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].qty += value;
    if(cart[index].qty < 1) cart[index].qty = 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

window.onload = loadCart;