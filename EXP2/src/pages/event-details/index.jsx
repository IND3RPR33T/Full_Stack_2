import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '../../components/ui/Navigation';
import FloatingAssistant from '../../components/ui/FloatingAssistant';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RelatedEvents from './components/RelatedEvents';
import EventAgenda from './components/EventAgenda';
import SpeakerProfiles from './components/SpeakerProfiles';
import { cn } from '../../utils/cn';

const EventDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = parseInt(searchParams?.get('id'));
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [showToast, setShowToast] = useState(null);

  const allEvents = [
    {
      id: 1,
      title: 'AI & Machine Learning Workshop',
      date: '2026-01-25',
      time: '10:00 AM - 4:00 PM',
      location: 'Computer Science Building, Room 301',
      category: 'Academic',
      department: 'Computer Science',
      description: 'Join us for an immersive hands-on workshop covering the fundamentals of Artificial Intelligence and Machine Learning. This full-day event will take you through practical implementations, real-world applications, and cutting-edge techniques in AI/ML development.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
      alt: 'AI and Machine Learning Workshop presentation with neural network diagrams',
      organizer: 'Dr. Sarah Chen',
      organizerEmail: 'sarah.chen@university.edu',
      organizerPhone: '+1 (555) 123-4567',
      attendees: 45,
      maxAttendees: 60,
      requirements: ['Laptop with Python installed', 'Basic programming knowledge', 'Jupyter Notebook setup'],
      agenda: [
        { time: '10:00 AM', title: 'Introduction to AI & ML Concepts', duration: '1 hour' },
        { time: '11:00 AM', title: 'Neural Networks Fundamentals', duration: '1.5 hours' },
        { time: '12:30 PM', title: 'Lunch Break', duration: '1 hour' },
        { time: '1:30 PM', title: 'Hands-on: Building Your First ML Model', duration: '2 hours' },
        { time: '3:30 PM', title: 'Q&A and Networking', duration: '30 minutes' }
      ],
      speakers: [
        { name: 'Dr. Sarah Chen', role: 'AI Research Lead', bio: 'PhD in Computer Science, 10+ years in AI research' },
        { name: 'Prof. Michael Roberts', role: 'ML Engineer', bio: 'Former Google AI team member, ML specialist' }
      ],
      resources: [
        { name: 'Workshop Slides', url: '#', type: 'PDF' },
        { name: 'Code Repository', url: '#', type: 'GitHub' },
        { name: 'Reading Materials', url: '#', type: 'PDF' }
      ]
    },
    {
      id: 2,
      title: 'Annual Sports Day 2026',
      date: '2026-01-28',
      time: '8:00 AM - 6:00 PM',
      location: 'Main Sports Complex',
      category: 'Sports',
      department: 'Athletics',
      description: 'Get ready for the most exciting day of the year! Join us for a full day of athletic competitions, team sports, and campus-wide fun activities. Whether you\'re competing or cheering, there\'s something for everyone.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop',
      alt: 'Students participating in outdoor sports activities on campus field',
      organizer: 'Athletics Department',
      organizerEmail: 'athletics@university.edu',
      organizerPhone: '+1 (555) 234-5678',
      attendees: 230,
      maxAttendees: 500,
      requirements: ['Athletic wear', 'Water bottle', 'Sunscreen'],
      agenda: [
        { time: '8:00 AM', title: 'Opening Ceremony', duration: '30 minutes' },
        { time: '8:30 AM', title: 'Track & Field Events', duration: '3 hours' },
        { time: '12:00 PM', title: 'Lunch Break', duration: '1 hour' },
        { time: '1:00 PM', title: 'Team Sports Competitions', duration: '4 hours' },
        { time: '5:00 PM', title: 'Awards Ceremony', duration: '1 hour' }
      ],
      speakers: [],
      resources: [
        { name: 'Event Schedule', url: '#', type: 'PDF' },
        { name: 'Registration Form', url: '#', type: 'Form' }
      ]
    }
  ];

  const event = allEvents?.find(e => e?.id === eventId) || allEvents?.[0];

  useEffect(() => {
    setAttendeeCount(event?.attendees);
  }, [event]);

  const handleRSVP = () => {
    if (!isRSVPed) {
      setIsRSVPed(true);
      setAttendeeCount(prev => prev + 1);
      setShowToast('Successfully registered for event!');
    } else {
      setIsRSVPed(false);
      setAttendeeCount(prev => prev - 1);
      setShowToast('Registration cancelled');
    }
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleAddToCalendar = () => {
    setShowToast('Added to your calendar');
    setTimeout(() => setShowToast(null), 2000);
  };

  const handleShare = () => {
    setShowToast('Link copied to clipboard');
    setTimeout(() => setShowToast(null), 2000);
  };

  const handleGetDirections = () => {
    setShowToast('Opening directions in maps');
    setTimeout(() => setShowToast(null), 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Academic: 'bg-primary text-primary-foreground',
      Social: 'bg-purple-500 text-white',
      Sports: 'bg-success text-success-foreground',
      Administrative: 'bg-warning text-warning-foreground'
    };
    return colors?.[category] || 'bg-muted text-muted-foreground';
  };

  const relatedEvents = allEvents?.filter(e => e?.id !== event?.id && e?.category === event?.category)?.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{event?.title} - SmartCampusAssistant</title>
        <meta name="description" content={event?.description} />
      </Helmet>
      <Navigation />
      <FloatingAssistant />
      <div className="min-h-screen bg-background pt-20 pb-8">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/events')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Events
            </Button>
          </div>

          <div className="bg-card rounded-xl shadow-warm-lg overflow-hidden mb-8">
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={event?.image}
                alt={event?.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="mb-3">
                  <span className={cn("px-4 py-2 rounded-full text-sm font-semibold", getCategoryColor(event?.category))}>
                    {event?.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-2">
                  {event?.title}
                </h1>
                <p className="text-white text-opacity-90 text-lg">
                  {event?.department}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Calendar" size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold text-foreground">{formatDate(event?.date)}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                    <p className="font-semibold text-foreground">{event?.time}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="font-semibold text-foreground">{event?.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <Button
                  variant={isRSVPed ? "success" : "default"}
                  size="lg"
                  onClick={handleRSVP}
                  iconName={isRSVPed ? "Check" : "UserPlus"}
                  iconPosition="left"
                >
                  {isRSVPed ? 'Registered' : 'RSVP Now'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleAddToCalendar}
                  iconName="CalendarPlus"
                  iconPosition="left"
                >
                  Add to Calendar
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  iconName="Share2"
                  iconPosition="left"
                >
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleGetDirections}
                  iconName="Navigation"
                  iconPosition="left"
                >
                  Get Directions
                </Button>
              </div>

              {event?.maxAttendees > 0 && (
                <div className="bg-muted bg-opacity-50 rounded-lg p-4 mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Event Capacity</span>
                    <span className="text-sm font-semibold text-foreground">
                      {attendeeCount} / {event?.maxAttendees} attending
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(attendeeCount / event?.maxAttendees) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event?.description}
                </p>
              </div>

              {event?.requirements && event?.requirements?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {event?.requirements?.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Icon name="CheckCircle" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event?.agenda && event?.agenda?.length > 0 && (
                <EventAgenda agenda={event?.agenda} />
              )}

              {event?.speakers && event?.speakers?.length > 0 && (
                <SpeakerProfiles speakers={event?.speakers} />
              )}

              {event?.resources && event?.resources?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Resources</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {event?.resources?.map((resource, index) => (
                      <a
                        key={index}
                        href={resource?.url}
                        className="flex items-center justify-between p-4 bg-muted bg-opacity-50 rounded-lg hover:bg-opacity-100 transition-smooth group"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="FileText" size={20} color="var(--color-primary)" />
                          <div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-smooth">
                              {resource?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{resource?.type}</p>
                          </div>
                        </div>
                        <Icon name="Download" size={20} color="var(--color-muted-foreground)" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-8">
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Contact Organizer</h2>
                <div className="bg-muted bg-opacity-50 rounded-lg p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={24} color="var(--color-primary-foreground)" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{event?.organizer}</p>
                      <p className="text-sm text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Icon name="Mail" size={18} />
                      <span className="text-sm">{event?.organizerEmail}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Icon name="Phone" size={18} />
                      <span className="text-sm">{event?.organizerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedEvents?.length > 0 && (
            <RelatedEvents events={relatedEvents} onEventClick={(id) => navigate(`/event-details?id=${id}`)} />
          )}
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-success text-success-foreground px-6 py-4 rounded-lg shadow-warm-lg flex items-center space-x-3 animate-fade-in">
          <Icon name="Check" size={24} />
          <span className="font-medium">{showToast}</span>
        </div>
      )}
    </>
  );
};

export default EventDetails;