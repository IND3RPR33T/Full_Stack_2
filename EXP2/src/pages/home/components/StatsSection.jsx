import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatCard = ({ icon, value, label, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(value);
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 lg:p-10 shadow-warm border border-border text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary bg-opacity-10 rounded-full mb-4 md:mb-6">
        <Icon name={icon} size={50} color="var(--color-primary)" className="md:w-8 md:h-8 lg:w-10 lg:h-10" />
      </div>
      <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2 md:mb-3">
        {count?.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base lg:text-lg text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { icon: "Users", value: "15000", label: "Active Students", suffix: "+" },
    { icon: "Building2", value: "50", label: "Campus Buildings", suffix: "+" },
    { icon: "Calendar", value: "500", label: "Events This Year", suffix: "+" },
    { icon: "Award", value: "98", label: "Satisfaction Rate", suffix: "%" }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-foreground mb-4 md:mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join a thriving community of students and faculty who rely on SmartCampusAssistant every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats?.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat?.icon}
              value={stat?.value}
              label={stat?.label}
              suffix={stat?.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;