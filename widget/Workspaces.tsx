import { bind } from "astal";
import Hyprland from "gi://AstalHyprland?version=0.1";

export function Workspaces() {
	const hyprland = Hyprland.get_default();

	const sortedNormalWorkspaces = bind(hyprland, "workspaces").as((workspaces) =>
		workspaces
			.filter((ws) => !(ws.id >= -99 && ws.id <= -2))
			.sort((a, b) => a.id - b.id),
	);

	return (
		<box className="workspaces">
			{sortedNormalWorkspaces.as((workspaces) =>
				workspaces.map((workspace) => (
					// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
					<Item workspace={workspace} />
				)),
			)}
		</box>
	);
}

function Item({ workspace }: { workspace: Hyprland.Workspace }) {
	const hyprland = Hyprland.get_default();
	const focusedWorkspace = bind(hyprland, "focusedWorkspace");

	const content = focusedWorkspace.as((fws) => {
		if (fws.id === workspace.id) return <Active workspace={workspace} />;
		return <Inactive workspace={workspace} />;
	});

	return <box>{content}</box>;
}

function Inactive({ workspace }: { workspace: Hyprland.Workspace }) {
	// biome-ignore lint/a11y/useButtonType: <explanation>
	return <button onClicked={() => workspace.focus()}>{workspace.id}</button>;
}

function Active({ workspace }: { workspace: Hyprland.Workspace }) {
	// biome-ignore lint/a11y/useButtonType: <explanation>
	return <button className="active-workspace">{workspace.id}</button>;
}
