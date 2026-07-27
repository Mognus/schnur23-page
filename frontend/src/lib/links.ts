export type LinkEntry = {
	label: string;
	/** null marks a link that is announced but not live yet — rendered as "// SOON". */
	href: string | null;
};

export type Banknote = {
	denom: string;
	icon: string;
	bg: string;
	border: string;
	ink: string;
	/** Rotation in degrees and horizontal offset in px — the stacked-notes look. */
	tilt: number;
	shift: number;
};

export const links: LinkEntry[] = [
	{ label: 'INSTAGRAM', href: 'https://www.instagram.com/schnuur23' },
	{ label: 'SNAPCHAT', href: 'https://snapchat.com/t/JIu4xHjN' },
	{ label: 'TIKTOK', href: 'https://www.tiktok.com/@schnur23' },
	{ label: 'TELEGRAM', href: null },
	{ label: 'PARFUMES', href: null },
	{ label: 'NEW SHIRT', href: null }
];

/**
 * Pure presentation, matched to a link by position. Separate from the link data
 * because that data moves to Postgres later and must not carry hex codes.
 */
const banknotes: Banknote[] = [
	{ denom: '20', icon: '◉', bg: 'linear-gradient(160deg, #cfe0f2 0%, #a8c4e2 100%)', border: '#245c9c', ink: '#173d69', tilt: -2.5, shift: -8 },
	{ denom: '10', icon: '✦', bg: 'linear-gradient(160deg, #f2cfc6 0%, #dfa596 100%)', border: '#a83c26', ink: '#722718', tilt: 2, shift: 10 },
	{ denom: '50', icon: '♪', bg: 'linear-gradient(160deg, #f9dcb4 0%, #efc078 100%)', border: '#b56410', ink: '#7a420a', tilt: -1.8, shift: -6 },
	{ denom: '5', icon: '✈', bg: 'linear-gradient(160deg, #e8e5df 0%, #cdc9c0 100%)', border: '#6f6d66', ink: '#45433e', tilt: 2.6, shift: 8 },
	{ denom: '100', icon: '❀', bg: 'linear-gradient(160deg, #d3e6c4 0%, #b0cf9c 100%)', border: '#33682a', ink: '#22461b', tilt: -2.2, shift: -10 },
	{ denom: '500', icon: '✂', bg: 'linear-gradient(160deg, #e2d6ef 0%, #c6b1de 100%)', border: '#6a3f96', ink: '#472963', tilt: 1.8, shift: 6 }
];

/** Wraps around, so a seventh link from the API reuses the first note. */
export function banknoteFor(index: number): Banknote {
	return banknotes[index % banknotes.length];
}
