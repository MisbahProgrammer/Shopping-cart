// cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
//open cart
cartIcon.onclick = () => {
    cart.classList.toggle("active");
}
//close cart
closeCart.onclick = () => {
    cart.classList.toggle("active");
}


// Cart working

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//making function
function ready() {
    // remove  items from cart
    let removebtn = document.querySelectorAll('.cart-remove');
    console.log(removebtn);
    for (let i = 0; i < removebtn.length; i++) {
        let button = removebtn[i];
        button.addEventListener("click", removeCartItem);
    }
    //quantity changes
    let quantityInput = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }
    //Add items to card
    let addCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //Buy button works
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyBtnClicked);

}
function buyBtnClicked(){
    alert('Your Order is Placed');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}
//remove items for cart
function removeCartItem(event) {
    let buttonclicked = event.target
    buttonclicked.parentElement.remove();
    updatetotal();
}
//Quantity changes
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value < 0) {
        input.value = 1;
    }
    updatetotal()
}
// add to cart
function addCartClicked(event) {
    var button = event.target
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal()
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText == title){
        alert("You have already add this this item to cart");
        return;
    }
    
}
let cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" class="cart-quantity" value="1">
                    </div>
                    <!--remove cart-->
                    <i class="fa-solid fa-trash cart-remove"></i>
`
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}
// update total
function updatetotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //if price contains some cents then
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    

}