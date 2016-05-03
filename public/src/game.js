Crafty.scene('game', function () {

'use strict';

Crafty.background('#FFFFFF');

var shuffle = function (a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

var tree = Crafty.e('TreeRender')
    .attr({
        x: 100,
        y: 100,
        w: Crafty.viewport.width - 100,
        h: Crafty.viewport.height - 100
    })
;

var word = alphabeticalWords[Math.floor(Math.random()*alphabeticalWords.length)];
var letters = shuffle(word.split(''));

var currentLetter = letters.shift();

var render = function () {
    Crafty('Line').destroy();
    if (currentLetter) {
        renderLetter.text('Current letter: ' + currentLetter);
    } else {
        if (spelling.goal() === spelling.result(root) ){
            renderLetter.text('Success!');
        } else {
            renderLetter.text('Incorrect!');
        }
        startOver.text('Play again?');
    }
    spelling.spelling(root);

    tree.grow(root);
};

var attachLetter = function () {
    this.unbind('MouseDown');
    this.removeComponent('Empty');
    this.removeComponent('Mouse');
    this.text(currentLetter);
    currentLetter = letters.shift();

    if (!currentLetter) {
        Crafty('Empty').destroy();
        render();
        return;
    }

    this.left(
        Crafty.e('TreeLeaf,LeafRender,Text,Mouse,Empty')
            .color('green')
            .textFont({size: '50px'})
            .bind('MouseDown', attachLetter)
    );

    this.right(
        Crafty.e('TreeLeaf,LeafRender,Text,Mouse,Empty')
            .color('green')
            .textFont({size: '50px'})
            .bind('MouseDown', attachLetter)
    );

    render();
};

var root = Crafty.e('TreeLeaf,LeafRender,Text,Mouse')
    .color('green')
    .textFont({size: '50px'})
    .bind('MouseDown', attachLetter)
;

var renderLetter = Crafty.e('2D,DOM,Text')
    .attr({
        x: 0,
        y: 0,
        w: 500,
        h: 100
    })
    .text('Current Letter: ' + currentLetter)
    .textFont({size: '50px'})
;

var spelling = Crafty.e("SpellTree")
    .goal(word)
    .spelling(root)
    .attr({
        x: 0,
        y: 3*Crafty.viewport.height/4,
        w: 500,
        h: 100
    })
    .textFont({size: '50px'})
;

var spellGoal = Crafty.e('2D,DOM,Text')
    .attr({
        x: 0,
        y: 3*Crafty.viewport.height/4 + Crafty.viewport.height/8,
        w: 500,
        h: 100
    })
    .text('Spell goal: ' + spelling.goal())
    .textFont({size: '50px'})
;

var startOver = Crafty.e('2D,DOM,Text,Mouse')
    .attr({
        x: 3*Crafty.viewport.width/4 - Crafty.viewport.width/8,
        y: 3*Crafty.viewport.height/4 + Crafty.viewport.height/16,
        w: 500,
        h: 100
    })
    .text('Reset?')
    .textFont({size: '50px'})
    .bind('MouseDown', function () {
        Crafty.scene('game');
    })
;

tree.grow(root);

});

Crafty.scene('game');

