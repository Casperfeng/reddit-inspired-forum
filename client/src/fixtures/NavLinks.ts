export type NavLink = {
  label: string;
  linkTo: string;
};

export const NavLinks: NavLink[] = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Register',
    linkTo: '/register',
  },
];

export default NavLinks;
