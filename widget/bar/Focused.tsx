import { bind, execAsync } from "astal";
import Hyprland from "gi://AstalHyprland";

export function Focused() {
	const hyprland = Hyprland.get_default();
	const focusedClient = bind(hyprland, "focusedClient");
	const focusedWorkspace = bind(hyprland, "focusedWorkspace");

	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button
			onClicked={() =>
				execAsync("hyprctl dispatch overview:toggle")
					.then((out) => console.log(out))
					.catch((err) => console.log(err))
			}
		>
			{focusedClient.as((client) => {
				if (client)
					return (
						<box spacing={6}>
							<icon icon={client.initialClass} />
							{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
							<label
								label={bind(client, "title")}
								maxWidthChars={30}
								truncate
							/>
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
		</button>
	);
}
