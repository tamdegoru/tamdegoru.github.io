import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import './App.css';

const navigationItems = [
  { label: 'Головна', path: '/' },
  { label: 'Про проєкт', path: '/about' },
];

const tableData = [
  { id: 1, service: 'Проживання у котеджі', price: '1800 грн/доба', season: 'Цілий рік' },
  { id: 2, service: 'Сніданок', price: '250 грн', season: 'Цілий рік' },
  { id: 3, service: 'Екскурсія в гори', price: '900 грн', season: 'Весна-Осінь' },
  { id: 4, service: 'Чан та сауна', price: '1200 грн', season: 'Цілий рік' },
];

export default function App() {
  return (
    <BrowserRouter>
      <Header title={`Садиба "Горизонт" — лабораторна на React`} />
      <Navigation items={navigationItems} />

      <main className="layout">
        <Routes>
          <Route path="/" element={<HomePage tableData={tableData} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
