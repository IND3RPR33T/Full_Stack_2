import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'announcement',
      title: 'Campus Wi-Fi Maintenance',
      message: 'The campus Wi-Fi will be under maintenance on January 21st from 2:00 AM to 6:00 AM. Please plan accordingly.',
      timestamp: '2026-01-19T10:30:00',
      read: false,
      icon: 'Wifi',
      color: 'bg-primary'
    },
    {
      id: 2,
      type: 'schedule',
      title: 'Class Rescheduled',
      message: 'Database Management class on January 20th has been moved from 11:00 AM to 2:00 PM in room CS-205.',
      timestamp: '2026-01-19T09:15:00',
      read: false,
      icon: 'Calendar',
      color: 'bg-warning'
    },
    {
      id: 3,
      type: 'grade',
      title: 'New Grade Posted',
      message: 'Your grade for Data Structures Mid-term Exam has been posted. Check your grades section for details.',
      timestamp: '2026-01-18T16:45:00',
      read: true,
      icon: 'Award',
      color: 'bg-success'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Assignment Due Soon',
      message: 'Binary Search Tree Implementation assignment is due in 3 days. Don\'t forget to submit before the deadline.',
      timestamp: '2026-01-18T14:20:00',
      read: true,
      icon: 'Bell',
      color: 'bg-error'
    },
    {
      id: 5,
      type: 'event',
      title: 'Tech Talk: AI in Education',
      message: 'Join us for an exciting tech talk on AI applications in education. January 25th, 4:00 PM at Auditorium Hall.',
      timestamp: '2026-01-17T11:00:00',
      read: true,
      icon: 'Users',
      color: 'bg-purple-500'
    }
  ]);

  const handleDismiss = (id) => {
    setNotifications(notifications?.filter(notif => notif?.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications?.map(notif =>
      notif?.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications?.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const getTimeAgo = (timestamp) => {
    const now = new Date('2026-01-19T16:41:47');
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-4 md:p-6 lg:p-8 transition-smooth hover:shadow-warm-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
              <Icon name="Bell" size={24} color="var(--color-primary)" />
            </div>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-error-foreground">
                  {unreadCount}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              Notifications
            </h2>
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread notifications
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            iconName="CheckCheck"
            iconPosition="left"
          >
            Mark all read
          </Button>
        )}
      </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {notifications?.length > 0 ? (
          notifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`
                bg-card/50 backdrop-blur-sm rounded-lg p-4 border transition-smooth
                ${notification?.read ? 'border-border' : 'border-primary/50'}
                hover:border-primary
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${notification?.color} bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={notification?.icon} size={20} color={`var(--color-${notification?.type === 'announcement' ? 'primary' : notification?.type === 'schedule' ? 'warning' : notification?.type === 'grade' ? 'success' : notification?.type === 'reminder' ? 'error' : 'primary'})`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading font-semibold text-foreground text-sm md:text-base">
                      {notification?.title}
                    </h3>
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 leading-relaxed">
                    {notification?.message}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(notification?.timestamp)}
                    </span>
                    <div className="flex items-center gap-2">
                      {!notification?.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification?.id)}
                          className="text-xs text-primary hover:underline font-medium"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => handleDismiss(notification?.id)}
                        className="p-1 hover:bg-muted rounded transition-smooth"
                        aria-label="Dismiss notification"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="BellOff" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications</p>
            <p className="text-sm text-muted-foreground mt-1">
              You're all caught up!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;