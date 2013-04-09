(function($) {
    $.fn.selectText = function() {
        var rel = this.get(0);
        var rng = null;
        if ($.browser.msie) {
            rng = rel.createTextRange();
            rng.moveStart('character', 0);
            rng.select();
        }
        delete rng; rng = null;
        delete rel; rel = null;
        this.focus();
    }
}(jQuery));