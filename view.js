class FirstPersonCamera {
  constructor(x, y, z, fov, toFollow) {
    this.pos = createVector(x, y, z);
    this.fov = fov;
    this.target = toFollow; // player or any object with .pos

    this.yaw = 0;   // left/right rotation
    this.pitch = 0; // up/down rotation

    this.sensitivity = 0.2;
  }

  // ---------------------------
  // Mouse Look
  // ---------------------------
  handleMouseLook() {
    let dx = movedX * this.sensitivity;
    let dy = movedY * this.sensitivity;

    this.yaw   -= dx;
    this.pitch -= dy;

    // clamp pitch so camera doesn't flip
    this.pitch = constrain(this.pitch, -89, 89);
  }

  // ---------------------------
  // Follow Target (Player)
  // ---------------------------
  followTarget() {
    if (!this.target) return;

    // camera sits at player's head height
    this.pos.x = this.target.pos.x;
    this.pos.y = this.target.pos.y - 20;
    this.pos.z = this.target.pos.z;
  }

  // ---------------------------
  // Apply Camera Transform
  // ---------------------------
  apply() {
    // convert yaw/pitch to a forward direction vector
    let dir = createVector(
      cos(this.pitch) * sin(this.yaw),
      sin(this.pitch),
      cos(this.pitch) * cos(this.yaw)
    );

    // set FOV
    perspective(this.fov, width / height, 0.1, 5000);

    // apply camera
    camera(
      this.pos.x, this.pos.y, this.pos.z,
      this.pos.x + dir.x,
      this.pos.y + dir.y,
      this.pos.z + dir.z,
      0, 1, 0
    );
  }

  // ---------------------------
  // Update Camera Each Frame
  // ---------------------------
  update() {
    this.handleMouseLook();
    this.followTarget();
    this.apply();
  }
}
