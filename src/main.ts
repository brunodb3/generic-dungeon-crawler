import * as PIXI from "pixi.js";

import Player from "./classes/Player";

const app = new PIXI.Application();
const loader = PIXI.Loader.shared;

window.devicePixelRatio = 1;
PIXI.settings.RESOLUTION = 1;
PIXI.settings.ROUND_PIXELS = false;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

app.resizeTo = window;
app.renderer.view.style.display = "block";
app.renderer.view.style.position = "absolute";

document.getElementById("app")?.appendChild(app.view);

loader
  .add("spritesheet", "assets/dungeon_crawler_spritesheet.json")
  .load(setup);

function setup() {
  const player = new Player(app);

  app.stage.addChild(player);
}
