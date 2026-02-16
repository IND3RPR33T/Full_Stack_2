import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '../../components/ui/Navigation';
import FloatingAssistant from '../../components/ui/FloatingAssistant';
import Icon from '../../components/AppIcon';
import SearchPanel from './components/SearchPanel';
import BuildingMarker from './components/BuildingMarker';
import BuildingInfoCard from './components/BuildingInfoCard';
import NavigationPanel from './components/NavigationPanel';
import NearbyEventsPanel from './components/NearbyEventsPanel';

const CampusMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNavigation, setShowNavigation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoomLevel, setZoomLevel] = useState(16);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [showNearbyEvents, setShowNearbyEvents] = useState(true);

  const buildings = [
    {
      id: 1,
      name: 'Computer Science Building',
      shortName: 'CS',
      category: 'academic',
      position: { lat: 40.7130, lng: -74.0055 },
      description: 'Home to the Computer Science and Engineering departments',
      hours: 'Mon-Fri: 7:00 AM - 10:00 PM, Sat-Sun: 9:00 AM - 6:00 PM',
      accessibility: 'Wheelchair accessible, elevator available',
      facilities: ['Computer Labs', 'Study Rooms', 'Lecture Halls', 'Research Labs'],
      currentEvents: 2,
      crowdLevel: 'moderate',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
      alt: 'Modern computer science building with glass facade'
    },
    {
      id: 2,
      name: 'Student Center',
      shortName: 'SC',
      category: 'dining',
      position: { lat: 40.7125, lng: -74.0065 },
      description: 'Main dining hall and student activity center',
      hours: 'Mon-Sun: 7:00 AM - 11:00 PM',
      accessibility: 'Fully accessible with ramps and elevators',
      facilities: ['Dining Hall', 'Food Court', 'Lounge Areas', 'Game Room', 'ATM'],
      currentEvents: 1,
      crowdLevel: 'high',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      alt: 'Student center cafeteria with dining tables and food stations'
    },
    {
      id: 3,
      name: 'University Library',
      shortName: 'LIB',
      category: 'academic',
      position: { lat: 40.7135, lng: -74.0070 },
      description: 'Main campus library with extensive resources and study spaces',
      hours: '24/7 during semester, reduced hours during breaks',
      accessibility: 'Wheelchair accessible, assistive technology available',
      facilities: ['Study Rooms', 'Computer Lab', 'Archives', 'Quiet Zones', 'Group Study Areas'],
      currentEvents: 0,
      crowdLevel: 'moderate',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      alt: 'University library interior with bookshelves and reading areas'
    },
    {
      id: 4,
      name: 'Recreation Center',
      shortName: 'REC',
      category: 'recreational',
      position: { lat: 40.7120, lng: -74.0050 },
      description: 'State-of-the-art fitness and recreation facility',
      hours: 'Mon-Fri: 6:00 AM - 11:00 PM, Sat-Sun: 8:00 AM - 9:00 PM',
      accessibility: 'Accessible gym equipment and facilities',
      facilities: ['Gym', 'Pool', 'Basketball Courts', 'Yoga Studio', 'Locker Rooms'],
      currentEvents: 3,
      crowdLevel: 'high',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      alt: 'Modern recreation center with exercise equipment and basketball court'
    },
    {
      id: 5,
      name: 'Administration Building',
      shortName: 'ADMIN',
      category: 'administrative',
      position: { lat: 40.7132, lng: -74.0062 },
      description: 'Main administrative offices and student services',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      accessibility: 'Fully accessible',
      facilities: ['Registrar', 'Financial Aid', 'Admissions', 'Career Services', 'Counseling'],
      currentEvents: 0,
      crowdLevel: 'low',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      alt: 'Administration building with modern architecture and glass entrance'
    },
    {
      id: 6,
      name: 'Engineering Complex',
      shortName: 'ENG',
      category: 'academic',
      position: { lat: 40.7128, lng: -74.0048 },
      description: 'Engineering departments and laboratories',
      hours: 'Mon-Fri: 7:00 AM - 10:00 PM, Sat-Sun: 9:00 AM - 6:00 PM',
      accessibility: 'Wheelchair accessible',
      facilities: ['Labs', 'Workshop', 'Design Studios', 'Lecture Halls'],
      currentEvents: 1,
      crowdLevel: 'moderate',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      alt: 'Engineering building with modern laboratory facilities'
    }
  ];

  const nearbyEvents = [
    {
      id: 1,
      title: 'AI Workshop',
      location: 'Computer Science Building',
      distance: '50m',
      time: '2:00 PM',
      attendees: 45
    },
    {
      id: 2,
      title: 'Basketball Tournament',
      location: 'Recreation Center',
      distance: '120m',
      time: '4:00 PM',
      attendees: 80
    },
    {
      id: 3,
      title: 'Study Group Session',
      location: 'University Library',
      distance: '85m',
      time: '6:00 PM',
      attendees: 12
    }
  ];

  const categories = [
    { id: 'all', label: 'All Buildings', icon: 'Building2', color: 'text-foreground' },
    { id: 'academic', label: 'Academic', icon: 'GraduationCap', color: 'text-primary' },
    { id: 'dining', label: 'Dining', icon: 'Utensils', color: 'text-warning' },
    { id: 'recreational', label: 'Recreation', icon: 'Dumbbell', color: 'text-success' },
    { id: 'administrative', label: 'Administrative', icon: 'Briefcase', color: 'text-secondary' }
  ];

  const filteredBuildings = buildings?.filter(building => {
    const matchesCategory = selectedCategory === 'all' || building?.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      building?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      building?.shortName?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setMapCenter(building?.position);
    setZoomLevel(18);
  };

  const handleGetDirections = (building) => {
    setShowNavigation(true);
    setSelectedBuilding(building);
  };

  const toggleFavorite = (buildingId) => {
    setFavoriteLocations(prev =>
      prev?.includes(buildingId)
        ? prev?.filter(id => id !== buildingId)
        : [...prev, buildingId]
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      academic: 'bg-primary',
      dining: 'bg-warning',
      recreational: 'bg-success',
      administrative: 'bg-secondary'
    };
    return colors?.[category] || 'bg-muted';
  };

  const getCrowdColor = (level) => {
    const colors = {
      low: 'text-success',
      moderate: 'text-warning',
      high: 'text-error'
    };
    return colors?.[level] || 'text-muted-foreground';
  };

  return (
    <>
      <Helmet>
        <title>Campus Map - SmartCampusAssistant</title>
        <meta name="description" content="Interactive campus map with building search, navigation, and location-based event discovery for comprehensive campus exploration." />
      </Helmet>
      <Navigation />
      <FloatingAssistant />
      <div className="min-h-screen bg-background pt-16">
        <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
          <div className="lg:w-96 bg-card border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <h1 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Map" size={28} color="var(--color-primary)" />
                <span>Campus Map</span>
              </h1>
              <SearchPanel
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredBuildings?.length > 0 ? (
                filteredBuildings?.map(building => (
                  <div
                    key={building?.id}
                    onClick={() => handleBuildingClick(building)}
                    className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border hover:shadow-warm-md transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:border-primary"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${getCategoryColor(building?.category)}/20 border-2 border-${getCategoryColor(building?.category).replace('bg-', '')}/40 rounded-lg flex items-center justify-center font-bold text-sm backdrop-blur-sm`}>
                          <span className="text-foreground">{building?.shortName}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{building?.name}</h3>
                          <p className="text-xs text-muted-foreground">{building?.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e?.stopPropagation();
                          toggleFavorite(building?.id);
                        }}
                        className="p-1 hover:bg-muted rounded transition-smooth"
                      >
                        <Icon
                          name={favoriteLocations?.includes(building?.id) ? 'Star' : 'StarOff'}
                          size={18}
                          color={favoriteLocations?.includes(building?.id) ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} className={getCrowdColor(building?.crowdLevel)} />
                        <span className={getCrowdColor(building?.crowdLevel)}>
                          {building?.crowdLevel} crowd
                        </span>
                      </div>
                      {building?.currentEvents > 0 && (
                        <div className="flex items-center space-x-1 text-primary">
                          <Icon name="Calendar" size={14} />
                          <span>{building?.currentEvents} events</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Icon name="SearchX" size={48} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No buildings found</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 relative bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2 p-8">
                  {filteredBuildings?.map((building, index) => (
                    <BuildingMarker
                      key={building?.id}
                      building={building}
                      isSelected={selectedBuilding?.id === building?.id}
                      onClick={() => handleBuildingClick(building)}
                      style={{
                        gridColumn: `${(index % 3) * 4 + 2} / span 3`,
                        gridRow: `${Math.floor(index / 3) * 4 + 2} / span 3`
                      }}
                      categoryColor={getCategoryColor(building?.category)}
                    />
                  ))}
                </div>

                <div className="absolute top-4 left-4 bg-card rounded-lg shadow-warm-md p-3 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Your Location</span>
                </div>

                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(prev + 1, 20))}
                    className="w-10 h-10 bg-card rounded-lg shadow-warm-md flex items-center justify-center hover:bg-muted transition-smooth"
                  >
                    <Icon name="Plus" size={20} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(prev - 1, 12))}
                    className="w-10 h-10 bg-card rounded-lg shadow-warm-md flex items-center justify-center hover:bg-muted transition-smooth"
                  >
                    <Icon name="Minus" size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setMapCenter(currentLocation);
                      setZoomLevel(16);
                    }}
                    className="w-10 h-10 bg-card rounded-lg shadow-warm-md flex items-center justify-center hover:bg-muted transition-smooth"
                  >
                    <Icon name="Locate" size={20} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 lg:right-auto lg:w-80">
                  {selectedBuilding && (
                    <BuildingInfoCard
                      building={selectedBuilding}
                      onClose={() => setSelectedBuilding(null)}
                      onGetDirections={() => handleGetDirections(selectedBuilding)}
                      isFavorite={favoriteLocations?.includes(selectedBuilding?.id)}
                      onToggleFavorite={() => toggleFavorite(selectedBuilding?.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {showNearbyEvents && (
            <div className="hidden xl:block w-80 bg-card border-l border-border">
              <NearbyEventsPanel
                events={nearbyEvents}
                onClose={() => setShowNearbyEvents(false)}
              />
            </div>
          )}
        </div>

        {showNavigation && selectedBuilding && (
          <NavigationPanel
            destination={selectedBuilding}
            currentLocation={currentLocation}
            onClose={() => setShowNavigation(false)}
          />
        )}

        {!showNearbyEvents && (
          <button
            onClick={() => setShowNearbyEvents(true)}
            className="fixed bottom-4 right-4 xl:hidden w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-warm-lg flex items-center justify-center hover:scale-110 transition-smooth"
          >
            <Icon name="Calendar" size={24} />
          </button>
        )}
      </div>
    </>
  );
};

export default CampusMap;