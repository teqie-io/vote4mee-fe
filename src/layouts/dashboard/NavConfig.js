// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'employee',
    path: '/dashboard/employee',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: getIcon('eva:person-fill'),
  },
];

export default navConfig;
