import React from "react";

export default function About() {
  return (
    <div>
      <h1 className="hla">
        <i class="fas fa-align-justify" /> About
      </h1>
      <p>123</p>
      <div className="contactus">
        <h1 className="hla">
          <i class="far fa-address-card" /> Contact
        </h1>
        <a className="btn ww" href="tel:+3800951996310">
          <i className="fas fa-phone" /> Call Us
        </a>
        <br />
        <a className="btn ww" href="mailto:fawzinajjar@hotmail.com">
          <i className="fas fa-envelope" /> Email Us
        </a>
        <br />
        <a
          href="https://wa.me/003800951996310?text=Hello,%20Contacting%20you%20from%20Tasker%20Website"
          className="btn wcolor ww"
        >
          <i className="fab fa-whatsapp" /> Whatsapp{" "}
        </a>
      </div>
      <div className="contactus">
        <h1 className="hla">
          <i class="fas fa-users" /> Follow
        </h1>
        <ul>
          <li className="inli">
            <a href="https://www.facebook.com/xes3x">
              <i class="fab fa-facebook size1" />
            </a>
          </li>
          <li className="inli">
            <a href="https://www.github.com/fawzinajjar">
              <i class="fab fa-github size1" />
            </a>
          </li>
          <li className="inli">
            <a href="https://www.github.com/fawzinajjar">
              <i class="fab fa-twitter size1" />
            </a>
          </li>
          <li className="inli">
            <a href="https://www.github.com/fawzinajjar">
              <i class="fab fa-linkedin-in size1" />
            </a>
          </li>
          <li className="inli">
            <a href="https://www.github.com/fawzinajjar">
              <i class="fab fa-instagram size1" />
            </a>
          </li>
          <li className="inli">
            <a href="https://www.github.com/fawzinajjar">
              <i class="fas fa-rss size1" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
