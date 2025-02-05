import GLib from "gi://GLib?version=2.0";

export function OS() {
	return <icon icon={GLib.get_os_info("LOGO") || "missing-symbolic"} />;
}
