import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', path: '/home' },
      { label: 'Smart Assistant', path: '/smart-assistant' },
      { label: 'Campus Map', path: '/campus-map' },
      { label: 'Dashboard', path: '/student-dashboard' }
    ],
    support: [
      { label: 'Help Center', path: '/home' },
      { label: 'Contact Us', path: '/home' },
      { label: 'Privacy Policy', path: '/home' },
      { label: 'Terms of Service', path: '/home' }
    ],
    connect: [
      { label: 'Facebook', icon: 'Facebook' },
      { label: 'Twitter', icon: 'Twitter' },
      { label: 'Instagram', icon: 'Instagram' },
      { label: 'LinkedIn', icon: 'Linkedin' }
    ]
  };

  return (
    <footer className="bg-card border-t border-border py-8 md:py-12 lg:py-16">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <Icon name="GraduationCap" size={24} color="var(--color-primary-foreground)" />
              </div>
              <span className="text-lg md:text-xl font-heading font-semibold text-foreground">
                SmartCampus
              </span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Your intelligent companion for seamless campus navigation and academic excellence.
            </p>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4 md:mb-6">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link?.path}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4 md:mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link?.path}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4 md:mb-6">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {footerLinks?.connect?.map((social, index) => (
                <button
                  key={index}
                  className="w-10 h-10 md:w-12 md:h-12 bg-muted hover:bg-primary rounded-md flex items-center justify-center transition-smooth group"
                  aria-label={social?.label}
                >
                  <Icon
                    name={social?.icon}
                    size={20}
                    className="text-muted-foreground group-hover:text-primary-foreground transition-smooth md:w-6 md:h-6"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm md:text-base text-muted-foreground text-center md:text-left">
              &copy; {currentYear} SmartCampusAssistant. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/home"
                className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth"
              >
                Privacy
              </Link>
              <Link
                to="/home"
                className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth"
              >
                Terms
              </Link>
              <Link
                to="/home"
                className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;