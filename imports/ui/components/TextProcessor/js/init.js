export const fabric = window.fabric;

(function() {
    fabric.NewTextBox = fabric.util.createClass(fabric.Textbox, {
        type: 'NewTextBox',
        initialize: function (text, options) {
            console.log(options);
            this.text = text;
            this.padding = options.padding;
            this.callSuper("initialize", text, options);
        },
        toObject: function() {
            return fabric.util.object.extend(this.callSuper('toObject'), {
                text: this.get('text'),
                padding: this.get('padding'),
            });
        },
        _getNonTransformedDimensions() { // Object dimensions
            return new fabric.Point(this.width - this.padding, this.height).scalarAdd(this.padding);
        },
        _calculateCurrentDimensions() { // Controls dimensions
            return fabric.util.transformPoint(this._getTransformedDimensions(), this.getViewportTransform(), true);
        },
        _render: function(ctx) {
            if (!this.backgroundColor) {
                return;
            }
            const dim = this._getNonTransformedDimensions();
            ctx.save();
            ctx.fillStyle = this.backgroundColor;
            const r = {
                x: -dim.x / 2,
                y: -dim.y / 2,
                width: dim.x,
                height: dim.y,
            }
            ctx.beginPath();
            if(this.borderRadius){
                ctx.moveTo(r.x + this.borderRadius, r.y);
                ctx.arcTo(r.x + r.width, r.y, r.x +r.width, r.y + r.height, this.borderRadius);
                ctx.arcTo(r.x + r.width, r.y + r.height, r.x, r.y + r.height, this.borderRadius);
                ctx.arcTo(r.x, r.y + r.height, r.x, r.y, this.borderRadius);
                ctx.arcTo(r.x, r.y, r.x + r.width, r.y, this.borderRadius);
            }
            if(!this.borderRadius){
                if(this.borderTopRightRadius){
                    ctx.moveTo(r.x + this.borderTopRightRadius, r.y);
                    ctx.arcTo(r.x + r.width, r.y, r.x +r.width, r.y + r.height, this.borderTopRightRadius);
                }else{
                    ctx.moveTo(r.x + 0, r.y);
                    ctx.arcTo(r.x + r.width, r.y, r.x +r.width, r.y + r.height, 0);
                }
                if(this.borderBottomRightRadius){
                    ctx.arcTo(r.x + r.width, r.y + r.height, r.x, r.y + r.height, this.borderBottomRightRadius);
                }else{
                    ctx.arcTo(r.x + r.width, r.y + r.height, r.x, r.y + r.height, 0);
                }
                if(this.borderBottomLeftRadius){
                    ctx.arcTo(r.x, r.y + r.height, r.x, r.y, this.borderBottomLeftRadius);
                }else{
                    ctx.arcTo(r.x, r.y + r.height, r.x, r.y, 0);
                }
                if(this.borderTopLeftRadius){
                    ctx.arcTo(r.x, r.y, r.x + r.width, r.y, this.borderTopLeftRadius);
                }else{
                    ctx.arcTo(r.x, r.y, r.x + r.width, r.y, 0);
                }
            }
            ctx.closePath();
            this._renderFill(ctx);
            ctx.restore();
            this._clearCache();
            ctx.save();
            ctx.fillStyle = this.fill;
            this._setTextStyles(ctx);
            this._renderTextLinesBackground(ctx);
            this._renderTextDecoration(ctx, "underline");
            this._renderText(ctx);
            this._renderTextDecoration(ctx, "overline");
            this._renderTextDecoration(ctx, "linethrough");
            ctx.restore();
        },
    });
    fabric.NewTextBox.fromObject = function (object, callback) {
        fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
            delete object.objects;
            callback && callback(new fabric.NewTextBox(enlivenedObjects, object));
        });
    };
    fabric.NewTextBox.async = true;
})();