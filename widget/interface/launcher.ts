import { App } from "astal/gtk3";

export const windowName = "launcher";

export function hide() {
	App.get_window(windowName)?.hide();
}

export function show() {
	App.get_window(windowName)?.show();
}

export function isShown() {
	return App.get_window(windowName)?.is_visible();
}
