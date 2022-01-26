import Keyboard from "./Keyboard";

export default class Movement {
  private vy: number = 0;
  private vx: number = 0;

  private mode: "wasd" | "arrows" | "both";
  private velocity: number;

  constructor(options?: {
    mode?: "wasd" | "arrows" | "both";
    velocity?: number;
  }) {
    const mode = options?.mode ? options.mode : "both";
    const velocity = options?.velocity ? options.velocity : 5;

    this.mode = mode;
    this.velocity = velocity;

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

  public getVelocityValues() {
    return { vy: this.vy, vx: this.vx };
  }

  public getVelocity() {
    return this.velocity;
  }

  public setVelocity(newVelocity: number) {
    this.velocity = newVelocity;
  }

  private wasdMovement() {
    const keyW = new Keyboard("KeyW");
    const keyS = new Keyboard("KeyS");
    const keyA = new Keyboard("KeyA");
    const keyD = new Keyboard("KeyD");

    this.addMovement(keyW, keyS, keyA, keyD);
  }

  private arrowsMovement() {
    const arrowUp = new Keyboard("ArrowUp");
    const arrowDown = new Keyboard("ArrowDown");
    const arrowLeft = new Keyboard("ArrowLeft");
    const arrowRight = new Keyboard("ArrowRight");

    this.addMovement(arrowUp, arrowDown, arrowLeft, arrowRight);
  }

  private addMovement(
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
