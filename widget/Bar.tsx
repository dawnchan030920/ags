import * as gtk3 from "astal/gtk3";
import { GLib, Variable, bind } from "astal";
import Battery from "gi://AstalBattery";
import Apps from "gi://AstalApps";
import Hyprland from "gi://AstalHyprland";

function BatteryLevel() {
	const battery = Battery.get_default();

	return (
		<box>
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

function Workspaces() {
	const hyprland = Hyprland.get_default();

	const sortedNormalWorkspaces = bind(hyprland, "workspaces").as((workspaces) =>
		workspaces
			.filter((ws) => !(ws.id >= -99 && ws.id <= -2))
			.sort((a, b) => a.id - b.id),
	);
	return (
		<box>
			{sortedNormalWorkspaces.as((workspaces) =>
				workspaces.map((workspace) => (
					<button onClicked={() => workspace.focus()}>{workspace.id}</button>
				)),
			)}
		</box>
	);
}

function Clock() {
	const time = Variable<string>("").poll(
		60000,
		() => GLib.DateTime.new_now_local().format("%-m月%-d日 %H:%M") ?? "",
	);

	return <label onDestroy={() => time.drop()} label={time()} />;
}

export default function Bar(monitor: gtk3.Gdk.Monitor) {
	const { TOP, LEFT, RIGHT } = gtk3.Astal.WindowAnchor;

	return (
		<window
			className="Bar"
			gdkmonitor={monitor}
			exclusivity={gtk3.Astal.Exclusivity.EXCLUSIVE}
			anchor={TOP | LEFT | RIGHT}
		>
			<centerbox>
				<box hexpand halign={gtk3.Gtk.Align.START}>
					<Workspaces />
				</box>
				<box>
					<Clock />
				</box>
				<box hexpand halign={gtk3.Gtk.Align.END}>
					<BatteryLevel />
				</box>
			</centerbox>
		</window>
	);
}
