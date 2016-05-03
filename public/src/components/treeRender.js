(function () {

'use strict';

var growHelper, connectLeaves;

connectLeaves = function (leaf1, leaf2) {
    var line;

    if (!leaf1 || !leaf2) {
        return;
    }

    line = Crafty.e("2D,DOM,Color2,Line")
        .color('brown')

    this.attach(line);

    line
        .attr({
            x: leaf1.x + leaf1.w/2,
            y: leaf1.y + leaf1.h/2,
            w: Math.sqrt(
                (leaf1.x - leaf2.x) * (leaf1.x - leaf2.x)
                +
                (leaf1.y - leaf2.y) * (leaf1.y - leaf2.y)
            ),
            h: 5,
            z: -1
        })
        .rotation = Math.atan2(
            leaf2.y - leaf1.y,
            leaf2.x - leaf1.x
        ) * (180 / Math.PI)
    ;
};

growHelper = function (leaf, center, column, levels) {
    var x, y, width, height, magicNumber;

    if (!leaf) {
        return;
    }

    magicNumber = Math.max(levels, 3);

    width = this.w /(Math.pow(2, magicNumber - 1));
    height = this.h /(2 * magicNumber);

    x = ((2*column + 1 ) * center) - (width / 2);
    if (leaf.parent()) {
        y = leaf.parent().y + 1.5*height;
    } else {
        y = this.h / (3 * magicNumber) + 20;
    }

    this.attach(leaf);

    leaf.attr({
        x: x,
        y: y,
        w: width,
        h: height
    });

    connectLeaves.call(this, leaf.parent(), leaf);
    growHelper.call(this, leaf.left(), center/2, column * 2, levels);
    growHelper.call(this, leaf.right(), center/2, column * 2 + 1, levels);
};

Crafty.c("LeafRender", {
    init: function () {
        this.requires("2D,DOM,Color2");
    }
});

Crafty.c("TreeRender", {
    init: function () {
        this.requires("2D");
    },
    grow: function (root) {
        var levels = root.depth();

        growHelper.call(this, root, Crafty.viewport.width/2, 0, levels);
    }
});

Crafty.c("SpellTree", {
    _goal: null,
    init: function () {
        this.requires("2D,DOM,Text");
    },
    goal: function (goal) {
        if (arguments.length === 0) {
            return this._goal;
        }
        this._goal = goal;
        return this;
    },
    result: function (root) {
        var spelling = '';
        root.inorder(function (leaf) {
            if (leaf.text()) {
                spelling += leaf.text();
            }
        });
        return spelling;
    },
    spelling: function (root) {
        this.text('Spelling: ' + this.result(root));
        return this;
    }
});

})();
