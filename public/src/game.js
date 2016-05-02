(function () {

'use strict';

var root = Crafty.e('TreeLeaf,LeafRender')
    .color('green')
;

var left = Crafty.e('TreeLeaf,LeafRender')
    .color('green')
;

var right = Crafty.e('TreeLeaf,LeafRender')
    .color('green')
;

root.left(left);
root.right(right);

var tree = Crafty.e('TreeRender')
    .grow(root)
;

})();
