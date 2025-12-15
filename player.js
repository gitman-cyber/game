class Player {
  constructor(x, y, z) {
    this.pos = createVector(x, y, z);
    this.vel = createVector(0, 0, 0);

    this.speed = 4;
    this.jumpForce = 12;
    this.gravity = 0.7;

    this.radius = 20; // player collision size
  }

  // ---------------------------
  // Movement Input
  // ---------------------------
  handleInput() {
    let forward = createVector(0, 0, -1);
    let right = createVector(1, 0, 0);

    // WASD movement
    if (keyIsDown(87)) this.pos.add(p5.Vector.mult(forward, this.speed)); // W
    if (keyIsDown(83)) this.pos.add(p5.Vector.mult(forward, -this.speed)); // S
    if (keyIsDown(65)) this.pos.add(p5.Vector.mult(right, -this.speed)); // A
    if (keyIsDown(68)) this.pos.add(p5.Vector.mult(right, this.speed)); // D
  }

  // ---------------------------
  // Physics + Gravity
  // ---------------------------
  applyPhysics(terrain) {
    // gravity
    this.vel.y += this.gravity;
    this.pos.add(this.vel);

    // terrain collision
    let groundY = this.getTerrainHeight(terrain);

    if (this.pos.y > groundY - this.radius) {
      this.pos.y = groundY - this.radius;
      this.vel.y = 0;
    }
  }

  // ---------------------------
  // Jump
  // ---------------------------
  jump() {
    if (this.vel.y === 0) {
      this.vel.y = -this.jumpForce;
    }
  }

  // ---------------------------
  // Sample Terrain Height
  // ---------------------------
  getTerrainHeight(terrain) {
    let tx = floor(this.pos.x / terrain.scl);
    let tz = floor(this.pos.z / terrain.scl);

    tx = constrain(tx, 0, terrain.cols - 1);
    tz = constrain(tz, 0, terrain.rows - 1);

    return terrain.grid[tx][tz];
  }

  // ---------------------------
  // Render Player
  // ---------------------------
  render() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    fill(255, 200, 0);
    noStroke();
    sphere(this.radius);
    pop();
  }
}
