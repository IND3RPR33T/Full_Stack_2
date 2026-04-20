import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionsCard = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Mark Attendance',
      description: 'Record your class attendance',
      icon: 'UserCheck',
      color: 'bg-success',
      action: () => console.log('Mark Attendance')
    },
    {
      id: 2,
      title: 'View Assignments',
      description: 'Check pending assignments',
      icon: 'FileText',
      color: 'bg-primary',
      action: () => console.log('View Assignments')
    },
    {
      id: 3,
      title: 'Contact Instructor',
      description: 'Send message to faculty',
      icon: 'Mail',
      color: 'bg-accent',
      action: () => console.log('Contact Instructor')
    },
    {
      id: 4,
      title: 'Library Resources',
      description: 'Access digital library',
      icon: 'BookOpen',
      color: 'bg-purple-500',
      action: () => console.log('Library Resources')
    },
    {
      id: 5,
      title: 'Campus Map',
      description: 'Navigate campus buildings',
      icon: 'Map',
      color: 'bg-orange-500',
      action: () => console.log('Campus Map')
    },
    {
      id: 6,
      title: 'Events Calendar',
      description: 'View upcoming events',
      icon: 'Calendar',
      color: 'bg-pink-500',
      action: () => console.log('Events Calendar')
    }
  ];

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-4 md:p-6 lg:p-8 transition-smooth hover:shadow-warm-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Quick Actions
          </h2>
          <p className="text-sm text-muted-foreground">
            Frequently used features
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className="bg-background rounded-lg p-4 border border-border hover:border-primary transition-smooth text-left group"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 ${action?.color} bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-smooth`}>
                <Icon name={action?.icon} size={20} color={`var(--color-${action?.id === 1 ? 'success' : action?.id === 2 ? 'primary' : action?.id === 3 ? 'accent-foreground' : 'primary'})`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground text-sm md:text-base mb-1 group-hover:text-primary transition-smooth">
                  {action?.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;