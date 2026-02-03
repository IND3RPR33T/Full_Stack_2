import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/ui/Navigation';
import FloatingAssistant from '../../components/ui/FloatingAssistant';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';

import Button from '../../components/ui/Button';
import EventCard from './components/EventCard';
import FeaturedCarousel from './components/FeaturedCarousel';
import FilterSidebar from './components/FilterSidebar';


const Events = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [displayedEvents, setDisplayedEvents] = useState(12);
  const [newEventNotifications, setNewEventNotifications] = useState(2);

  const allEvents = [
    {
      id: 1,
      title: 'AI & Machine Learning Workshop',
      date: '2026-01-25',
      time: '10:00 AM - 4:00 PM',
      location: 'Computer Science Building, Room 301',
      category: 'Academic',
      department: 'Computer Science',
      description: 'Hands-on workshop covering fundamentals of AI and ML with practical implementations.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      alt: 'AI and Machine Learning Workshop presentation with neural network diagrams',
      organizer: 'Dr. Sarah Chen',
      attendees: 45,
      maxAttendees: 60,
      featured: true,
      isNew: true
    },
    {
      id: 2,
      title: 'Annual Sports Day 2026',
      date: '2026-01-28',
      time: '8:00 AM - 6:00 PM',
      location: 'Main Sports Complex',
      category: 'Sports',
      department: 'Athletics',
      description: 'Join us for a day of athletic competitions, team sports, and campus-wide fun activities.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop',
      alt: 'Students participating in outdoor sports activities on campus field',
      organizer: 'Athletics Department',
      attendees: 230,
      maxAttendees: 500,
      featured: true,
      isNew: true
    },
    {
      id: 3,
      title: 'Career Fair Spring 2026',
      date: '2026-02-05',
      time: '9:00 AM - 5:00 PM',
      location: 'University Convention Center',
      category: 'Administrative',
      department: 'Career Services',
      description: 'Meet with top employers, explore internship opportunities, and network with industry professionals.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
      alt: 'Career fair with employer booths and students networking',
      organizer: 'Career Services Office',
      attendees: 180,
      maxAttendees: 300,
      featured: true,
      isNew: false
    },
    {
      id: 4,
      title: 'Spring Semester Orientation',
      date: '2026-01-22',
      time: '9:00 AM - 12:00 PM',
      location: 'Main Auditorium',
      category: 'Academic',
      department: 'Student Affairs',
      description: 'Welcome session for new students covering campus resources, academic policies, and student life.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
      alt: 'University auditorium filled with students during orientation',
      organizer: 'Student Affairs',
      attendees: 320,
      maxAttendees: 400,
      featured: false,
      isNew: false
    },
    {
      id: 5,
      title: 'Cultural Night: International Festival',
      date: '2026-02-10',
      time: '6:00 PM - 10:00 PM',
      location: 'Student Center Plaza',
      category: 'Social',
      department: 'International Students',
      description: 'Celebrate diversity with cultural performances, international cuisine, and traditional exhibitions.',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop',
      alt: 'Colorful cultural festival with students in traditional attire performing',
      organizer: 'International Student Association',
      attendees: 156,
      maxAttendees: 250,
      featured: false,
      isNew: false
    },
    {
      id: 6,
      title: 'Research Symposium 2026',
      date: '2026-02-15',
      time: '1:00 PM - 6:00 PM',
      location: 'Research Center Auditorium',
      category: 'Academic',
      department: 'Research Office',
      description: 'Showcase of undergraduate and graduate research projects across all disciplines.',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop',
      alt: 'Research poster presentation with students explaining their projects',
      organizer: 'Office of Research',
      attendees: 89,
      maxAttendees: 150,
      featured: false,
      isNew: false
    },
    {
      id: 7,
      title: 'Basketball Championship Finals',
      date: '2026-02-20',
      time: '7:00 PM - 9:00 PM',
      location: 'Indoor Sports Arena',
      category: 'Sports',
      department: 'Athletics',
      description: 'Cheer for your team in the final match of the inter-college basketball championship.',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop',
      alt: 'Basketball game in progress with crowd cheering in indoor arena',
      organizer: 'Athletics Department',
      attendees: 412,
      maxAttendees: 500,
      featured: false,
      isNew: false
    },
    {
      id: 8,
      title: 'Mental Health Awareness Week',
      date: '2026-02-12',
      time: 'All Day',
      location: 'Various Campus Locations',
      category: 'Social',
      department: 'Student Wellness',
      description: 'Week-long series of workshops, counseling sessions, and activities promoting mental wellness.',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=400&fit=crop',
      alt: 'Peaceful meditation session with students in wellness center',
      organizer: 'Wellness Center',
      attendees: 78,
      maxAttendees: 100,
      featured: false,
      isNew: false
    },
    {
      id: 9,
      title: 'Entrepreneurship Summit',
      date: '2026-02-25',
      time: '10:00 AM - 5:00 PM',
      location: 'Business School Auditorium',
      category: 'Academic',
      department: 'Business',
      description: 'Learn from successful entrepreneurs, pitch your startup ideas, and network with investors.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
      alt: 'Entrepreneur presenting business pitch on stage to audience',
      organizer: 'Business School',
      attendees: 134,
      maxAttendees: 200,
      featured: false,
      isNew: false
    },
    {
      id: 10,
      title: 'Library Registration Deadline',
      date: '2026-01-30',
      time: '5:00 PM',
      location: 'Central Library',
      category: 'Administrative',
      department: 'Library Services',
      description: 'Last day to register for library services and access digital resources for Spring 2026.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=400&fit=crop',
      alt: 'Modern university library interior with study spaces and bookshelves',
      organizer: 'Library Administration',
      attendees: 0,
      maxAttendees: 0,
      featured: false,
      isNew: false
    },
    {
      id: 11,
      title: 'Coding Hackathon 2026',
      date: '2026-03-01',
      time: '9:00 AM - 9:00 PM',
      location: 'Innovation Lab',
      category: 'Academic',
      department: 'Computer Science',
      description: '12-hour coding challenge with prizes for best projects in web, mobile, and AI categories.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
      alt: 'Students coding on laptops during hackathon event',
      organizer: 'CS Student Society',
      attendees: 67,
      maxAttendees: 80,
      featured: false,
      isNew: false
    },
    {
      id: 12,
      title: 'Spring Concert Series',
      date: '2026-03-05',
      time: '7:00 PM - 10:00 PM',
      location: 'Outdoor Amphitheater',
      category: 'Social',
      department: 'Student Activities',
      description: 'Live music performances featuring student bands and special guest artists.',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=400&fit=crop',
      alt: 'Outdoor concert with band performing on stage and crowd enjoying',
      organizer: 'Student Activities Board',
      attendees: 289,
      maxAttendees: 400,
      featured: false,
      isNew: false
    },
    {
      id: 13,
      title: 'Graduate School Information Session',
      date: '2026-03-08',
      time: '2:00 PM - 4:00 PM',
      location: 'Academic Building 202',
      category: 'Academic',
      department: 'Graduate Studies',
      description: 'Learn about graduate programs, application process, funding opportunities, and career paths.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop',
      alt: 'Graduate students in cap and gown at commencement ceremony',
      organizer: 'Graduate Admissions',
      attendees: 52,
      maxAttendees: 75,
      featured: false,
      isNew: false
    },
    {
      id: 14,
      title: 'Sustainability Fair',
      date: '2026-03-12',
      time: '11:00 AM - 4:00 PM',
      location: 'Campus Green',
      category: 'Social',
      department: 'Environmental Studies',
      description: 'Explore eco-friendly initiatives, sustainable practices, and green technology innovations.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop',
      alt: 'Sustainability fair with eco-friendly displays and green technology exhibits',
      organizer: 'Environmental Club',
      attendees: 103,
      maxAttendees: 150,
      featured: false,
      isNew: false
    },
    {
      id: 15,
      title: 'Alumni Networking Evening',
      date: '2026-03-15',
      time: '6:00 PM - 9:00 PM',
      location: 'Alumni Center',
      category: 'Administrative',
      department: 'Alumni Relations',
      description: 'Connect with successful alumni, gain career insights, and expand your professional network.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop',
      alt: 'Professional networking event with alumni and students mingling',
      organizer: 'Alumni Association',
      attendees: 87,
      maxAttendees: 120,
      featured: false,
      isNew: false
    }
  ];

  const filteredEvents = allEvents?.filter(event => {
    const matchesSearch = event?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      event?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      event?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = !selectedCategory || event?.category === selectedCategory;
    const matchesDepartment = !selectedDepartment || event?.department === selectedDepartment;

    let matchesDateRange = true;
    if (dateRange?.start && dateRange?.end) {
      const eventDate = new Date(event?.date);
      const startDate = new Date(dateRange?.start);
      const endDate = new Date(dateRange?.end);
      matchesDateRange = eventDate >= startDate && eventDate <= endDate;
    }

    return matchesSearch && matchesCategory && matchesDepartment && matchesDateRange;
  });

  const visibleEvents = filteredEvents?.slice(0, displayedEvents);
  const hasMoreEvents = displayedEvents < filteredEvents?.length;

  const handleLoadMore = () => {
    setDisplayedEvents(prev => prev + 12);
  };

  const handleEventClick = (eventId) => {
    navigate(`/event-details?id=${eventId}`);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedDepartment('');
    setDateRange({ start: '', end: '' });
    setSearchQuery('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (newEventNotifications > 0) {
        setNewEventNotifications(0);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [newEventNotifications]);

  return (
    <>
      <Helmet>
        <title>Events & Notices - SmartCampusAssistant</title>
        <meta name="description" content="Discover campus events, announcements, and activities. Filter by category, search events, and stay updated with the latest campus happenings." />
      </Helmet>
      <Navigation />
      <FloatingAssistant />
      <div className="min-h-screen bg-background pt-20 pb-8">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 md:p-8 shadow-warm-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-2">
                    Events & Notices
                  </h1>
                  <p className="text-primary-foreground opacity-90">
                    Stay updated with campus activities and announcements
                  </p>
                </div>
                {newEventNotifications > 0 && (
                  <div className="hidden md:flex items-center space-x-2 bg-primary-foreground bg-opacity-20 rounded-lg px-4 py-2">
                    <Icon name="Bell" size={20} color="var(--color-primary-foreground)" />
                    <span className="text-primary-foreground font-semibold">
                      {newEventNotifications} new events
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <FeaturedCarousel events={allEvents?.filter(e => e?.featured)} onEventClick={handleEventClick} />

          <div className="mb-6">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events by title, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              dateRange={dateRange}
              setDateRange={setDateRange}
              onClearFilters={handleClearFilters}
              isMobileOpen={isMobileFilterOpen}
              onMobileClose={() => setIsMobileFilterOpen(false)}
            />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {visibleEvents?.length} of {filteredEvents?.length} events
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMobileFilterOpen(true)}
                  iconName="Filter"
                  className="lg:hidden"
                >
                  Filters
                </Button>
              </div>

              {visibleEvents?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visibleEvents?.map((event) => (
                      <EventCard
                        key={event?.id}
                        event={event}
                        onClick={() => handleEventClick(event?.id)}
                      />
                    ))}
                  </div>
                  {hasMoreEvents && (
                    <div className="mt-8 text-center">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleLoadMore}
                        iconName="ChevronDown"
                      >
                        Load More Events
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-card rounded-xl p-12 text-center shadow-warm-md">
                  <Icon name="CalendarX" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    No Events Found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;