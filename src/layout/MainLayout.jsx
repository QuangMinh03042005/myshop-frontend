import { Link, Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function MainLayout() {

  return (
    <div>
      <NavBar/>
      <main className="p-4">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
