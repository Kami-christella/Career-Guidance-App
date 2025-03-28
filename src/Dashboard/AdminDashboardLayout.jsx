import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';
import AdminDashboard from './AdminDasboard.jsx';

function AdminDashboardLayout() {
  return (
    <div>
      {/* <Sidebar /> */}
    <AdminDashboard/>
      <div className="dashboard-content">
       {/* This ensures nested routes (CareerTest, Content2) are displayed */}

        <Outlet />

      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboardLayout;
