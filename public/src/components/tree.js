(function () {

'use strict';

Crafty.c("TreeLeaf", {
    _left: null,
    _right: null,
    _parentNode: null,
    depth: function (n) {
        if (arguments.length === 0) {
            n = 0;
        }
        n += 1;

        if (this.left() && this.right()) {
            return Math.max(
                this.left().depth(n),
                this.right().depth(n)
            )
        }
        
        if (this.left()) {
            return this.left().depth(n);
        }

        if (this.right()) {
            return this.right().depth(n);
        }

        return n;
    },
    parent: function (parent) {
        if (arguments.length === 0) {
            return this._parentNode;
        }
        this._parentNode = parent;
        return this;
    },
    left: function (left) {
        if (arguments.length === 0) {
            return this._left;
        }
        this._left = left;
        this._left.parent(this);
        return this;
    },
    right: function (right) {
        if (arguments.length === 0) {
            return this._right;
        }
        this._right = right;
        this._right.parent(this);
        return this;
    }
});

})();
