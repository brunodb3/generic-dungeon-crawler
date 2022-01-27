import * as PIXI from "pixi.js";

import { Engine } from "@classes";
import { Menu, Dungeon } from "@scenes";

window.devicePixelRatio = 1;
PIXI.settings.RESOLUTION = 1;
PIXI.settings.ROUND_PIXELS = false;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const Loader: PIXI.Loader = PIXI.Loader.shared;
Loader.add("spritesheet", "assets/dungeon_crawler_spritesheet.json")
  .add("menu_background", "assets/menu_background.jpeg")
  .add("menu_title", "assets/generic_dungeon_crawler_title.png")
  .load(setup);

function setup() {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  document.body.appendChild(app.view);

  app.renderer.view.style.display = "block";
  app.renderer.view.style.position = "absolute";

  const engine = new Engine(app);

  const menu = new Menu(engine);
  const dungeon = new Dungeon(engine);

  engine.scenes = [menu, dungeon];
  engine.startScene("menu");
}
