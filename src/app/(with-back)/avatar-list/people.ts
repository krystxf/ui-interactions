import type { Avatar } from "@/components/ui/avatar-list";

export const avatars: Avatar[] = [
	{ src: "/avatars/liam-carter.jpg", name: "Liam Carter" },
	{ src: "/avatars/ava-brooks.jpg", name: "Ava Brooks" },
	{ src: "/avatars/mia-sullivan.jpg", name: "Mia Sullivan" },
	{ src: "/avatars/noah-bennett.jpg", name: "Noah Bennett" },
	{ src: "/avatars/ethan-hayes.jpg", name: "Ethan Hayes" },
	{ src: "/avatars/zoe-turner.jpg", name: "Zoe Turner" },
];

export const participants: Avatar[] = [
	{ src: "/avatars/owen-price.jpg", name: "Owen Price" },
	{ src: "/avatars/lucas-reed.jpg", name: "Lucas Reed" },
	{ src: "/avatars/hana-mori.jpg", name: "Hana Mori" },
	{ src: "/avatars/jonah-ellis.jpg", name: "Jonah Ellis" },
	{ src: "/avatars/marcus-hale.jpg", name: "Marcus Hale" },
	{ src: "/avatars/daniel-kim.jpg", name: "Daniel Kim" },
	...avatars,
];

/** The longer list, with a few people from the call added */
export const team: Avatar[] = [
	...avatars,
	{ src: "/avatars/owen-price.jpg", name: "Owen Price" },
	{ src: "/avatars/hana-mori.jpg", name: "Hana Mori" },
	{ src: "/avatars/daniel-kim.jpg", name: "Daniel Kim" },
];

const FIRST_NAMES = [
	"Alex",
	"Bea",
	"Cole",
	"Dana",
	"Eli",
	"Faye",
	"Gus",
	"Ivy",
	"Jude",
	"Kira",
];
const LAST_NAMES = [
	"Adams",
	"Baker",
	"Cruz",
	"Dunn",
	"Ford",
	"Gray",
	"Holt",
	"Lane",
	"Moss",
	"Wolfe",
];

/** 100 people with photos from pravatar.cc, picked by name */
export const crowd: Avatar[] = Array.from({ length: 100 }, (_, index) => {
	const name = `${FIRST_NAMES[index % 10]} ${LAST_NAMES[Math.floor(index / 10)]}`;
	return {
		src: `https://i.pravatar.cc/96?u=${encodeURIComponent(name)}`,
		name,
	};
});
