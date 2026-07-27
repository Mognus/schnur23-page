export type NavItem = {
	label: string;
	href: string;
};

/** Single source for the mobile burger overlay and the desktop sidebar. */
export const nav: NavItem[] = [
	{ label: 'LINKTREE', href: '/' },
	{ label: 'SIGN', href: '/sign' }
];
