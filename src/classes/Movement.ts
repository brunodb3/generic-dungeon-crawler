import Keyboard from "./Keyboard";
import Application from "./Application";

import {
  Joystick,
  Direction,
  JoystickChangeEvent,
} from "pixi-virtual-joystick";

import isMobile from "../utils/isMobile";

export default class Movement {
  private app: Application;

  private vy: number = 0;
  private vx: number = 0;

  private mode: "wasd" | "arrows" | "both";
  private velocity: number;

  public joystick?: Joystick;

  constructor(
    app: Application,
    options?: {
      mode?: "wasd" | "arrows" | "both";
      velocity?: number;
    }
  ) {
    const mode = options?.mode ? options.mode : "both";
    const velocity = options?.velocity ? options.velocity : 5;

    this.app = app;
    this.mode = mode;
    this.velocity = velocity;

    if (isMobile()) {
      this.joystick = new Joystick({
        onChange: this.onJoystickUpdate.bind(this),
        onEnd: this.onJoystickEnd.bind(this),
      });

      this.app.stage.addChild(this.joystick);
    }

    this.setupKeyboard();
  }

  public getVelocityValues() {
    return { vy: this.vy, vx: this.vx };
  }

  public getVelocity() {
    return this.velocity;
  }

  public setVelocity(newVelocity: number) {
    this.velocity = newVelocity;
  }

  public onResize() {
    this.joystick?.position.set(100, window.innerHeight - 100);
  }

  private setupKeyboard() {
    switch (this.mode) {
      case "wasd":
        this.wasdMovement();
        break;
      case "arrows":
        this.arrowsMovement();
        break;
      case "both":
        this.wasdMovement();
        this.arrowsMovement();
        break;
      default:
        this.wasdMovement();
        this.arrowsMovement();
        break;
    }
  }

  private onJoystickUpdate(data: JoystickChangeEvent) {
    switch (data.direction) {
      case Direction.LEFT:
        this.vx = -this.velocity;
        this.vy = 0;
        break;
      case Direction.RIGHT:
        this.vx = this.velocity;
        this.vy = 0;
        break;
      case Direction.TOP:
        this.vy = -this.velocity;
        this.vx = 0;
        break;
      case Direction.BOTTOM:
        this.vy = this.velocity;
        this.vx = 0;
        break;
      case Direction.TOP_LEFT:
        this.vy = -this.velocity;
        this.vx = -this.velocity;
        break;
      case Direction.TOP_RIGHT:
        this.vy = -this.velocity;
        this.vx = this.velocity;
        break;
      case Direction.BOTTOM_LEFT:
        this.vy = this.velocity;
        this.vx = -this.velocity;
        break;
      case Direction.BOTTOM_RIGHT:
        this.vy = this.velocity;
        this.vx = this.velocity;
        break;
      default:
        this.vy = 0;
        this.vx = 0;
        break;
    }
  }

  private onJoystickEnd() {
    this.vy = 0;
    this.vx = 0;
  }

  private wasdMovement() {
    const keyW = new Keyboard("KeyW");
    const keyS = new Keyboard("KeyS");
    const keyA = new Keyboard("KeyA");
    const keyD = new Keyboard("KeyD");

    this.addKeyboardMovement(keyW, keyS, keyA, keyD);
  }

  private arrowsMovement() {
    const arrowUp = new Keyboard("ArrowUp");
    const arrowDown = new Keyboard("ArrowDown");
    const arrowLeft = new Keyboard("ArrowLeft");
    const arrowRight = new Keyboard("ArrowRight");

    this.addKeyboardMovement(arrowUp, arrowDown, arrowLeft, arrowRight);
  }

  private addKeyboardMovement(
    up: Keyboard,
    down: Keyboard,
    left: Keyboard,
    right: Keyboard
  ) {
    up.onPress = () => {
      this.vy = -this.velocity;
    };
    up.onRelease = () => {
      if (!down.isDown) {
        this.vy = 0;
      }
    };

    down.onPress = () => {
      this.vy = this.velocity;
    };
    down.onRelease = () => {
      if (!up.isDown) {
        this.vy = 0;
      }
    };

    left.onPress = () => {
      this.vx = -this.velocity;
    };
    left.onRelease = () => {
      if (!right.isDown) {
        this.vx = 0;
      }
    };

    right.onPress = () => {
      this.vx = this.velocity;
    };
    right.onRelease = () => {
      if (!left.isDown) {
        this.vx = 0;
      }
    };
  }
}
