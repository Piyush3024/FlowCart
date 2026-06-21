import { ROUTES } from './routes';

export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Shop', href: ROUTES.products },
  { label: 'Categories', href: ROUTES.categories },
  { label: 'About', href: ROUTES.about },
  { label: 'FAQ', href: ROUTES.faq },
];

export const DASHBOARD_LINK: NavItem = {
  label: 'Dashboard',
  href: ROUTES.dashboard,
};
