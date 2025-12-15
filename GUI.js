
// ---------------------------
// Base GUI Class
// ---------------------------
class GUI {
    constructor(x = 0, y = 0, w = 0, h = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.visible = true;
    }

    show()  { this.visible = true; }
    hide()  { this.visible = false; }
    toggle(){ this.visible = !this.visible; }

    draw() {} // override in subclasses
}

class Inventory extends GUI {
    constructor(items, x, y, font, w, h) {
        super(x, y, w, h);

        this.items = items;   // array of ItemStack or null
        this.font = font;

        this.cols = 5;
        this.rows = ceil(items.length / this.cols);

        this.slotSize = 50;
        this.padding = 6;
    }

    drawSlot(x, y, stack) {
        // slot background
        fill(60, 60, 60, 200);
        stroke(255);
        rect(x, y, this.slotSize, this.slotSize, 4);

        if (!stack) return;

        // ---------------------------
        // Draw item name
        // ---------------------------
        this.font.drawText(
            stack.item.name,
            x + 5,
            y + this.slotSize / 2
        );

        // ---------------------------
        // Draw quantity (bottom-right)
        // ---------------------------
        if (stack.amount > 1) {
            push();
            fill(255);
            textSize(14);
            textAlign(RIGHT, BOTTOM);
            text(stack.amount, x + this.slotSize - 4, y + this.slotSize - 4);
            pop();
        }
    }

    draw() {
        if (!this.visible) return;

        push();
        translate(this.x, this.y);

        let index = 0;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {

                let sx = c * (this.slotSize + this.padding);
                let sy = r * (this.slotSize + this.padding);

                let stack = this.items[index] || null;
                this.drawSlot(sx, sy, stack);

                index++;
            }
        }

        pop();
    }
}
Inventory.prototype.countItem = function(id) {
    let total = 0;
    for (let stack of this.items) {
        if (stack && stack.item.id === id) {
            total += stack.amount;
        }
    }
    return total;
};

Inventory.prototype.removeItems = function(id, amount) {
    for (let stack of this.items) {
        if (!stack) continue;

        if (stack.item.id === id) {
            let take = min(stack.amount, amount);
            stack.amount -= take;
            amount -= take;

            if (stack.amount <= 0) {
                stack.amount = 0;
            }

            if (amount <= 0) return;
        }
    }
};

class Debug extends GUI {
    constructor(font, x, y) {
        super(x, y);
        this.font = font;
        this.lines = [];
    }

    log(text) {
        this.lines.push(text);
        if (this.lines.length > 12) this.lines.shift();
    }

    draw() {
        if (!this.visible) return;

        push();
        fill(0, 150);
        noStroke();
        rect(this.x, this.y, 250, this.lines.length * 20 + 10, 5);

        let offset = 20;
        for (let line of this.lines) {
            this.font.drawText(line, this.x + 10, this.y + offset);
            offset += 20;
        }
        pop();
    }
}

class Font extends GUI {
    constructor(fontpath) {
        super();
        this.font = loadFont(fontpath);
        this.size = 16;
        this.color = color(255);
    }

    setSize(s) { this.size = s; }
    setColor(c){ this.color = c; }

    drawText(text, x, y) {
        push();
        fill(this.color);
        textFont(this.font);
        textSize(this.size);
        text(text, x, y);
        pop();
    }
}

