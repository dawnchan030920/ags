import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Fragment } from "astal/gtk3/jsx-runtime";
import Mpris from "gi://AstalMpris";

export default function Media() {
	const mpris = Mpris.get_default();
	const player = bind(mpris, "players").as((ps) => (ps[0] ? ps[0] : null));

	return (
		<box>
			{player.as((p) =>
				p ? (
					<box className="media" spacing={6}>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button>
							<box spacing={6}>
								<box
									className="cover"
									valign={Gtk.Align.CENTER}
									css={bind(p, "coverArt").as(
										(cover) => `background-image: url('${cover}');`,
									)}
								/>
								<box>
									{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
									<label
										label={bind(p, "metadata").as(() => `${p.title}`)}
										maxWidthChars={20}
										truncate
									/>
									{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
									<label label=" - " />
									{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
									<label
										label={bind(p, "metadata").as(() => `${p.artist}`)}
										maxWidthChars={10}
										truncate
									/>
								</box>
							</box>
						</button>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClicked={() => p.play_pause()}
							visible={bind(p, "canControl")}
						>
							<icon
								icon={bind(p, "playbackStatus").as((s) =>
									s === Mpris.PlaybackStatus.PLAYING
										? "media-playback-pause-symbolic"
										: "media-playback-start-symbolic",
								)}
							/>
						</button>
					</box>
				) : (
					<box spacing={6}>
						<icon icon="audio-x-generic-symbolic" />
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label label="暂无媒体" />
					</box>
				),
			)}
		</box>
	);
}
