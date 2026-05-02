import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import './App.css';

const RouterContext = createContext({ path: '/', navigate: () => {} });

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

export function useRouter() {
  return useContext(RouterContext);
}

function RouterProvider({ children }) {
  const [path, setPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextPath) => {
    if (nextPath !== path) {
      window.history.pushState({}, '', nextPath);
      setPath(nextPath);
    }
  };

  const value = useMemo(() => ({ path, navigate }), [path]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

function RouteView() {
  const { path } = useRouter();

  if (path === '/about') {
    return <AboutPage />;
  }

  return <HomePage tableData={tableData} />;
}

export default function App() {
  return (
    <RouterProvider>
      <Header title={`Садиба "Горизонт" — лабораторна на React`} />
      <Navigation items={navigationItems} />

      <main className="layout">
        <RouteView />
      </main>

      <Footer />
    </RouterProvider>
  );
}
