import * as gtk3 from "astal/gtk3";
import { GLib, Variable, bind } from "astal";
import Battery from "gi://AstalBattery";
import Apps from "gi://AstalApps";
import Hyprland from "gi://AstalHyprland";
import Tray from "gi://AstalTray";
import Network from "gi://AstalNetwork";

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

	const focusedWorkspace = bind(hyprland, "focusedWorkspace");
	return (
		<box>
			{sortedNormalWorkspaces.as((workspaces) =>
				workspaces.map((workspace) => (
					// biome-ignore lint/a11y/useButtonType: <explanation>
					// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
					<button
						onClicked={() => workspace.focus()}
						className={focusedWorkspace.as((f) =>
							f.id === workspace.id ? "workspace-focused" : "",
						)}
					>
						{workspace.id}
					</button>
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

	// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
	return <label onDestroy={() => time.drop()} label={time()} />;
}

function FocusedClient() {
	const hyprland = Hyprland.get_default();
	const focused = bind(hyprland, "focusedClient");

	return (
		<box>
			{focused.as(
				(client) =>
					// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
					client && <label label={bind(client, "class").as(String)} />,
			)}
		</box>
	);
}

function SystemTray() {
	const tray = Tray.get_default();

	return (
		<box>
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

function Wifi() {
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

function WidgetGroup({
	children,
	child,
}: { children?: Array<JSX.Element>; child: JSX.Element }) {
	return (
		<box className="widget-group">
			{children?.map((child) => (
				// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
				<box className="widget-item">{child}</box>
			))}
			{child && <box className="widget-item">{child}</box>}
		</box>
	);
}

export default function Bar(monitor: gtk3.Gdk.Monitor) {
	const { TOP, LEFT, RIGHT } = gtk3.Astal.WindowAnchor;

	return (
		<window
			className="bar"
			gdkmonitor={monitor}
			exclusivity={gtk3.Astal.Exclusivity.EXCLUSIVE}
			anchor={TOP | LEFT | RIGHT}
		>
			<centerbox>
				<box hexpand halign={gtk3.Gtk.Align.START}>
					<WidgetGroup>
						<Workspaces />
					</WidgetGroup>
				</box>
				<box>
					<WidgetGroup>
						<Clock />
						<box>·</box>
						<FocusedClient />
					</WidgetGroup>
				</box>
				<box hexpand halign={gtk3.Gtk.Align.END}>
					<WidgetGroup>
						<SystemTray />
					</WidgetGroup>
					<WidgetGroup>
						<Wifi />
						<BatteryLevel />
					</WidgetGroup>
				</box>
			</centerbox>
		</window>
	);
}
