import React from 'react';
import Icon from '../../../components/AppIcon';

const GradesCard = () => {
  const gradesData = [
    {
      id: 1,
      subject: 'Data Structures',
      grade: 'A',
      score: 92,
      maxScore: 100,
      trend: 'up',
      color: 'bg-blue-500',
      date: '2026-01-15'
    },
    {
      id: 2,
      subject: 'Database Management',
      grade: 'A-',
      score: 88,
      maxScore: 100,
      trend: 'up',
      color: 'bg-purple-500',
      date: '2026-01-12'
    },
    {
      id: 3,
      subject: 'Web Development',
      grade: 'B+',
      score: 85,
      maxScore: 100,
      trend: 'down',
      color: 'bg-green-500',
      date: '2026-01-10'
    },
    {
      id: 4,
      subject: 'Operating Systems',
      grade: 'A',
      score: 90,
      maxScore: 100,
      trend: 'up',
      color: 'bg-orange-500',
      date: '2026-01-08'
    }
  ];

  const getGradeColor = (grade) => {
    if (grade?.startsWith('A')) return 'text-success';
    if (grade?.startsWith('B')) return 'text-primary';
    if (grade?.startsWith('C')) return 'text-warning';
    return 'text-error';
  };

  const calculateGPA = () => {
    const gradePoints = {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0
    };
    const total = gradesData?.reduce((sum, item) => sum + (gradePoints?.[item?.grade] || 0), 0);
    return (total / gradesData?.length)?.toFixed(2);
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-4 md:p-6 lg:p-8 transition-smooth hover:shadow-warm-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
          <Icon name="Award" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Recent Grades
          </h2>
          <p className="text-sm text-muted-foreground">
            Your academic performance
          </p>
        </div>
      </div>
      <div className="mb-6 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current GPA</p>
            <p className="text-3xl md:text-4xl font-heading font-bold text-primary">
              {calculateGPA()}
            </p>
          </div>
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={32} color="var(--color-primary)" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {gradesData?.map((item) => (
          <div
            key={item?.id}
            className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border hover:border-primary transition-smooth"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className={`w-1 h-12 ${item?.color} rounded-full flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-foreground text-sm md:text-base truncate">
                    {item?.subject}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.date)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="text-right">
                  <p className={`text-2xl font-heading font-bold ${getGradeColor(item?.grade)}`}>
                    {item?.grade}
                  </p>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {item?.score}/{item?.maxScore}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item?.trend === 'up' ? 'bg-success bg-opacity-10' : 'bg-error bg-opacity-10'}`}>
                  <Icon
                    name={item?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                    size={16}
                    color={item?.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'}
                  />
                </div>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${item?.color} transition-all duration-1000 ease-out`}
                style={{ width: `${(item?.score / item?.maxScore) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-opacity-90 transition-smooth">
          View All Grades
        </button>
        <button className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium text-sm hover:bg-opacity-80 transition-smooth">
          Grade Analysis
        </button>
      </div>
    </div>
  );
};

export default GradesCard;