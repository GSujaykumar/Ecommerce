import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-32 bg-gray-50 py-24  bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)]">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 space-y-16">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold  mb-4 dark:(var(--color-dark-text-secondary)) ">
            Contact <span className="dark:(var(--color-dark-text-primary))">Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Questions, support, or inquiries? Reach out to our premium support team.
            We're here to help make your shopping experience seamless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 ">

          {/* Contact Info */}
          <div className="space-y-10 ">
            <div className="flex items-start gap-6 rounded-2xl shadow-lg p-6 hover:shadow-xl transition dark:border dark:border-gray-700">
              <div className="p-4 bg-black text-white rounded-full">
                <FiMapPin size={28} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg dark:(var(--color-dark-text-primary))">Address</h4>
                <p className="dark:(var(--color-dark-text-primary))">123 Luxe Street, Fashion City, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start gap-6 dark:border-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="p-4 bg-black text-white rounded-full">
                <FiMail size={28} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Email</h4>
                <p className="text-gray-600">support@luxemart.com</p>
              </div>
            </div>
            <div className="flex items-start gap-6  rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="p-4 bg-black text-white rounded-full">
                <FiPhone size={28} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="dark:border-gray-700 p-12 rounded-3xl shadow-lg space-y-6 hover:shadow-xl transition">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
            <button className="w-full bg-black text-white p-4 rounded-xl font-semibold text-lg hover:bg-gray-900 transition">
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
