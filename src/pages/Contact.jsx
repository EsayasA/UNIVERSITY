import React from "react";
import "./Contact.css";
export default function Contact() {
  return (
    <section>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or need assistance, feel free to reach out to
        us through any of the following methods:
      </p>
      <div className="contact-us">
        <div className="address-social">
          <div>
            <div className="email">
              <h3 className="fas fa-envelope"></h3>
              <p>
                <a href="mailto:esayasaregawi29@gmail.com">
                  esayasaregawi29@gmail.com
                </a>
              </p>
            </div>
            <div className="phone">
              <h3 className="fas fa-phone-alt"></h3>
              <p>
                <a href="tel:+251914792331">+251914792331</a>
              </p>
            </div>
            <div class="address">
              <h3 className="fas fa-map-marker-alt"></h3>

              <p>arat kilo university, addis ababa, Ethiopia</p>
            </div>
          </div>
          <div class="social-media">
            <h3 class="text-2xl font-medium mb-2">Follow Us</h3>
            <ul class="list-none space-y-2">
              <li>
                <a href="https://facebook.com/example" class="text-blue-500">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/example" class="text-blue-500">
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/example"
                  class="text-blue-500"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="contact-form mt-12">
          <h3 class="text-2xl font-medium mb-4">Send Us a Message</h3>
          <form
            action="#"
            method="post"
            class="space-y-4 flex flex-col gap-2.5"
          >
            <div>
              <label for="name" class="block text-lg font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-2xl p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="email" class="block text-lg font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-2xl bg-white p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="message" class="block text-lg font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-2xl p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-2xl py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
