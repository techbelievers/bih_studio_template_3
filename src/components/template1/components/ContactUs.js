import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../Config'; // Adjust the path as needed
import '../css/ContactUs.css'; // Ensure you create this CSS file

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
        return <p className="template1-error-message">{fetchError}</p>; // Display fetch error
    }

    if (!data || !data.contact_us) {
        return <p>Loading...</p>; // Display loading message
    }

    return (
        <section className="template1-contact-us">
            <div className="template1-contact-container">
                {/* Contact Details */}
                <div className="template1-contact-details">
                    <h1 className="template1-contact-title">{data.contact_us.name}</h1>
                    <h2 className="template1-contact-tagline">We'd Love to Hear from You</h2>
                    <p className="template1-contact-description" dangerouslySetInnerHTML={{ __html: data.contact_us.detail }}></p>
                    <div className="template1-contact-info">
                        <p><strong>Address:</strong> {data.contact_us.contact_address}</p>
                        <p><strong>Phone:</strong> {data.contact_us.contact_phone}</p>
                        <p><strong>Email:</strong> {data.contact_us.contact_email}</p>
                    </div>
                    {/* <div className="contact-map" dangerouslySetInnerHTML={{ __html: data.contact_us.contact_map }}></div> */}
                </div>

                {/* Contact Form */}
                <div className="template1-contact-form">
                    <h2 className="template1-form-title">Enquire Now</h2>
                    {submitSuccess && <p className="template1-success-message">Your message has been sent successfully!</p>}
                    {submitError && <p className="template1-error-message">{submitError}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name*"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name*"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email_id"
                            placeholder="Email*"
                            value={formData.email_id}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone_number"
                            placeholder="Phone Number*"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message*"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
