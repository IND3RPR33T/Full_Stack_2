import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '../../components/ui/Navigation';
import FloatingAssistant from '../../components/ui/FloatingAssistant';
import Icon from '../../components/AppIcon';
import TimetableCard from './components/TimetableCard';
import { AttendanceCard } from "./components/AttendanceCard";

import GradesCard from './components/GradesCard';
import { AssignmentsCard } from "./components/AssignmentsCard";

import NotificationsPanel from './components/NotificationsPanel';
import QuickActionsCard from './components/QuickActionsCard';

const StudentDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date()?.getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now?.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };

    updateGreeting();
    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  const studentInfo = {
    name: 'Alex Johnson',
    studentId: 'CS2024-1234',
    program: 'Computer Science',
    semester: 'Spring 2026',
    year: '3rd Year'
  };

  return (
    <>
      <Helmet>
        <title>Student Dashboard - SmartCampusAssistant</title>
        <meta name="description" content="Access your personalized student dashboard with timetable, attendance tracking, grades, assignments, and notifications for comprehensive academic management." />
      </Helmet>
      <Navigation />
      <FloatingAssistant />
      <div className="min-h-screen bg-background pt-20 pb-8">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 md:p-8 lg:p-10 shadow-warm-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-foreground rounded-full flex items-center justify-center">
                      <Icon name="User" size={32} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-1">
                        {greeting}, {studentInfo?.name}!
                      </h1>
                      <p className="text-sm md:text-base text-white opacity-90">
                        Welcome back to your dashboard
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <p className="text-xs text-white/75 mb-1">Student ID</p>
                      <p className="text-sm md:text-base font-semibold text-white">
                        {studentInfo?.studentId}
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <p className="text-xs text-white/75 mb-1">Program</p>
                      <p className="text-sm md:text-base font-semibold text-white">
                        {studentInfo?.program}
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <p className="text-xs text-white/75 mb-1">Semester</p>
                      <p className="text-sm md:text-base font-semibold text-white">
                        {studentInfo?.semester}
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <p className="text-xs text-white/75 mb-1">Year</p>
                      <p className="text-sm md:text-base font-semibold text-white">
                        {studentInfo?.year}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-end space-y-2">
                  <div className="flex items-center space-x-2 text-white">
                    <Icon name="Clock" size={20} />
                    <span className="text-lg md:text-xl font-semibold">{currentTime}</span>
                  </div>
                  <p className="text-sm text-white/75">
                    {new Date()?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <TimetableCard />
              <GradesCard />
              <AssignmentsCard />
            </div>

            <div className="space-y-6 md:space-y-8">
              <AttendanceCard />
              <NotificationsPanel />
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <QuickActionsCard />
          </div>

          <div className="mt-8 p-6 bg-card rounded-xl shadow-warm-md border border-border">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="HelpCircle" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                    Need Help?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our Smart Assistant is here to help you navigate campus life, answer questions, and provide support whenever you need it.
                  </p>
                </div>
              </div>
              <button className="flex-shrink-0 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-smooth flex items-center space-x-2">
                <Icon name="MessageCircle" size={20} />
                <span>Chat with Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;