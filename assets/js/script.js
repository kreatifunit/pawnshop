let cart = [];

// Initialize or retrieve the cart from local storage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save the cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productName, price) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        // If product already exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product is new, add it to the cart
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    saveCart(cart);
    alert(`${productName} has been added to your cart.`);
    viewCart(); // Refresh the cart view
}

// View cart function
function viewCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSummary = document.querySelector('.cart-summary');
    const billingAddress = document.querySelector('.billing-address');
    const paymentMethods = document.querySelector('.payment-methods');
    const deliveryOptions = document.querySelector('.delivery-options');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    if (cart.length === 0) {
        // Show empty cart message and hide other sections
        emptyCartMessage.style.display = 'none';
        cartSummary.style.display = 'none';
        billingAddress.style.display = 'none';
        paymentMethods.style.display = 'none';
        deliveryOptions.style.display = 'none';
        cartTotalContainer.innerHTML = 'Total: R 0.00';
        placeOrderBtn.disabled = true;
    } else {
        // Show cart items and update total
        emptyCartMessage.style.display = 'none';
        cartSummary.style.display = 'block';
        billingAddress.style.display = 'block';
        paymentMethods.style.display = 'block';
        deliveryOptions.style.display = 'block';

        cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';

    // Create a div for product details and quantity buttons to ensure alignment
    cartItemDiv.innerHTML = `
        <div class="cart-item-details">
            <span class="cart-item-name">${item.name} - R ${item.price} x ${item.quantity} = R ${itemTotal.toFixed(2)}</span>
            <div class="quantity-buttons">
                <button class="quantity-btn" onclick="changeQuantity('${item.name}', -1)">-</button>
                <button class="quantity-btn" onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
        </div>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
});


        cartTotalContainer.innerHTML = `Total: R ${total.toFixed(2)}`;
        updatePlaceOrderButton(); // Update the Place Order button
    }
    
    document.getElementById('cartModal').style.display = 'block';
    updatePlaceOrderButton(); // Update Place Order button state
}

// Change quantity of cart items
function changeQuantity(productName, change) {
    const cart = getCart();
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        cart[productIndex].quantity += change;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1); // Remove item if quantity is 0
        }
    }

    saveCart(cart);
    viewCart(); // Refresh cart view
}

// Clear cart function
function clearCart() {
    localStorage.removeItem('cart');
    viewCart(); // Refresh cart view
}

// Update Delivery Cost based on the selected option
function updateDeliveryCost() {
	const cart = getCart(); // Get the current cart items
    const deliveryOption = document.getElementById('deliveryOption').value; // Get selected delivery option from dropdown
    let additionalCost = 0;

    if (deliveryOption === 'delivery') {
        additionalCost = 19.99; // Example delivery cost
    }

    // Display delivery cost
    const deliveryCostElement = document.getElementById('additionalCost');
    if (additionalCost) {
        deliveryCostElement.style.display = 'block';
        deliveryCostElement.textContent = `Delivery Cost: R ${additionalCost.toFixed(2)}`;
    } else {
        deliveryCostElement.style.display = 'none';
    }

    // Recalculate total with delivery cost
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + additionalCost;
    document.getElementById('cartTotal').textContent = `Total: R ${total.toFixed(2)}`;

    updatePlaceOrderButton();
}

// Update Payment Method details when selected
function updatePaymentDetails() {
    const paymentMethod = document.getElementById('paymentMethod').value; // Get selected payment method from dropdown

    // Show details based on selected payment method
    if (paymentMethod === 'directTransfer') {
        document.getElementById('bankDetails').style.display = 'block';
        document.getElementById('paypalDetails').style.display = 'none';
    } else if (paymentMethod === 'paypal') {
        document.getElementById('paypalDetails').style.display = 'block';
        document.getElementById('bankDetails').style.display = 'none';
    }
}

// Enable or disable the Place Order button based on form input validity
function updatePlaceOrderButton() {
    // Get the values of the input fields and dropdowns
    const billingName = document.getElementById('billingName').value.trim();
    const billingEmail = document.getElementById('billingEmail').value.trim();
    const billingAddress = document.getElementById('billingAddress').value.trim();
    const billingPhone = document.getElementById('billingPhone').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    const deliveryOption = document.getElementById('deliveryOption').value;

    // Check if all fields are filled and if a payment method and delivery option are selected
    const isFormValid = billingName && billingEmail && billingAddress && billingPhone && paymentMethod && deliveryOption;

    // Enable or disable the Place Order button based on the form validity
    document.getElementById('placeOrderBtn').disabled = !isFormValid;
}


// Handle the "Place Order" action
function placeOrder() {
    const cart = getCart();
    const billingName = document.getElementById('billingName').value;
    const billingEmail = document.getElementById('billingEmail').value;
    const billingAddress = document.getElementById('billingAddress').value;
    const billingPhone = document.getElementById('billingPhone').value;
    const paymentMethod = document.getElementById('paymentMethod').value; // Get selected payment method
    const deliveryOption = document.getElementById('deliveryOption').value; // Get selected delivery option

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    let message = `Hello! I would like to place an order for the following items:\n\n`;
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${item.name} - R ${item.price} x ${item.quantity} = R ${itemTotal.toFixed(2)}\n`;
    });

    const additionalCost = deliveryOption === 'delivery' ? 50 : 0;
    message += `\nDelivery: ${deliveryOption} (R ${additionalCost.toFixed(2)})\n`;
    message += `\nTotal: R ${(total + additionalCost).toFixed(2)}\n`;
    message += `\nBilling Info:\nName: ${billingName}\nEmail: ${billingEmail}\nAddress: ${billingAddress}\nPhone: ${billingPhone}\n`;
    message += `Payment Method: ${paymentMethod}\n`;

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/27726962588?text=${encodedMessage}`;

    // Open WhatsApp link in a new tab
    window.open(whatsappLink, '_blank');

    // Clear the cart after placing the order
    localStorage.removeItem('cart');
    alert("Your order has been placed!");
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Hamburger menu for mobile view
document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
});

// Close menu
document.getElementById('close').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.remove('show');
});


function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase();
        const productCategory = product.getAttribute('data-category');

        const matchesSearch = productName.includes(searchInput);
        const matchesCategory = categoryFilter === "" || productCategory === categoryFilter;

        if (matchesSearch && matchesCategory) {
            product.style.display = ''; // Show product
        } else {
            product.style.display = 'none'; // Hide product
        }
    });
}

function changeImage(newImage) {
    const productImage = event.target.closest('.product').querySelector('.product-image');
    productImage.src = newImage; // Change the image source
}

// EXTERNAL PAGE PRODUCT SEARCH // 
let products = [];

async function fetchProducts() {
    // Fetch data from men's, women's, and accessories pages
    const menResponse = await fetch('men.html');  // Fetch men's clothing data
    const menText = await menResponse.text();

    const womenResponse = await fetch('women.html');  // Fetch women's clothing data
    const womenText = await womenResponse.text();

    const accessoriesResponse = await fetch('accessories.html');  // Fetch accessories data
    const accessoriesText = await accessoriesResponse.text();

    // Parse the HTML for each category
    const menDOM = new DOMParser().parseFromString(menText, 'text/html');
    const womenDOM = new DOMParser().parseFromString(womenText, 'text/html');
    const accessoriesDOM = new DOMParser().parseFromString(accessoriesText, 'text/html');

    // Extract product data from the men's clothing page
    menDOM.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('h3').textContent;
        const price = parseFloat(product.querySelector('strong').textContent.replace('R ', ''));
        const imageUrl = product.querySelector('img').src;
        products.push({ name, price, imageUrl, category: 'Men' });  // Add a category field for clarity
    });

    // Extract product data from the women's clothing page
    womenDOM.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('h3').textContent;
        const price = parseFloat(product.querySelector('strong').textContent.replace('R ', ''));
        const imageUrl = product.querySelector('img').src;
        products.push({ name, price, imageUrl, category: 'Women' });  // Add a category field for clarity
    });

    // Extract product data from the accessories page
    accessoriesDOM.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('h3').textContent;
        const price = parseFloat(product.querySelector('strong').textContent.replace('R ', ''));
        const imageUrl = product.querySelector('img').src;
        products.push({ name, price, imageUrl, category: 'Accessories' });  // Add a category field for clarity
    });
}

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = products.filter(product => product.name.toLowerCase().includes(query));
    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    const clearButton = document.getElementById('clear-button');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No products found.</p>';
        clearButton.style.display = 'none'; // Hide clear button if no results
        return;
    }

    results.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p><strong>R ${product.price.toFixed(2)}</strong></p>
                <button onclick="addToCart('${product.name}', ${product.price})" class="add-to-cart-button">Add to Cart</button>
            </div>
        `;
        resultsContainer.appendChild(div);
    });

    clearButton.style.display = 'inline'; // Show clear button when results are present
}

function clearResults() {
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('clear-button').style.display = 'none'; // Hide clear button
}

// Initialize products on window load
window.onload = fetchProducts;

// Attach the search function to the button click event
document.getElementById('search-button').addEventListener('click', searchProducts);
