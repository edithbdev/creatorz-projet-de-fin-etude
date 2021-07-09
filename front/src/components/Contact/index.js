import React from 'react';
import Page from 'src/components/Page';
import ContactPicture from 'src/assets/contact.jpg';
import './style.scss';

const Contact = () => (
  <Page>
    <div className="contact-picture">
      <img src={ContactPicture} alt="contact" />
    </div>
    <h1 className="title-contact">contact@creatorz.com</h1>
  </Page>
);

export default Contact;
