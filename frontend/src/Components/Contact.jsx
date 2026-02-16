import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] py-32 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 space-y-16">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-[var(--color-text-primary)] dark:text-white mb-4">
            Contact <span className="text-indigo-600 dark:text-indigo-400">Us</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] dark:text-gray-400 max-w-2xl mx-auto">
            Questions, support, or inquiries? Reach out to our premium support team.
            We're here to help make your shopping experience seamless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-10">
            <div className="flex items-start gap-6 rounded-2xl shadow-lg p-6 hover:shadow-xl transition bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800">
              <div className="p-4 bg-black dark:bg-white text-white dark:text-black rounded-full">
                <FiMapPin size={28} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Address</h4>
                <p className="text-gray-600 dark:text-gray-400">123 Luxe Street, Fashion City, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start gap-6 rounded-2xl shadow-lg p-6 hover:shadow-xl transition bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800">
              <div className="p-4 bg-black dark:bg-white text-white dark:text-black rounded-full">
                <FiMail size={28} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">support@luxemart.com</p>
              </div>
            </div>
            <div className="flex items-start gap-6 rounded-2xl shadow-lg p-6 hover:shadow-xl transition bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800">
              <div className="p-4 bg-black dark:bg-white text-white dark:text-black rounded-full">
                <FiPhone size={28} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="p-12 rounded-3xl shadow-lg space-y-6 hover:shadow-xl transition bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
            ></textarea>
            <button className="w-full bg-black dark:bg-white text-white dark:text-black p-4 rounded-xl font-semibold text-lg hover:opacity-90 transition">
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
