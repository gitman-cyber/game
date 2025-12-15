
// ---------------------------
// GLOBAL GAME INSTANCE
// ---------------------------
let game = new Game();

// p5.js hooks
function preload() { game.preload(); }
function setup() { game.setup(); }
function draw() { game.loop(); }

// ---------------------------
// INPUT HANDLING
// ---------------------------
function keyPressed() {
    if (key === ' ') {
        game.player.jump();
    }
    if (key === 'i') {
        game.inventory.toggle();
    }
    if (key === 'c') {
        let result = CRAFTING.craftMatching(game.inventory);
        if (result) {
            game.inventory.items.push(result);
        }
    }
}