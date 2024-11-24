import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../../Config'; // Adjust the path as needed
import styles from '../css/ContactUs.module.css'; // Ensure you create this CSS file

const ContactUs = () => {
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email_id: '',
        phone_number: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        // Fetch the contact us data
        const fetchData = async () => {
            try {
                const response = await fetch(API.CONTACT_US());
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching contact us data:', error);
                setFetchError('Failed to fetch contact information. Please try again.');
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(API.postContactUs, formData);
            setSubmitSuccess(true);
            setFormData({
                first_name: '',
                last_name: '',
                email_id: '',
                phone_number: '',
                message: '',
            });
        } catch (error) {
            setSubmitError('Failed to submit the form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (fetchError) {
        return <p className={styles.errorMessage}>{fetchError}</p>; // Display fetch error
    }

    if (!data || !data.contact_us) {
        return <p>Loading...</p>; // Display loading message
    }

    const closeThankYou = () => {
        setSubmitSuccess(false);
        // onClose();
      };
    

    return (
        <>
        {submitSuccess && (
          <div className={styles.thankYouPopup}>
            <div className={styles.thankYouContent}>
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully. We will get back to you shortly.</p>
              <button onClick={closeThankYou}>Close</button>
            </div>
          </div>
        )}
        {!submitSuccess && (
        <section className={styles.contactUs}>
            <div className={styles.container}>
                {/* Contact Details */}
                <div className={styles.details}>
                    <h1 className={styles.title}>{data.contact_us.name}</h1>
                    <h2 className={styles.tagline}>We'd Love to Hear from You</h2>
                    <p className={styles.description} dangerouslySetInnerHTML={{ __html: data.contact_us.detail }}></p>
                    <div className={styles.info}>
                        {/* <p><strong>Address:</strong> {data.contact_us.contact_address}</p> */}
                        <p><strong>Phone:</strong> {data.contact_us.contact_phone}</p>
                        {/* <p><strong>Email:</strong> {data.contact_us.contact_email}</p> */}
                    </div>
                </div>

                {/* Contact Form */}
                <div className={styles.form}>
                    <h2 className={styles.formTitle}>Enquire Now</h2>
                    {submitSuccess && <p className={styles.successMessage}>Your message has been sent successfully!</p>}
                    {submitError && <p className={styles.errorMessage}>{submitError}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="first_name"
                            className={styles.input}
                            placeholder="First Name*"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="last_name"
                            className={styles.input}
                            placeholder="Last Name*"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                         <input
                            type="tel"
                            name="phone_number"
                            className={styles.input}
                            placeholder="Phone Number*"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email_id"
                            className={styles.input}
                            placeholder="Email"
                            value={formData.email_id}
                            onChange={handleChange} 
                        />
                       
                        <textarea
                            name="message"
                            className={styles.textarea}
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit" className={styles.button} disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
        )}
        </>
    );
};

export default ContactUs;
