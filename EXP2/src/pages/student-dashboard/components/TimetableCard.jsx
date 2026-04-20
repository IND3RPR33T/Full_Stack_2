import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TimetableCard = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timetableData = {
    Monday: [
      {
        id: 1,
        subject: 'Data Structures',
        time: '09:00 AM - 10:30 AM',
        room: 'CS-301',
        instructor: 'Dr. Sarah Johnson',
        color: 'bg-blue-500',
        type: 'Lecture'
      },
      {
        id: 2,
        subject: 'Database Management',
        time: '11:00 AM - 12:30 PM',
        room: 'CS-205',
        instructor: 'Prof. Michael Chen',
        color: 'bg-purple-500',
        type: 'Lab'
      },
      {
        id: 3,
        subject: 'Web Development',
        time: '02:00 PM - 03:30 PM',
        room: 'CS-401',
        instructor: 'Dr. Emily Rodriguez',
        color: 'bg-green-500',
        type: 'Lecture'
      }
    ],
    Tuesday: [
      {
        id: 4,
        subject: 'Operating Systems',
        time: '10:00 AM - 11:30 AM',
        room: 'CS-302',
        instructor: 'Dr. James Wilson',
        color: 'bg-orange-500',
        type: 'Lecture'
      },
      {
        id: 5,
        subject: 'Software Engineering',
        time: '01:00 PM - 02:30 PM',
        room: 'CS-203',
        instructor: 'Prof. Lisa Anderson',
        color: 'bg-pink-500',
        type: 'Tutorial'
      }
    ],
    Wednesday: [
      {
        id: 6,
        subject: 'Data Structures',
        time: '09:00 AM - 10:30 AM',
        room: 'CS-301',
        instructor: 'Dr. Sarah Johnson',
        color: 'bg-blue-500',
        type: 'Tutorial'
      },
      {
        id: 7,
        subject: 'Computer Networks',
        time: '11:00 AM - 12:30 PM',
        room: 'CS-404',
        instructor: 'Dr. Robert Martinez',
        color: 'bg-teal-500',
        type: 'Lecture'
      },
      {
        id: 8,
        subject: 'Web Development',
        time: '02:00 PM - 03:30 PM',
        room: 'CS-401',
        instructor: 'Dr. Emily Rodriguez',
        color: 'bg-green-500',
        type: 'Lab'
      }
    ],
    Thursday: [
      {
        id: 9,
        subject: 'Database Management',
        time: '10:00 AM - 11:30 AM',
        room: 'CS-205',
        instructor: 'Prof. Michael Chen',
        color: 'bg-purple-500',
        type: 'Lecture'
      },
      {
        id: 10,
        subject: 'Operating Systems',
        time: '01:00 PM - 02:30 PM',
        room: 'CS-302',
        instructor: 'Dr. James Wilson',
        color: 'bg-orange-500',
        type: 'Lab'
      }
    ],
    Friday: [
      {
        id: 11,
        subject: 'Software Engineering',
        time: '09:00 AM - 10:30 AM',
        room: 'CS-203',
        instructor: 'Prof. Lisa Anderson',
        color: 'bg-pink-500',
        type: 'Lecture'
      },
      {
        id: 12,
        subject: 'Computer Networks',
        time: '11:00 AM - 12:30 PM',
        room: 'CS-404',
        instructor: 'Dr. Robert Martinez',
        color: 'bg-teal-500',
        type: 'Lab'
      }
    ]
  };

  const currentClasses = timetableData?.[selectedDay] || [];

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-4 md:p-6 lg:p-8 transition-smooth hover:shadow-warm-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              Weekly Timetable
            </h2>
            <p className="text-sm text-muted-foreground">
              Your class schedule
            </p>
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
        {weekDays?.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-smooth
              ${selectedDay === day
                ? 'bg-primary text-primary-foreground shadow-warm'
                : 'bg-muted text-muted-foreground hover:bg-primary hover:bg-opacity-10'
              }
            `}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {currentClasses?.length > 0 ? (
          currentClasses?.map((classItem) => (
            <div
              key={classItem?.id}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border hover:border-primary transition-smooth"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className={`w-1 h-16 ${classItem?.color} rounded-full flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-foreground text-sm md:text-base truncate">
                        {classItem?.subject}
                      </h3>
                      <span className="flex-shrink-0 px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-md font-medium">
                        {classItem?.type}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        <span>{classItem?.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
                        <Icon name="MapPin" size={14} />
                        <span>{classItem?.room}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
                        <Icon name="User" size={14} />
                        <span className="truncate">{classItem?.instructor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">No classes scheduled for this day</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableCard;