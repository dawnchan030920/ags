import Apps from "gi://AstalApps";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { windowName, hide } from "../interface/launcher";
import { Variable } from "astal";

const MAX_ITEMS = 10;

export default function Launcher() {
	const apps = new Apps.Apps();
	const { CENTER } = Gtk.Align;
	const width = Variable(1000);
	const text = Variable("");
	const list = text((text) => apps.fuzzy_query(text).slice(0, MAX_ITEMS));
	return (
		<window
			name={windowName}
			anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM}
			exclusivity={Astal.Exclusivity.IGNORE}
			keymode={Astal.Keymode.ON_DEMAND}
			application={App}
			onKeyPressEvent={(self, event: Gdk.Event) => {
				if (event.get_keyval()[1] === Gdk.KEY_Escape) self.hide();
			}}
			onShow={(self) => {
				text.set("");
				width.set(self.get_current_monitor().workarea.width);
			}}
			className="launcher-container"
		>
			<box>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<eventbox widthRequest={width((w) => w / 2)} expand onClick={hide} />
				<box hexpand={false} vertical widthRequest={500}>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<eventbox heightRequest={100} onClick={hide} />
					<box widthRequest={500} vertical className="launcher">
						<entry
							placeholderText="搜索"
							text={text()}
							onChanged={(self) => text.set(self.text)}
						/>
						<box>
							{list.as((list) => {
								if (list.length > 0)
									return (
										<box spacing={6} vertical>
											{list.map((app) => (
												// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
												<AppItem app={app} />
											))}
										</box>
									);

								return (
									<box
										halign={CENTER}
										vertical
										className="not-found"
										spacing={8}
										hexpand
									>
										<icon icon="system-search-symbolic" />
										{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label label="无搜索结果" />
									</box>
								);
							})}
						</box>
					</box>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<eventbox expand onClick={hide} />
				</box>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<eventbox widthRequest={width((w) => w / 2)} expand onClick={hide} />
			</box>
		</window>
	);
}

function AppItem({ app }: { app: Apps.Application }) {
	const click = () => {
		hide();
		app.launch();
	};
	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button onClicked={click} className="launcher-app-item" hexpand>
			<box>
				<icon icon={app.iconName} />
				<box valign={Gtk.Align.CENTER} vertical>
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label label={app.name} truncate xalign={0} className="name" />
					{app.description && (
						// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
						<label
							label={app.description}
							wrap
							xalign={0}
							className="description"
						/>
					)}
				</box>
			</box>
		</button>
	);
}
