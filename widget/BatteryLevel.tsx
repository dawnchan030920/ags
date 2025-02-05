import { bind } from "astal";
import Battery from "gi://AstalBattery?version=0.1";

export function BatteryLevel() {
	const battery = Battery.get_default();

	return (
		<box className="battery-level">
			<icon icon={bind(battery, "batteryIconName")} />
			{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
			<label
				label={bind(battery, "percentage").as(
					(p) => `${Math.floor(p * 100)} %`,
				)}
			/>
		</box>
	);
}
