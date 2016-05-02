(function () {
'use strict';

// Internal variables
var addType, types, color2Def;

types = {};
addType = function (type, colorFillFunc) {
    if (types.hasOwnProperty(type)){
        console.log('Warning: Type already set, overwriting');
    }
    types[type] = colorFillFunc;
};

addType("DOM", function (e) {
    e.style.backgroundColor = this._color;
    e.style.lineHeight = 0;
});

addType("canvas", function (e) {
    e.ctx.fillStyle = this._color;
    e.ctx.fillRect(e.pos._x, e.pos._y, e.pos._w, e.pos._h);
});

addType("webgl", function (e) {
    e.program.writeVector("aColor",
        this._red/255,
        this._green/255,
        this._blue/255,
        this._strength
    );
});

/**@
 * #Color2
 * @category Graphics
 * Fill a polygon-esque item with color
*/
Crafty.c("Color2", {
    addType: function (type, colorFillFunc) {
        addType(type, colorFillFunc);
        return this;
    },
    init: function () {
        this.requires("Color");
        this._drawColor = (function (origFunc) {
            return function () {
                console.log('Warning: Original _drawColor called!');
                origFunc.call(this, arguments);
            };
        })(this._drawColor);

        this.bind("Draw", this._drawColor2);
    },
    _drawColor2: function (e) {
        if (!this._color) { return; }
        if (types.hasOwnProperty(e.type)) {
            types[e.type].call(this, e);
        }
    }
});

})();
