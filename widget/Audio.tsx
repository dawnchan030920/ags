import { bind } from "astal";
import Wp from "gi://AstalWp?version=0.1";

export function Audio() {
	const speaker = Wp.get_default()?.audio.default_speaker ?? null;
	return speaker && <icon icon={bind(speaker, "volumeIcon")} />;
}
