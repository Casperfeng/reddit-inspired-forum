export type NavLink = {
  label: string;
  linkTo: string;
  auth: boolean;
};

export const NavLinks: NavLink[] = [
  {
    label: 'Login',
    linkTo: '/login',
    auth: false,
  },
  {
    label: 'Logout',
    linkTo: '/logout',
    auth: true,
  },
  {
    label: 'Register',
    linkTo: '/register',
    auth: false,
  },
];

export default NavLinks;
