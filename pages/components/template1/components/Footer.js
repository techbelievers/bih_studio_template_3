import React, { useEffect, useState } from 'react';
import { API } from '../../../../Config';
import styles from '../css/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn , faPinterest , faYoutube , faInstagram} from '@fortawesome/free-brands-svg-icons';

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

    if (loading) return <div className={styles.footer}>Loading...</div>;
    if (error) return <div className={styles.footer}>Error loading footer: {error.message}</div>;

    const { social_icons, g_setting } = footerData;

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerTop}>
                    <div className={styles.footerSocialIcons}>
                        <h2 className={styles.footerFollowUs}>Follow Us</h2>
                        {social_icons.map(icon => (
                            <a key={icon.id} href={icon.social_icon} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={
                                    icon.social_icon === 'fab fa-facebook-f' ? faFacebookF : 
                                    icon.social_icon === 'fab fa-twitter' ? faTwitter : 
                                    icon.social_icon === 'fab fa-linkedin-in' ? faLinkedinIn : 
                                    icon.social_icon === 'fab fa-instagram' ? faInstagram : 
                                    icon.social_icon === 'fab fa-youtube' ? faYoutube : 
                                    icon.social_icon === 'fab fa-pinterest-p' ? faPinterest : 
                                                      faLinkedinIn} />
                            </a>
                        ))}
                    </div>

                    <div className={styles.footerLogo}>
                        <img src={`${g_setting.logo}`} alt="Company Logo" />
                        {/* {g_setting.footer_agent_rera && 
                            <p className={styles.footerAgentRera}>{g_setting.footer_agent_rera}</p>
                        } */}
                    </div>

                    <div className={styles.footerContact}>
                        <h2> Contact Us</h2>
                        {/* <p>{g_setting.footer_address}</p> */}
                        <p>{g_setting.footer_phone}</p>
                        {/* <p>{g_setting.footer_email}</p> */}
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    {g_setting.footer_disclamer && 
                        <p className={styles.footerDisclaimer}>{g_setting.footer_disclamer}</p>
                    }
                     {g_setting.footer_agent_rera && 
                            <p className={styles.footerAgentRera}>{ "Agent MahaRera : "+ g_setting.footer_agent_rera}</p>
                        }
                    <p className={styles.footerCopyright}>{g_setting.footer_copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
