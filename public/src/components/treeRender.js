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

    this.attach(
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
    );

    line.rotation = Math.atan2(
        leaf2.y - leaf1.y,
        leaf2.x - leaf1.x
    ) * (180 / Math.PI);
};

growHelper = function (leaf, center, column, levels) {
    var x, y, width, height;

    if (!leaf) {
        return;
    }

    width = this.w /(3 * Math.pow(2, levels - 1)),
    height = this.h /(3 * levels)

    x = ((2*column + 1 ) * center) - (width / 2);
    if (leaf.parent()) {
        y = leaf.parent().y + leaf.parent().h*2;
    } else {
        y = this.h / (3 * levels);
    }

    this.attach(
        leaf.attr({
            x: x,
            y: y,
            w: width,
            h: height
        })
    );

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

        this.attr({
            x: 0,
            y: 0,
            w: Crafty.viewport.width,
            h: Crafty.viewport.height
        });

        growHelper.call(this, root, Crafty.viewport.width/2, 0, levels);
    }
});

})();
