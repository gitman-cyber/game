// ---------------------------
// GAME CLASS
// ---------------------------
class Game {
    constructor() {
        this.terrain = null;
        this.player = null;
        this.camera = null;

        this.inventory = null;
        this.debug = null;
        this.font = null;

        this.lastFrame = 0;
    }

    // ---------------------------
    // LOAD ASSETS
    // ---------------------------
    preload() {
        this.font = new Font("assets/RobotoMono.ttf");
    }

    // ---------------------------
    // INITIALIZE GAME SYSTEMS
    // ---------------------------
    setup() {
        createCanvas(1280, 720, WEBGL);
        angleMode(DEGREES);

        // --- Items ---
        registerDefaultItems();

        // --- Crafting Recipes ---
        CRAFTING.addRecipe(
            { "wood": 1, "stone": 1 },
            stack("torch", 2)
        );

        CRAFTING.addRecipe(
            { "stone": 3, "wood": 2 },
            stack("pickaxe", 1)
        );

        // --- Terrain ---
        this.terrain = new Terrain(2000, 2000, 20);
        this.terrain.update();

        // --- Player ---
        this.player = new Player(0, -200, 0);

        // --- Camera ---
        this.camera = new FirstPersonCamera(0, -200, 0, 60, this.player);

        // --- Inventory ---
        this.inventory = new Inventory(
            [
                stack("wood", 5),
                stack("stone", 3),
                stack("apple", 1),
                null,
                null,
                null
            ],
            20, 20, this.font, 300, 300
        );

        // --- Debug Panel ---
        this.debug = new Debug(this.font, 20, 350);

        // Lock mouse for FPS camera
        document.body.requestPointerLock =
            document.body.requestPointerLock ||
            document.body.mozRequestPointerLock;
        document.body.requestPointerLock();
    }

    // ---------------------------
    // UPDATE GAME LOGIC
    // ---------------------------
    update(dt) {
        this.player.handleInput();
        this.player.applyPhysics(this.terrain);

        this.camera.update();

        // Debug info
        this.debug.lines = [];
        this.debug.log("FPS: " + floor(frameRate()));
        this.debug.log("Player X: " + floor(this.player.pos.x));
        this.debug.log("Player Y: " + floor(this.player.pos.y));
        this.debug.log("Player Z: " + floor(this.player.pos.z));
    }

    // ---------------------------
    // RENDER EVERYTHING
    // ---------------------------
    render() {
        background(135, 206, 235);

        // World
        push();
        rotateX(60);
        translate(-this.terrain.w / 2, -200, -this.terrain.h / 2);
        this.terrain.render();
        pop();

        // UI
        this.inventory.draw();
        this.debug.draw();
    }

    // ---------------------------
    // MAIN GAME LOOP
    // ---------------------------
    loop() {
        let now = millis();
        let dt = (now - this.lastFrame) / 1000;
        this.lastFrame = now;

        this.update(dt);
        this.render();
    }
}