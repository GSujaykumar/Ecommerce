/**
 * Generates a simple invoice for the user to download.
 * Since we are a frontend-only app, we will generate a nicely styled HTML
 * and convert it to a downloadable blob or trigger a print window.
 * 
 * @param {Object} order - The order object.
 */
export const downloadInvoice = (order) => {
  const invoiceContent = `
      <html>
        <head>
          <title>Invoice #${order.id}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 40px; }
            .logo { font-size: 24px; font-weight: bold; color: #111; }
            .invoice-details { text-align: right; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            .table th, .table td { padding: 12px; border-bottom: 1px solid #ddd; text-align: left; }
            .table th { background-color: #f8f9fa; }
            .total-section { text-align: right; margin-top: 20px; font-size: 18px; }
            .total { font-weight: bold; font-size: 22px; color: #111; }
            .footer { margin-top: 60px; text-align: center; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">OBITOSTORE</div>
            <div class="invoice-details">
              <h1>INVOICE</h1>
              <p><strong>Date:</strong> ${order.date}</p>
              <p><strong>Order ID:</strong> ${order.id}</p>
              <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            </div>
          </div>
  
          <div style="margin-bottom: 40px;">
            <h3>Bill To:</h3>
            <p>${order.shippingAddress?.name || 'Customer'}</p>
            <p>${order.shippingAddress?.address || 'Address not provided'}</p>
            <p>${order.shippingAddress?.city || ''} ${order.shippingAddress?.zip || ''}</p>
            <p>${order.shippingAddress?.email || ''}</p>
          </div>
  
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.quantity}</td>
                  <td>${item.priceFormatted}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
  
          <div class="total-section">
            <p>Subtotal: ${order.total}</p>
            <p class="total">Total Paid: ${order.total}</p>
          </div>
  
          <div class="footer">
            <p>Thank you for shopping with ObitoStore!</p>
            <p>If you have any questions, please contact support@obitostoredemo.com</p>
          </div>
  
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

  const blob = new Blob([invoiceContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) {
    win.focus();
  } else {
    alert("Please allow popups to download/print the invoice.");
  }
};
