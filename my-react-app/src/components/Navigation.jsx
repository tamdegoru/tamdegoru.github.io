import { NavLink } from 'react-router-dom';

export default function Navigation({ items }) {
  return (
    <nav className="nav">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
