import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LightPillar from './LightPillar';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary pt-24 md:pt-28">

      {/* 🌌 LightPillar Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightPillar
          topColor="#3201f7"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>



      {/* 🚀 Hero Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="mb-6 md:mb-8 lg:mb-10 inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-primary-foreground rounded-full shadow-warm-2xl">
          <Icon
            name="GraduationCap"
            size={48}
            color="var(--color-primary)"
            className="md:w-14 md:h-14 lg:w-16 lg:h-16"
          />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-primary-foreground mb-4 md:mb-6 lg:mb-8 leading-tight">
          Your Intelligent Campus
          <br />
          Assistant Awaits
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-primary-foreground opacity-90 mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
          Navigate your academic journey with AI-powered assistance. Get instant answers, manage your schedule, and explore campus facilities with ease.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <Button
            variant="default"
            size="lg"
            iconName="MessageCircle"
            color="#FF9FFC"
            iconPosition="left"
            onClick={() => navigate('/smart-assistant')}
            className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-opacity-90 shadow-warm-xl"
          >
            Start Chatting
          </Button>

          <Button
            variant="outline"
            size="lg"
            iconName="Map"
            iconPosition="left"
            onClick={() => navigate('/campus-map')}
            className="w-full sm:w-auto border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            Explore Campus
          </Button>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-10 text-primary-foreground">
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">24/7</div>
            <div className="text-sm md:text-base opacity-90">AI Assistance</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">50+</div>
            <div className="text-sm md:text-base opacity-90">Campus Buildings</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">100%</div>
            <div className="text-sm md:text-base opacity-90">Student Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
