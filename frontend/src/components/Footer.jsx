import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaTiktok, FaPinterest } from 'react-icons/fa';

const footerClasses = "bg-black text-white py-8";
const gridClasses = "container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4";
const listClasses = "mt-4 space-y-2";
const flexClasses = "container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-4";
const flexItemsClasses = "flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left";
const flexSpaceClasses = "flex space-x-4 mt-4 md:mt-0 justify-center md:justify-end";
const textCenterClasses = "text-center text-sm mt-4";

const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        console.log('Subscribed with email:', email);
        setMessage('Thank you for subscribing!');
        setEmail('');
    };

    return (
        <footer className={footerClasses}>
            {/* Main Footer Links */}
            <div className={gridClasses}>
                <FooterSection 
                    title="Products" 
                    links={[
                        { text: "Curtains & Drapes", url: "/curtains-drapes" },
                        { text: "Blinds & Shades", url: "/blinds-shades" },
                        { text: "Smart Home", url: "/smart-home" },
                        { text: "Furnishings", url: "/furnishings" },
                        { text: "Projects", url: "/projects" },
                        { text: "Franchise", url: "/franchise" }
                    ]} 
                />
                <FooterSection 
                    title="Design Assistance" 
                    links={[
                        { text: "Interior Design Services", url: "/design-services" },
                        { text: "Tools & Guides", url: "/tools-guides" }
                    ]} 
                />
                <FooterSection 
                    title="About Us" 
                    links={[
                        { text: "Our Story", url: "/our-story" },
                        { text: "Completed Projects", url: "/completed-projects" },
                        { text: "Blog & Media Coverage", url: "/blog-media" }
                    ]} 
                />
                <FooterSection 
                    title="Customer Service" 
                    links={[
                        { text: "Find Your Store", url: "/stores" },
                        { text: "Order Tracking", url: "/order-tracking" },
                        { text: "Contact Us", url: "/contact-us" },
                        { text: "FAQs", url: "/faqs" },
                        { text: "Returns & Refunds", url: "/returns-refunds" }
                    ]} 
                />
            </div>

            {/* Social Media Links and Subscribe Form */}
            <div className="mt-8 border-t border-gray-700 pt-4">
                <div className={flexClasses}>
                    {/* Contact Info */}
                    <div className={flexItemsClasses}>
                        <span className="text-gray-400">Contact Number:<br/>+216 50 929 292</span>
                        <span className="text-gray-400">Support Services:<br/> bargaoui_rideaux@yahoo.fr</span>
                    </div>

                    {/* Payment Icons */}
                    <div className={flexSpaceClasses}>
                        <img aria-hidden="true" alt="visa" src="https://openui.fly.dev/openui/24x24.svg?text=💳" />
                        <img aria-hidden="true" alt="mastercard" src="https://openui.fly.dev/openui/24x24.svg?text=💳" />
                        <img aria-hidden="true" alt="amex" src="https://openui.fly.dev/openui/24x24.svg?text=💳" />
                    </div>
                </div>
            </div>

            {/* Social Media and Subscribe */}
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-4 space-y-4 md:space-y-0">
                {/* Subscribe Form */}
                <form className="hidden md:flex flex-col sm:flex-row items-center w-full sm:w-auto" onSubmit={handleSubscribe}>
    <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="py-2 px-4 w-full sm:w-64 flex-grow rounded-l-full border border-gray-300 text-black bg-white"
        required
    />
    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-r-full hover:bg-blue-600 transition-all duration-150">
        Subscribe
    </button>
</form>
                {message && <p className="text-green-500 text-center mt-2">{message}</p>}

                {/* Social Media Links */}
                <div className="flex space-x-4">
                    <a href="https://www.instagram.com/bargaoui_rideaux_tahar/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all duration-150">
                        <FaInstagram className="w-8 h-8" />
                    </a>
                    <a href="https://www.youtube.com/@BargaouiRideauxTahar" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all duration-150">
                        <FaYoutube className="w-8 h-8" />
                    </a>
                    <a href="https://www.tiktok.com/@bargaouirideauxtahar" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all duration-150">
                        <FaTiktok className="w-8 h-8" />
                    </a>
                    <a href="https://www.pinterest.com/BargaouiRideauxTahar/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all duration-150">
                        <FaPinterest className="w-8 h-8" />
                    </a>
                </div>
            </div>

            {/* Copyright and Policies */}
            <div className={textCenterClasses}>
                <p>&copy; {new Date().getFullYear()} Bargaoui Rideaux Tahar, All Rights Reserved</p>
                <p>Accessibility | Privacy Policy | Terms and Conditions | Cookie Policy</p>
            </div>
        </footer>
    );
};

const FooterSection = ({ title, links }) => {
    return (
        <div>
            <h2 className="font-bold text-lg">{title}</h2>
            <ul className={listClasses}>
                {links.map((link, index) => (
                    <li key={index}>
                        <RouterLink 
                            to={link.url} 
                            className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
                        >
                            {link.text}
                        </RouterLink>
                    </li>
                ))} 
            </ul>
        </div>
    );
};

export default Footer;
