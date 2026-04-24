import { Link } from 'react-router-dom';
import homeIcon from '@/assets/Home-Icon.png';

interface NavbarProps {
  variant?: 'bg' | 'white';
}

export default function Navbar({ variant = 'white' }: NavbarProps) {
  return (
    <nav className={variant === 'bg' ? 'navbar-bg' : 'navbar-white'}>
      <ul className="nav-list">
        <li className="nav-item-left">
          <Link to="/" className="logo">
            <img src={homeIcon} width={50} alt="Hom3Town Home" />
          </Link>
        </li>
        <li className="nav-item-right">
          <Link to="/login" className="btn">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
