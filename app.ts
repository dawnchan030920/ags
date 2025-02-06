import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./widget/bar/Bar";
import Launcher from "./widget/launcher/Launcher";
import * as launcher from "./widget/interface/launcher";

App.start({
	css: style,
	main() {
		App.get_monitors().map(Bar).map(Launcher);
		launcher.hide();
	},
	requestHandler(request, res) {
		if (request === "launcher") {
			if (!launcher.isShown()) {
				launcher.show();
				res("Launcher showed");
			}
		}
		res("failed");
	},
});
