import React, { useEffect, useState } from 'react';
import { API } from '../../../Config';
import '../css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await fetch(API.FOOTER());
                const data = await response.json();
                setFooterData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchFooterData();
    }, []);

    if (loading) return <div className="footer">Loading...</div>;
    if (error) return <div className="footer">Error loading footer: {error.message}</div>;

    const { social_icons, g_setting } = footerData;

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-social-icons">
                        <h2 className="footer-follow-us">Follow Us</h2>
                        {social_icons.map(icon => (
                            <a key={icon.id} href={icon.social_url} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={icon.social_icon === 'Facebook' ? faFacebookF : 
                                                          icon.social_icon === 'Twitter' ? faTwitter : 
                                                          faLinkedinIn} />
                            </a>
                        ))}
                    </div>

                    <div className="footer-logo">
                        <img src={`path/to/logo/${g_setting.logo}`} alt="Company Logo" />
                        {g_setting.footer_agent_rera && 
                            <p className="footer-agent-rera">{g_setting.footer_agent_rera}</p>
                        }
                    </div>

                    <div className="footer-contact">
                        <h2>Contact Us</h2>
                        <p>{g_setting.footer_address}</p>
                        <p>{g_setting.footer_phone}</p>
                        <p>{g_setting.footer_email}</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    {g_setting.footer_disclamer && 
                        <p className="footer-disclaimer">{g_setting.footer_disclamer}</p>
                    }
                    <p className="footer-copyright">{g_setting.footer_copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
