import { useRouter } from '../App';

export default function Navigation({ items }) {
  const { path, navigate } = useRouter();

  return (
    <nav className="nav">
      {items.map((item) => (
        <a
          key={item.path}
          href={item.path}
          className={`nav-link ${path === item.path ? 'active' : ''}`}
          onClick={(event) => {
            event.preventDefault();
            navigate(item.path);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
