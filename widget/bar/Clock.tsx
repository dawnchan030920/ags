import { Variable } from "astal";
import GLib from "gi://GLib?version=2.0";

export function Clock() {
	const time = Variable<string>("").poll(
		60000,
		() => GLib.DateTime.new_now_local().format("%-m月%-d日 %A · %H:%M") ?? "",
	);

	// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
	return <label onDestroy={() => time.drop()} label={time()} />;
}
