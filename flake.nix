{
  description = "My Awesome Desktop Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    ags,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
    extraAgsLib = with ags.packages.${system}; [
      battery
      apps
      hyprland
      tray
      network
    ];
  in {
    packages.${system} = {
      default = ags.lib.bundle {
        inherit pkgs;
        src = ./.;
        name = "ags-shell";
        entry = "app.ts";

        # additional libraries and executables to add to gjs' runtime
        extraPackages = extraAgsLib ++ [];
      };
    };

    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = [
          pkgs.typescript-language-server
          pkgs.biome
          pkgs.watchexec
          # includes astal3 astal4 astal-io by default
          (ags.packages.${system}.default.override {
            extraPackages = extraAgsLib;
          })
        ];
      };
    };
  };
}
