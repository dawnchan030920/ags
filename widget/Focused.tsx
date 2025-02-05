import { bind } from "astal";
import Hyprland from "gi://AstalHyprland?version=0.1";

export function Focused() {
	const hyprland = Hyprland.get_default();
	const focusedClient = bind(hyprland, "focusedClient");
	const focusedWorkspace = bind(hyprland, "focusedWorkspace");

	return (
		<box>
			{focusedClient.as((client) => {
				// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
				if (client) return <label label={client.class} />;

				return (
					// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
					<label
						label={focusedWorkspace.as(
							(workspace) => `Workspace ${workspace.name}`,
						)}
					/>
				);
			})}
		</box>
	);
}
