import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: "Navigation",
      title: "Intelligent Navigation",
      description: "Find any building, classroom, or facility on campus with AI-powered directions and real-time updates.",
      color: "var(--color-primary)"
    },
    {
      icon: "Calendar",
      title: "Academic Management",
      description: "Track your timetable, attendance, assignments, and exam schedules all in one centralized dashboard.",
      color: "var(--color-secondary)"
    },
    {
      icon: "Bell",
      title: "Event Tracking",
      description: "Stay updated with campus events, notices, and announcements with smart notifications and reminders.",
      color: "var(--color-accent)"
    },
    {
      icon: "Users",
      title: "Community Connect",
      description: "Connect with fellow students, join study groups, and collaborate on academic projects seamlessly.",
      color: "var(--color-success)"
    },
    {
      icon: "BookOpen",
      title: "Resource Library",
      description: "Access digital library resources, research materials, and academic databases from anywhere on campus.",
      color: "var(--color-warning)"
    },
    {
      icon: "Shield",
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy controls you can trust.",
      color: "var(--color-error)"
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-foreground mb-4 md:mb-6">
            Everything You Need for
            <br />
            Campus Success
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover powerful features designed to enhance your academic experience and make campus life easier than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features?.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature?.icon}
              title={feature?.title}
              description={feature?.description}
              color={feature?.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;