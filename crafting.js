// ---------------------------
// Crafting System
// ---------------------------

class Recipe {
    constructor(inputs, output) {
        // inputs: { "wood": 2, "stone": 1 }
        // output: ItemStack
        this.inputs = inputs;
        this.output = output;
    }

    // Check if inventory contains required items
    canCraft(inventory) {
        for (let id in this.inputs) {
            let needed = this.inputs[id];
            let count = inventory.countItem(id);

            if (count < needed) return false;
        }
        return true;
    }

    // Remove ingredients + return crafted item
    craft(inventory) {
        if (!this.canCraft(inventory)) return null;

        // consume ingredients
        for (let id in this.inputs) {
            let needed = this.inputs[id];
            inventory.removeItems(id, needed);
        }

        return this.output.clone();
    }
}

// ---------------------------
// Crafting Manager
// ---------------------------
class CraftingManager {
    constructor() {
        this.recipes = [];
    }

    addRecipe(inputs, output) {
        this.recipes.push(new Recipe(inputs, output));
    }

    // Try to craft by recipe index
    craftByIndex(index, inventory) {
        if (!this.recipes[index]) return null;
        return this.recipes[index].craft(inventory);
    }

    // Try to craft by matching ingredients
    craftMatching(inventory) {
        for (let recipe of this.recipes) {
            if (recipe.canCraft(inventory)) {
                return recipe.craft(inventory);
            }
        }
        return null;
    }
}

// global crafting manager
const CRAFTING = new CraftingManager();
