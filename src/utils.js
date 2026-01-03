
// Currency formatter for Indian Rupee
export const formatPrice = (priceInUSD) => {
    // Approximate conversion rate: 1 USD = 83 INR (Fixed for consistency)
    const rate = 83;
    const priceInINR = priceInUSD * rate;

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(priceInINR);
};
