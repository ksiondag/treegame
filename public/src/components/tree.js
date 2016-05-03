(function () {

'use strict';

Crafty.c("TreeLeaf", {
    _left: null,
    _right: null,
    _value: null,
    _parentNode: null,
    init: function () {
        this.bind("Remove", function () {
            if (this.parent()) {
                if (this.parent().left() === this) {
                    this.parent().left(null);
                } else {
                    this.parent().right(null);
                }
            }
        });
    },
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
        if (left !== null) {
            this._left.parent(this);
        }
        return this;
    },
    right: function (right) {
        if (arguments.length === 0) {
            return this._right;
        }
        this._right = right;
        if (right !== null) {
            this._right.parent(this);
        }
        return this;
    },
    insert: function (leaf, comparator) {
        if (comparator(this, leaf) > 0) {
            if (this.left()) {
                this.left().insert(leaf, comparator);
            } else {
                this.left(leaf);
            }
        } else {
            if (this.right()) {
                this.right().insert(leaf, comparator);
            } else {
                this.right(leaf);
            }
        }
    },
    inorder: function (callback) {
        if (this.left()) {
            this.left().inorder(callback);
        }
        callback(this);
        if (this.right()) {
            this.right().inorder(callback);
        }
    },
    root: function () {
        if (this.parent()) {
            return this.parent().root();
        }
        return this;
    }
});

})();
