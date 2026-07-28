import type { Component } from 'svelte';
import SiInstagram from '~icons/simple-icons/instagram';
import SiSnapchat from '~icons/simple-icons/snapchat';
import SiTelegram from '~icons/simple-icons/telegram';
import SiTiktok from '~icons/simple-icons/tiktok';
import LuShirt from '~icons/lucide/shirt';
import LuSprayCan from '~icons/lucide/spray-can';

export type LinkEntry = {
	label: string;
	/** null marks a link that is announced but not live yet — rendered as "// SOON". */
	href: string | null;
	/**
	 * Belongs to the link, not to the banknote skin: the skin repeats by
	 * position, an icon must not. Both icon sets draw with currentColor and size
	 * themselves in em, so the card controls colour and size via CSS alone.
	 * Once links come from Postgres this becomes a name plus a lookup map.
	 */
	icon: Component;
};

export type Banknote = {
	denom: string;
	bg: string;
	border: string;
	ink: string;
	/** Rotation in degrees and horizontal offset in px — the stacked-notes look. */
	tilt: number;
	shift: number;
};

export const links: LinkEntry[] = [
	{ label: 'INSTAGRAM', href: 'https://www.instagram.com/schnuur23', icon: SiInstagram },
	{ label: 'SNAPCHAT', href: 'https://snapchat.com/t/JIu4xHjN', icon: SiSnapchat },
	{ label: 'TIKTOK', href: 'https://www.tiktok.com/@schnur23', icon: SiTiktok },
	{ label: 'TELEGRAM', href: null, icon: SiTelegram },
	{ label: 'PARFUMES', href: null, icon: LuSprayCan },
	{ label: 'NEW SHIRT', href: null, icon: LuShirt }
];

/**
 * Pure presentation, matched to a link by position. Separate from the link data
 * because that data moves to Postgres later and must not carry hex codes.
 */
const banknotes: Banknote[] = [
	{ denom: '20', bg: 'linear-gradient(160deg, #cfe0f2 0%, #a8c4e2 100%)', border: '#245c9c', ink: '#173d69', tilt: -2.5, shift: -8 },
	{ denom: '10', bg: 'linear-gradient(160deg, #f2cfc6 0%, #dfa596 100%)', border: '#a83c26', ink: '#722718', tilt: 2, shift: 10 },
	{ denom: '50', bg: 'linear-gradient(160deg, #f9dcb4 0%, #efc078 100%)', border: '#b56410', ink: '#7a420a', tilt: -1.8, shift: -6 },
	{ denom: '5', bg: 'linear-gradient(160deg, #e8e5df 0%, #cdc9c0 100%)', border: '#6f6d66', ink: '#45433e', tilt: 2.6, shift: 8 },
	{ denom: '100', bg: 'linear-gradient(160deg, #d3e6c4 0%, #b0cf9c 100%)', border: '#33682a', ink: '#22461b', tilt: -2.2, shift: -10 },
	{ denom: '500', bg: 'linear-gradient(160deg, #e2d6ef 0%, #c6b1de 100%)', border: '#6a3f96', ink: '#472963', tilt: 1.8, shift: 6 }
];

/** Wraps around, so a seventh link from the API reuses the first note. */
export function banknoteFor(index: number): Banknote {
	return banknotes[index % banknotes.length];
}
