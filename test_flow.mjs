async function testFlow() {
    try {
        console.log('1. Logging in...');
        const userRes = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'sujaykumar35577@gmail.com',
                password: 'password123',
                fullName: 'TOBI',
                address: 'My Custom Address'
            })
        });
        const userData = await userRes.json();
        console.log('Login successful. User:', userData);
        const userId = userData.keycloakId || userData.id;

        console.log('2. Fetching products...');
        const productsRes = await fetch('http://localhost:8080/api/products');
        const productsData = await productsRes.json();
        const product = productsData[0];
        console.log('Product selected:', product.name);

        console.log('3. Placing Order...');
        const orderRes = await fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User-Id': userId
            },
            body: JSON.stringify({
                orderLineItemsDtoList: [{
                    skuCode: product.skuCode,
                    price: product.price,
                    quantity: 1
                }],
                email: 'sujaykumar35577@gmail.com',
                mobileNumber: '+91 9876543210'
            })
        });

        // Order API returns a plain string (UUID)
        const orderId = await orderRes.text();
        console.log('Order placed successfully. Order ID:', orderId);

        console.log('4. Verifying Payment...');
        const paymentRes = await fetch(`http://localhost:8080/api/payment/order/${orderId}`);
        const paymentData = await paymentRes.json();
        console.log('Payment verification:', paymentData);

        console.log('Flow complete.');

    } catch (error) {
        console.error('API Error:', error);
    }
}

testFlow();
