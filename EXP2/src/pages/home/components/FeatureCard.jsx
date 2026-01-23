import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ElectricBorder from '../../../components/ui/ElectricBorder';

const FeatureCard = ({ icon, title, description, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ElectricBorder
      color="#3b82f6"
      speed={1}
      chaos={0.12}
      borderRadius={16}
      style={{ borderRadius: 16 }}
    >
      <div
        className="bg-card rounded-xl p-6 md:p-8 lg:p-10 shadow-warm hover:shadow-warm-xl transition-smooth cursor-pointer border border-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full mb-4 md:mb-6 transition-smooth ${isHovered ? 'scale-110' : 'scale-100'
            }`}
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon
            name={icon}
            size={32}
            color={color}
            className="md:w-10 md:h-10 lg:w-12 lg:h-12"
          />
        </div>

        <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-3 md:mb-4">
          {title}
        </h3>

        <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </ElectricBorder>
  );
};

export default FeatureCard;