import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LightPillar from './LightPillar';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary to-secondary overflow-hidden">
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

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-primary-foreground rounded-2xl p-8 md:p-12 lg:p-16 shadow-warm-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full mb-6 md:mb-8">
                <Icon name="Sparkles" size={32} color="var(--color-primary-foreground)" className="md:w-10 md:h-10" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-foreground mb-4 md:mb-6">
                Ready to Transform Your
                <br />
                Campus Experience?
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Get started with SmartCampusAssistant today and discover how AI can make your academic journey smoother, smarter, and more connected.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto lg:w-auto">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate('/student-dashboard')}
                className="w-full sm:w-auto"
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Settings"
                iconPosition="left"
                onClick={() => navigate('/settings')}
                className="w-full sm:w-auto"
              >
                Customize Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;