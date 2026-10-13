export interface Avatar {
	name: string;
	/** Without a src, the avatar shows the first letter of the name */
	src?: string;
	/** Background of the initial avatar */
	color?: string;
}

export interface AvatarAnimationProps {
	/** Duration of the first avatar's animation in ms */
	duration?: number;
	/** Extra ms added to each next avatar's animation */
	stagger?: number;
	/** Extra ms each next name waits before it appears */
	nameDelay?: number;
}
