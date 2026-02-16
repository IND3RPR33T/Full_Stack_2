import React from 'react';
import { useLocation } from 'react-router-dom';
import PillNav from './PillNav';
import Icon from '../AppIcon';

const Navigation = () => {
    const location = useLocation();

    const navigationItems = [
        { label: 'Home', href: '/home' },
        { label: 'Dashboard', href: '/student-dashboard' },
        { label: 'Campus Map', href: '/campus-map' },
        { label: 'Events', href: '/events-notices' },
        { label: 'Settings', href: '/settings' }
    ];

    // Logo component
    const logo = (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="GraduationCap" size={24} color="var(--color-primary)" />
        </div>
    );

    return (
        <PillNav
            logo={logo}
            logoAlt="SmartCampusAssistant"
            items={navigationItems}
            activeHref={location.pathname}
            ease="power3.easeOut"
            baseColor="var(--color-primary)"
            pillColor="var(--color-card)"
            hoveredPillTextColor="var(--color-primary-foreground)"
            pillTextColor="var(--color-foreground)"
            initialLoadAnimation={true}
        />
    );
};

export default Navigation;
