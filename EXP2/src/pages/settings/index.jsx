import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Navigation from '../../components/ui/Navigation';
import FloatingAssistant from '../../components/ui/FloatingAssistant';
import ThemeSection from './components/ThemeSection';
import AccentColorPicker from './components/AccentColorPicker';
import AccessibilityOptions from './components/AccessibilityOptions';
import AccountSection from './components/AccountSection';
import NotificationPreferences from './components/NotificationPreferences';
import PrivacySettings from './components/PrivacySettings';
import AdvancedSettings from './components/AdvancedSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('#0F4C75');
  const [fontSize, setFontSize] = useState('default');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    studentId: "CS2023-4567",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    year: "3rd Year",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    avatarAlt: "Professional headshot of young woman with long brown hair wearing navy blue blazer smiling at camera in bright office setting"
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    events: true,
    assignments: true,
    attendance: true,
    grades: true,
    announcements: true,
    messages: false
  });

  const [notificationMethod, setNotificationMethod] = useState('all');

  const [privacyOptions, setPrivacyOptions] = useState({
    profileVisibility: true,
    locationSharing: false,
    activityStatus: true,
    dataAnalytics: true,
    thirdPartySharing: false
  });

  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('America/New_York');
  const [calendarSync, setCalendarSync] = useState('none');
  const [autoBackup, setAutoBackup] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedAccentColor = localStorage.getItem('accentColor') || '#0F4C75';
    const savedFontSize = localStorage.getItem('fontSize') || 'default';

    setTheme(savedTheme);
    setAccentColor(savedAccentColor);
    setFontSize(savedFontSize);

    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
  }, []);

  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
  };

  const applyFontSize = (size) => {
    const root = document.documentElement;
    const sizeMap = {
      small: '14px',
      default: '16px',
      large: '18px',
      xlarge: '20px'
    };
    root.style.fontSize = sizeMap?.[size] || '16px';
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    showToast();
  };

  const handleAccentColorChange = (color) => {
    setAccentColor(color);
    localStorage.setItem('accentColor', color);
    showToast();
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    applyFontSize(size);
    showToast();
  };

  const handleProfileUpdate = (field, value) => {
    if (field === 'save') {
      showToast();
      return;
    }
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationPreferenceChange = (type, value) => {
    setNotificationPreferences(prev => ({ ...prev, [type]: value }));
    showToast();
  };

  const handlePrivacyChange = (option, value) => {
    setPrivacyOptions(prev => ({ ...prev, [option]: value }));
    showToast();
  };

  const showToast = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: 'Palette' },
    { id: 'accessibility', label: 'Accessibility', icon: 'Accessibility' },
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'advanced', label: 'Advanced', icon: 'Settings2' }
  ];

  return (
    <>
      <Helmet>
        <title>Settings - SmartCampusAssistant</title>
        <meta name="description" content="Customize your SmartCampusAssistant experience with theme preferences, accessibility features, and account management options." />
      </Helmet>
      <Navigation />
      <FloatingAssistant />
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-screen-2xl mx-auto px-4 py-6 md:py-8 lg:py-12">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Customize your SmartCampusAssistant experience
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-xl shadow-warm-md border border-border overflow-hidden">
                <div className="overflow-x-auto lg:overflow-x-visible">
                  <div className="flex lg:flex-col min-w-max lg:min-w-0">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`
                          flex items-center space-x-3 px-4 md:px-6 py-3 md:py-4
                          transition-smooth font-medium text-sm md:text-base
                          whitespace-nowrap lg:whitespace-normal
                          ${activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                          }
                        `}
                      >
                        <Icon name={tab?.icon} size={20} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="bg-card rounded-xl shadow-warm-md border border-border p-4 md:p-6 lg:p-8">
                {activeTab === 'appearance' && (
                  <div className="space-y-8 md:space-y-12">
                    <ThemeSection theme={theme} onThemeChange={handleThemeChange} />
                    <div className="border-t border-border" />
                    <AccentColorPicker
                      selectedColor={accentColor}
                      onColorChange={handleAccentColorChange}
                    />
                  </div>
                )}

                {activeTab === 'accessibility' && (
                  <AccessibilityOptions
                    fontSize={fontSize}
                    onFontSizeChange={handleFontSizeChange}
                    highContrast={highContrast}
                    onHighContrastChange={setHighContrast}
                    reducedMotion={reducedMotion}
                    onReducedMotionChange={setReducedMotion}
                    keyboardNav={keyboardNav}
                    onKeyboardNavChange={setKeyboardNav}
                    screenReader={screenReader}
                    onScreenReaderChange={setScreenReader}
                  />
                )}

                {activeTab === 'account' && (
                  <AccountSection
                    profileData={profileData}
                    onProfileUpdate={handleProfileUpdate}
                    onPasswordChange={() => showToast()}
                    onAvatarChange={() => showToast()}
                  />
                )}

                {activeTab === 'notifications' && (
                  <NotificationPreferences
                    preferences={notificationPreferences}
                    onPreferenceChange={handleNotificationPreferenceChange}
                    notificationMethod={notificationMethod}
                    onMethodChange={setNotificationMethod}
                  />
                )}

                {activeTab === 'privacy' && (
                  <PrivacySettings
                    privacyOptions={privacyOptions}
                    onPrivacyChange={handlePrivacyChange}
                    onDataExport={() => showToast()}
                    onAccountDelete={() => showToast()}
                  />
                )}

                {activeTab === 'advanced' && (
                  <AdvancedSettings
                    language={language}
                    onLanguageChange={setLanguage}
                    timezone={timezone}
                    onTimezoneChange={setTimezone}
                    calendarSync={calendarSync}
                    onCalendarSyncChange={setCalendarSync}
                    autoBackup={autoBackup}
                    onAutoBackupChange={setAutoBackup}
                    onClearCache={() => showToast()}
                    onResetSettings={() => showToast()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuccessToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-1400 animate-in slide-in-from-bottom-5">
          <div className="bg-success text-success-foreground px-6 py-4 rounded-xl shadow-warm-2xl flex items-center space-x-3">
            <Icon name="CheckCircle2" size={24} />
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;