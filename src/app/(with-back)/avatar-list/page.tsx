import { AvatarCluster, AvatarList } from "@/components/ui/avatar-list";
import { avatars, crowd, participants, team } from "./people";

export default function AvatarListPage() {
	return (
		<div className="flex min-h-screen flex-col items-center gap-8 px-8 pt-[30vh]">
			<div className="flex flex-col items-center gap-1 text-center">
				<h1 className="font-bold text-2xl text-gray-900">Avatar List</h1>
				<p className="text-gray-500 text-sm">Click a stack to expand it</p>
			</div>
			{/* fixed slots, so an expanding example doesn't push its neighbors */}
			<div className="flex flex-wrap items-start justify-center gap-8">
				<div className="flex w-52 justify-center">
					<AvatarList avatars={avatars.slice(0, 4)} />
				</div>
				<div className="flex w-52 justify-center">
					<AvatarList avatars={team} max={4} size={40} />
				</div>
				<div className="flex w-52 justify-center">
					<AvatarCluster avatars={participants} />
				</div>
				<div className="flex w-52 justify-center">
					<AvatarList avatars={crowd} max={4} size={40} />
				</div>
			</div>
		</div>
	);
}
