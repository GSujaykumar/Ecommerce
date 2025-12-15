function PromoBanner() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 rounded-3xl mx-6 md:mx-24 mt-16 shadow-xl overflow-hidden">
      
      {/* Decorative Circles */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Flat 50% Off This Weekend!
        </h2>
        <p className="mt-4 text-white/90 text-lg">
          Don’t miss out on our exclusive premium collection
        </p>
        <button className="mt-8 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition">
          Shop Sale
        </button>
      </div>
    </section>
  );
}

export default PromoBanner;
