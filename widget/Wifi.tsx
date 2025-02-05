import { bind } from "astal";
import Network from "gi://AstalNetwork?version=0.1";

export function Wifi() {
	const network = Network.get_default();
	const wifi = bind(network, "wifi");

	return (
		<box>
			{wifi.as((wifi) => (
				<icon
					tooltipText={bind(wifi, "ssid").as(String)}
					className="Wifi"
					icon={bind(wifi, "iconName")}
				/>
			))}
		</box>
	);
}
