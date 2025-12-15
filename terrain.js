// ---------------------------
// Terrain Class with Biomes
// ---------------------------
class Terrain {
  constructor(w, h, scl) {
    this.w = w;
    this.h = h;
    this.scl = scl;

    this.cols = floor(w / scl);
    this.rows = floor(h / scl);

    // heightmap
    this.grid = Array.from({ length: this.cols }, () =>
      Array(this.rows).fill(0)
    );

    // biome map (stores color per vertex)
    this.biomes = Array.from({ length: this.cols }, () =>
      Array(this.rows).fill(color(0))
    );
  }

  // ---------------------------
  // Height + Biome Generation
  // ---------------------------
  update() {
    let yoff = 0; // ✅ FIX: no movement

    for (let y = 0; y < this.rows; y++) {
      let xoff = 0;

      for (let x = 0; x < this.cols; x++) {
        // Perlin noise height
        let n = noise(xoff, yoff);
        let heightVal = map(n, 0, 1, -150, 150);

        // jagged quantization
        let jagged = round(heightVal / 10) * 10;
        this.grid[x][y] = jagged;

        // assign biome color
        this.biomes[x][y] = this.getBiomeColor(jagged, n);

        xoff += 0.12;
      }
      yoff += 0.12;
    }
  }

  // ---------------------------
  // Biome Logic
  // ---------------------------
  getBiomeColor(height, noiseVal) {
    if (height < -80) {
      return color(0, 0, 150); // deep water
    }
    if (height < -20) {
      return color(0, 80, 200); // shallow water
    }
    if (height < 10) {
      return color(194, 178, 128); // beach
    }
    if (height < 60) {
      return color(34, 139, 34); // grassland
    }
    if (height < 110) {
      return color(139, 69, 19); // rocky
    }
    return color(240); // snow
  }

  // ---------------------------
  // Render Terrain Mesh
  // ---------------------------
  render() {
    for (let y = 0; y < this.rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);

      for (let x = 0; x < this.cols; x++) {
        let xPos = x * this.scl;
        let yPos = y * this.scl;

        let c1 = this.biomes[x][y];
        let c2 = this.biomes[x][y + 1];

        // darker stroke color
        let s1 = color(
          red(c1) * 0.7,
          green(c1) * 0.7,
          blue(c1) * 0.7
        );

        strokeWeight(1.5);
        stroke(s1);

        // upper vertex
        fill(c1);
        vertex(xPos, this.grid[x][y], yPos);

        // lower vertex
        fill(c2);
        vertex(xPos, this.grid[x][y + 1], yPos + this.scl);
      }

      endShape();
    }
  }
}

