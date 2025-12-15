// ---------------------------
// Item Class + Helpers
// ---------------------------

class Item {
    constructor(id, name, icon = null, data = {}) {
        this.id = id;       // unique string: "wood", "stone", "iron"
        this.name = name;   // display name
        this.icon = icon;   // optional image
        this.data = data;   // custom metadata (durability, stats, etc.)
    }

    clone() {
        return new Item(
            this.id,
            this.name,
            this.icon,
            structuredClone(this.data)
        );
    }
}

// ---------------------------
// ItemStack (item + quantity)
// ---------------------------
class ItemStack {
    constructor(item, amount = 1) {
        this.item = item;       // Item object
        this.amount = amount;   // integer
    }

    add(n) { this.amount += n; }
    remove(n) { this.amount = max(0, this.amount - n); }

    isEmpty() { return this.amount <= 0; }

    clone() {
        return new ItemStack(this.item.clone(), this.amount);
    }
}

// ---------------------------
// Item Registry (global)
// ---------------------------
class ItemRegistry {
    constructor() {
        this.items = {};
    }

    register(id, name, icon = null, data = {}) {
        this.items[id] = new Item(id, name, icon, data);
    }

    get(id) {
        if (!this.items[id]) {
            console.warn("Item not found:", id);
            return null;
        }
        return this.items[id].clone();
    }
}

// global registry instance
const ITEMS = new ItemRegistry();

// ---------------------------
// Helper: register default items
// ---------------------------
function registerDefaultItems() {
    ITEMS.register("wood", "Wood Log");
    ITEMS.register("stone", "Stone Chunk");
    ITEMS.register("iron", "Iron Ore");
    ITEMS.register("apple", "Apple", null, { heal: 10 });
    ITEMS.register("torch", "Torch", null, { light: 1 });
}

// ---------------------------
// Helper: create stack easily
// ---------------------------
function stack(id, amount = 1) {
    let item = ITEMS.get(id);
    if (!item) return null;
    return new ItemStack(item, amount);
}
