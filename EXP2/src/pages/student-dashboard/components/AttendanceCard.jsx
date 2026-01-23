import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceCard = () => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const targetPercentage = 87;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetPercentage / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPercentage) {
        setAnimatedPercentage(targetPercentage);
        clearInterval(timer);
      } else {
        setAnimatedPercentage(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const attendanceData = [
    {
      id: 1,
      subject: 'Data Structures',
      attended: 28,
      total: 32,
      percentage: 87.5,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      subject: 'Database Management',
      attended: 26,
      total: 30,
      percentage: 86.7,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      subject: 'Web Development',
      attended: 30,
      total: 34,
      percentage: 88.2,
      color: 'bg-green-500'
    },
    {
      id: 4,
      subject: 'Operating Systems',
      attended: 25,
      total: 30,
      percentage: 83.3,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      subject: 'Software Engineering',
      attended: 27,
      total: 32,
      percentage: 84.4,
      color: 'bg-pink-500'
    }
  ];

  const getStatusColor = (percentage) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };

  const getStatusIcon = (percentage) => {
    if (percentage >= 85) return 'CheckCircle2';
    if (percentage >= 75) return 'AlertCircle';
    return 'XCircle';
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-4 md:p-6 lg:p-8 transition-smooth hover:shadow-warm-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center">
          <Icon name="UserCheck" size={24} color="var(--color-success)" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Attendance Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your class attendance
          </p>
        </div>
      </div>
      <div className="mb-8">
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="var(--color-muted)"
              strokeWidth="8"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="var(--color-success)"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - animatedPercentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {animatedPercentage}%
            </span>
            <span className="text-xs md:text-sm text-muted-foreground">
              Overall
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {attendanceData?.map((subject) => (
          <div key={subject?.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div className={`w-3 h-3 ${subject?.color} rounded-full flex-shrink-0`} />
                <span className="text-sm font-medium text-foreground truncate">
                  {subject?.subject}
                </span>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className={`text-sm font-semibold ${getStatusColor(subject?.percentage)}`}>
                  {subject?.percentage?.toFixed(1)}%
                </span>
                <Icon
                  name={getStatusIcon(subject?.percentage)}
                  size={16}
                  color={subject?.percentage >= 85 ? 'var(--color-success)' : subject?.percentage >= 75 ? 'var(--color-warning)' : 'var(--color-error)'}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{subject?.attended} / {subject?.total} classes</span>
              <span>{subject?.total - subject?.attended} missed</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${subject?.color} transition-all duration-1000 ease-out`}
                style={{ width: `${subject?.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-muted-foreground">
            Minimum 75% attendance required. You're doing great! Keep it up to maintain your excellent record.
          </p>
        </div>
      </div>
    </div>
  );
};

export { AttendanceCard };
