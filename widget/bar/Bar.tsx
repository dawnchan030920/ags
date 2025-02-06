import Apps from "gi://AstalApps";
import type { Binding } from "astal";
import * as gtk3 from "astal/gtk3";
import { BatteryLevel } from "./BatteryLevel";
import { Clock } from "./Clock";
import { Focused } from "./Focused";
import { SystemTray } from "./SystemTray";
import { Wifi } from "./Wifi";
import { Workspaces } from "./Workspaces";
import { OS } from "./OS";
import { Audio } from "./Audio";

type Children = {
	child?: JSX.Element | Binding<JSX.Element> | Binding<Array<JSX.Element>>;
	children?: Array<JSX.Element> | Binding<Array<JSX.Element>>;
};

function WidgetSegment({ children, child }: Children) {
	if (child) return <box className="widget-segment">{child}</box>;
	if (children) return <box className="widget-segment">{children}</box>;
	return null;
}

function WidgetGroup({ children, child }: Children) {
	if (child) return <box className="widget-group">{child}</box>;
	if (children) return <box className="widget-group">{children}</box>;
	return null;
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
						<WidgetSegment>
							<OS />
							<LauncherTrigger open={() => print("launcher trigger")} />
						</WidgetSegment>
						<WidgetSegment>
							<Workspaces />
						</WidgetSegment>
					</WidgetGroup>
				</box>
				<box>
					<WidgetGroup>
						<WidgetSegment>
							<Clock />
							<Focused />
						</WidgetSegment>
					</WidgetGroup>
				</box>
				<box hexpand halign={gtk3.Gtk.Align.END}>
					<WidgetGroup>
						<WidgetSegment>
							<SystemTray />
						</WidgetSegment>
						<WidgetSegment>
							<Wifi />
							<Audio />
							<BatteryLevel />
						</WidgetSegment>
					</WidgetGroup>
				</box>
			</centerbox>
		</window>
	);
}

function LauncherTrigger({ open }: { open: () => void }) {
	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button onClicked={() => open()}>
			<icon icon="system-search-symbolic" />
		</button>
	);
}
