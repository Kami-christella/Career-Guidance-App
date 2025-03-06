import React from "react";
import '../styles/Contact.css';
import "bootstrap/dist/css/bootstrap.min.css"; // If using Bootstrap
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS

import { FaLocationDot } from "react-icons/fa6";


function Contact() {
  const sendEmail = (event) => {
    event.preventDefault();
    // Implement email sending functionality here
    console.log("Email Sent!");
    event.target.reset(); // Reset form after submission
  };

  return (
    <section className="contact1">
      <div className="content1">
        <h2 >Book Us</h2>
        <p>
          Ready to experience our exceptional services? Booking with us is quick
          and easy! Simply fill out the form and schedule your appointment or
          inquire about our services. We look forward to serving you!
        </p>
      </div>
      <div className="container1">
        <div className="contactInfo1">
          <div className="box1">
            <div className="icon1">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="text1">
              <h3>Address</h3>
              <p>
                Kisimenti, KG 176st,
                <br />
                Kigali - RWANDA
              </p>
            </div>
          </div>
          <div className="box1">
            <div className="icon1">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div className="text1">
              <h3>Phone</h3>
              <p>+250 783 533 383 / +250 788 302 183</p>
            </div>
          </div>
          <div className="box1">
            <div className="icon1">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="text1">
              <h3>Email</h3>
              <p>cmmgrouprwanda@gmail.com</p>
            </div>
          </div>
          <h2 className="txt1">Connect with Us</h2>
          <ul className="sci1">
            <li>
              <a href="#">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="contactForm1">
          <form onSubmit={sendEmail}>
            <h2>Send Message</h2>
            <div className="inputBox1">
              <input type="text" id="name" required />
              <span>Full Name</span>
            </div>
            <div className="inputBox1">
              <input type="email" id="email" required />
              <span>Email</span>
            </div>
            <div className="inputBox1">
              <input type="number" id="phone" required />
              <span>Phone Number</span>
            </div>
            <div className="inputBox1">
              <textarea id="message" required></textarea>
              <span>Type your Message...</span>
            </div>
            <div className="inputBox1">
              <input type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
