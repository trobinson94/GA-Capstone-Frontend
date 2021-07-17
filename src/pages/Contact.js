import React from 'react';
import emailjs from 'emailjs-com';

export default function ContactUs(props) {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_2my0fh1', 'template_89agv9s', e.target, 'user_muSIZRdZvEiK0XXDcextY')
      .then((result) => {
          console.log(result.text);
          alert("Your email has been received!");
          props.history.push("/dashboard/")
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <>
      <h2 className="contact">Contact Me!</h2>
      <form className="contact-form" onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </>
  );
}