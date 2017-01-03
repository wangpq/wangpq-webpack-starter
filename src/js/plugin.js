//some shitty jquery plugin...
(function ( $ ) {
    const green = "#0f0";
    $.fn.greenify = function() {
        this.css({ 
            "color": green ,
            "font-weight":"bold"
        });
        return this;
    };
}( jQuery ));
