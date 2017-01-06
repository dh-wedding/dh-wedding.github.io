var fixedCls = '.navbar-fixed-top,.navbar-fixed-bottom';
var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
$.fn.modal.Constructor.prototype.setScrollbar = function () {
    oldSSB.apply(this);
    if (this.bodyIsOverflowing && this.scrollbarWidth) {
        $('.navbar').addClass('notransition');
        $(fixedCls).css('padding-right', this.scrollbarWidth);
    }
}

var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
$.fn.modal.Constructor.prototype.resetScrollbar = function () {
    oldRSB.apply(this);
    $(fixedCls).css('padding-right', '');
}