export type NavLink = {
  label: string;
  linkTo: string;
  auth: boolean;
};

export const NavLinks: NavLink[] = [
  {
    label: 'login',
    linkTo: '/login',
    auth: false,
  },
  {
    label: 'register',
    linkTo: '/register',
    auth: false,
  },
];

export default NavLinks;
