import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentsCard = () => {
  const assignmentsData = [
    {
      id: 1,
      title: 'Binary Search Tree Implementation',
      subject: 'Data Structures',
      dueDate: '2026-01-22',
      priority: 'high',
      status: 'pending',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Database Normalization Project',
      subject: 'Database Management',
      dueDate: '2026-01-25',
      priority: 'medium',
      status: 'in-progress',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Responsive Portfolio Website',
      subject: 'Web Development',
      dueDate: '2026-01-28',
      priority: 'high',
      status: 'pending',
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Process Scheduling Algorithms',
      subject: 'Operating Systems',
      dueDate: '2026-02-02',
      priority: 'low',
      status: 'pending',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'Software Testing Report',
      subject: 'Software Engineering',
      dueDate: '2026-02-05',
      priority: 'medium',
      status: 'pending',
      color: 'bg-pink-500'
    }
  ];

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return { color: 'text-error', bg: 'bg-error', icon: 'AlertCircle' };
      case 'medium':
        return { color: 'text-warning', bg: 'bg-warning', icon: 'Clock' };
      case 'low':
        return { color: 'text-success', bg: 'bg-success', icon: 'CheckCircle2' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted', icon: 'Circle' };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', color: 'bg-success text-success-foreground' };
      case 'in-progress':
        return { label: 'In Progress', color: 'bg-primary text-primary-foreground' };
      case 'pending':
        return { label: 'Pending', color: 'bg-muted text-muted-foreground' };
      default:
        return { label: 'Unknown', color: 'bg-muted text-muted-foreground' };
    }
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date('2026-01-19');
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-4 md:p-6 lg:p-8 transition-smooth hover:shadow-warm-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-accent bg-opacity-20 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={24} color="var(--color-accent-foreground)" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              Upcoming Assignments
            </h2>
            <p className="text-sm text-muted-foreground">
              {assignmentsData?.length} assignments due
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Assignment
        </Button>
      </div>
      <div className="space-y-3">
        {assignmentsData?.map((assignment) => {
          const priorityConfig = getPriorityConfig(assignment?.priority);
          const statusConfig = getStatusConfig(assignment?.status);
          const daysRemaining = getDaysRemaining(assignment?.dueDate);

          return (
            <div
              key={assignment?.id}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border hover:border-primary transition-smooth"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className={`w-1 h-16 ${assignment?.color} rounded-full flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-sm md:text-base mb-1">
                      {assignment?.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">
                      {assignment?.subject}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusConfig?.color}`}>
                        {statusConfig?.label}
                      </span>
                      <div className={`flex items-center space-x-1 px-2 py-1 ${priorityConfig?.bg} bg-opacity-10 rounded-md`}>
                        <Icon name={priorityConfig?.icon} size={12} color={`var(--color-${assignment?.priority === 'high' ? 'error' : assignment?.priority === 'medium' ? 'warning' : 'success'})`} />
                        <span className={`text-xs font-medium ${priorityConfig?.color} capitalize`}>
                          {assignment?.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Due: {new Date(assignment.dueDate)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {daysRemaining <= 3 && (
                    <span className="text-xs font-medium text-error">
                      {daysRemaining} days left
                    </span>
                  )}
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-accent-foreground)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Pro Tip
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Start working on high-priority assignments early to avoid last-minute stress. Break them into smaller tasks for better management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AssignmentsCard };
