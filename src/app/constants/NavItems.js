import {
    Home,
    Search,
    Compass,
    Video,
    MessageCircle,
    Heart,
    PlusCircle,
    UserCircle,
    Menu,
  } from 'lucide-react';
  
 export const navbarItems = [
    {
      icon: <Home size={24} className="icons" />,
      name: 'Home',
      href: '#',
    },
    {
      icon: <Search size={24} className="icons" />,
      name: 'Search',
      href: '#',
    },
    {
      icon: <Compass size={24} className="icons" />,
      name: 'Explore',
      href: '#',
    },
    {
      icon: <Video size={24} className="icons" />,
      name: 'Reels',
      href: '/instagram',
    },
    {
      icon: <MessageCircle size={24} className="icons" />,
      name: 'Messages',
      href: '#',
    },
    {
      icon: <Heart size={24} className="icons" />,
      name: 'Notifications',
      href: '#',
    },
    {
      icon: <PlusCircle size={24} className="icons" />,
      name: 'Create',
      href: '#',
    },
    {
      icon: <UserCircle size={24} className="icons" />,
      name: 'Profile',
      href: '/profile',
    },
    {
      icon: <Menu size={24} className="icons" />,
      name: 'More',
      href: '#',
    },
  ];