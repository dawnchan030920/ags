import { bind } from "astal";
import Tray from "gi://AstalTray?version=0.1";

export function SystemTray() {
	const tray = Tray.get_default();

	return (
		<box className="system-tray">
			{bind(tray, "items").as((items) =>
				items.map((item) => (
					// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
					<menubutton
						tooltipMarkup={bind(item, "tooltipMarkup")}
						usePopover={false}
						actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
						menuModel={bind(item, "menuModel")}
					>
						<icon gicon={bind(item, "gicon")} />
					</menubutton>
				)),
			)}
		</box>
	);
}
