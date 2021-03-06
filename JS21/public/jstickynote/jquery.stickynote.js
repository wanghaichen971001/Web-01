(function ($) {

    $.fn.stickynote = function (options) {
        var opts = $.extend({}, $.fn.stickynote.defaults, options);
        return this.each(function () {
            $this = $(this);
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
            switch (o.event) {
                case 'dblclick':
                    $this.dblclick(function (e) { $.fn.stickynote.createNote(o); })
                    break;
                case 'click':
                    $this.click(function (e) { $.fn.stickynote.createNote(o); })
                    break;
            }
        });
    };
    $.fn.stickynote.defaults = {
        size: 'small',
        event: 'click',
        color: '#000000',
        top: 100,
        left: 200
    };

    $.fn.stickynote.createNote = function (o) {
        var _note_content = $(document.createElement('textarea'));
        var _div_note = $(document.createElement('div'))
							.addClass('jStickyNote')
							.css('cursor', 'move');
        if (!o.text) {
            _div_note.append(_note_content);
            var _div_create = $(document.createElement('div'))
						.addClass('jSticky-create')
						.attr('title', 'Create Sticky Note');

            _div_create.click(function (e) {
                var _p_note_text = $(document.createElement('p'))
									.css('color', o.color)
									.html(
											$(this)
											.parent()
											.find('textarea')
											.val()
											);
                $(this)
				.parent()
				.find('textarea')
				.before(_p_note_text)
				.remove();

                $(this).remove();
            })
        }
        else
            _div_note.append($('<p style="color:' + o.color + '"/>').text(o.text).attr('title',o.text));

        var _div_delete = $(document.createElement('div'))
							.addClass('jSticky-delete');

        _div_delete.click(function (e) {
            $(this).parent().remove();
        })

        var _div_wrap = $(document.createElement('div'))
							.css({ 'position': 'absolute', 'top': o.top, 'left': o.left, 'text-decoration': '2em' })
							.append(_div_note)
							.append(_div_delete)
							.append(_div_create);
        switch (o.size) {
            case 'large':
                _div_wrap.addClass('jSticky-large');
                break;
            case 'small':
                _div_wrap.addClass('jSticky-medium');
                break;
        }
        if (o.containment) {
            _div_wrap.draggable({
                containment: '#' + o.containment, scroll: false, start: function (event, ui) {
                    if (o.ontop)
                        $(this).parent().append($(this));
                }
            });
        }
        else {
            _div_wrap.draggable({
                scroll: false, start: function (event, ui) {
                    if (o.ontop)
                        $(this).parent().append($(this));
                }
            });
        }
        $('#content').append(_div_wrap);
    };
})(jQuery);