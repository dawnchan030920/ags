import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";

export function Focused() {
	const hyprland = Hyprland.get_default();
	const focusedClient = bind(hyprland, "focusedClient");
	const focusedWorkspace = bind(hyprland, "focusedWorkspace");

	return (
		<box>
			{focusedClient.as((client) => {
				if (client)
					return (
						<box spacing={6}>
							<icon icon={client.initialClass} />
							{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
							<label label={bind(client, "title")} />
						</box>
					);

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
