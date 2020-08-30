export type NavLink = {
  label: string;
  linkTo: string;
};

export const NavLinks: NavLink[] = [
  {
    label: 'Login',
    linkTo: '/login',
  },
  {
    label: 'Register',
    linkTo: '/register',
  },
];

export default NavLinks;
