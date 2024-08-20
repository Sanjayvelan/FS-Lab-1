let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.addToCart button').forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    const productElement = event.target.closest('.product-section');
    const product = {
        id: productElement.querySelector('img').src,
        name: productElement.querySelector('.product-name a').textContent,
        price: productElement.querySelector('.product-discounted-price').textContent,
        image: productElement.querySelector('img').src,
        quantity: 1
    };


    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to the cart.`);
}

if (window.location.href.includes('cart.html')) {
    displayCart();
}

function displayCart() {
    const cartContainer = document.createElement('div');
    cartContainer.className = 'cart-items';

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-image">
                <h3>${item.name}</h3>
                
                <p>Price: ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: Rs.${parseFloat(item.price.replace('Rs.', '')) * item.quantity}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        const totalAmount = cartItems.reduce((total, item) => total + (parseFloat(item.price.replace('Rs.', '')) * item.quantity), 0);
        const totalElement = document.createElement('h3');
        totalElement.textContent = `Total Amount: Rs.${totalAmount.toFixed(2)}`;
        cartContainer.appendChild(totalElement);
    }

    document.body.appendChild(cartContainer);

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(event) {
    const itemIndex = event.target.getAttribute('data-index');
    cart.splice(itemIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

const login = document.getElementById('btn');
login.addEventListener("click",function() {
    alert('Logged in successfully');
});
