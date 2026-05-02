import React from 'react';

// Імпортуємо ваші компоненти (колишні partials)
import Header from './components/Header';
import HeroAboutUs from './components/HeroAboutUs';
import Services from './components/Services';
import SliderGallery from './components/SliderGallery';
import AccommodationRooms from './components/AccommodationRooms';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

// Імпортуємо стилі
import './css/index.css';

export default function App() {
  return (
    <>
      <Header />
      <HeroAboutUs />
      <Services />
      <SliderGallery />
      <AccommodationRooms />
      <Gallery />
      <Footer />
    </>
  );
}