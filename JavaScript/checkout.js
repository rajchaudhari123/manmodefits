window.addEventListener("load", function () {
    sendToWhatsApp(); // Send order info
    clearCart(); // Clear cart after sending
    showCheckAnimation();
    addDate();
  
    let total = localStorage.getItem('total price') || "0.00";
    document.getElementById("total_price").innerText = `₹${parseFloat(total).toFixed(2)}`;
  });
  
  function showCheckAnimation() {
    const container = document.getElementById('checkoutIcon');
    container.innerHTML = '';
    const animDiv = document.createElement('div');
    animDiv.style.width = '200px';
    animDiv.style.height = '200px';
    container.appendChild(animDiv);
  
    lottie.loadAnimation({
      container: animDiv,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'json/AnimationCheckoutPage.json'
    });
  }
  
  function addDate() {
    let date = document.getElementById("order_date");
    const now = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    date.innerHTML = ` ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  }
  
  function clearCart() {
    localStorage.removeItem('cart');
    localStorage.removeItem('total price');
    localStorage.removeItem('user'); // Optional if you're saving user info
  }
  
  function sendToWhatsApp() {
    const phoneNumber = "919876543210"; // Your WhatsApp number
  
    // Fetch user info from localStorage (you must save this earlier)
    const user = JSON.parse(localStorage.getItem('user')) || {
      name: "Customer",
      phone: "Not provided",
      address: "No address provided"
    };
  
    // Get cart data
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.length) return;
  
    let total = localStorage.getItem('total price') || "0.00";
  
    // Format cart items
    let items = cart.map((item, i) => {
      return `${i + 1}) ${item.name} - Qty: ${item.quantity} - Price: ₹${item.price}`;
    }).join('\n');
  
    // WhatsApp message
    const message = `🛍️ *New Order Received!*\n\n👤 *Name:* ${user.name}\n📞 *Phone:* ${user.phone}\n🏠 *Address:* ${user.address}\n\n🛒 *Items Ordered:*\n${items}\n\n💰 *Total:* ${parseFloat(total).toFixed(2)} ₹\n📅 *Date:* ${new Date().toLocaleDateString()}`;
  
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }
  
  function backHome() {
    window.location.href = "index.html";
  }
  function sendOrderViaWhatsApp() {
    const orderId = document.getElementById("id_order").innerText;
    const total = document.getElementById("total_price").innerText;
    const date = new Date().toLocaleDateString(); // Set as needed
  
    // Example cart items (this should be generated dynamically)
    const cartItems = [
      { name: "Black T-shirt", qty: 2, price: "20.00" },
      { name: "Leather Bag", qty: 1, price: "50.00" }
    ];
  
    // Format message
    let message = `🛍️ New Order Details:\n`;
    message += `📦 Order ID: ${orderId}\n`;
    message += `📅 Date: ${date}\n`;
    message += `\n🧾 Items:\n`;
    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.name} - ${item.qty} pcs - ${item.price}\n`;
    });
    message += `\n💰 Total: ${total}\n`;
    message += `\nPlease confirm your order.`
  
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
  
    // Replace with seller's WhatsApp number (in international format, no + or dashes)
    const sellerNumber = "919999999999"; 
  
    // Create final WhatsApp link
    const whatsappLink = `https://wa.me/${sellerNumber}?text=${encodedMessage}`;
  
    // Redirect user to WhatsApp chat
    window.location.href = whatsappLink;
  }
  
  