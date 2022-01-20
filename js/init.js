// SETUP
var gm = new Game();
$(document).ready(function() {
    gm.setup_display();
    tmr = setInterval("gm.tick()", tick_ms);
    sec_tmr = setInterval("gm.sec_tick()", 1000);
    save_tmr = setInterval("gm.do_save()", 30000);
    event_tmr = setInterval("gm.check_events()", 120000);
    ver_tmr = setInterval("gm.check_version()", 620000);
    gm.do_load();
    message('Welcome to '+gm.get_title()+', bitch.');


    // Events
    var bind_type = 'click';
    if ('ontouchstart' in window) {
        bind_type = 'touchstart click';
    } else if(window.navigator.msPointerEnabled) {
        bind_type = 'touchstart click';
    }

    $('#make_btn').bind(bind_type, function(e) {
        gm.do_make_click();
        {% if not isapp %}
        var elc = $('.make_up:first').clone()
        elc.html('+'+pretty_bigint(gm.get_click_make_amount()));
        $('#make_div').append(elc);
        elc.show();
        elc.offset({left:e.pageX-30, top:e.pageY-50});
        var end_y = e.clientY-150;
        elc.css('opacity',100);
        if(last_float == 1) {
            var this_float = e.pageX;
            last_float = 0;
        } else {
            var this_float = e.pageX - 60;
            last_float = 1;
        }
        elc.animate({'top':end_y.toString()+'px', 'opacity':0, 'left':this_float.toString()+'px'}, 750, function() {
            $(this).remove();
        });
        {% endif %}
    });

    $('#sell_btn').bind(bind_type, function(e) {
        var sale = gm.do_sell_click();
        if(sale == 0) {
            return;
        }
        {% if not isapp %}
        var elc = $('.sell_up:first').clone()
        elc.html('$'+pretty_bigint(sale*gm.get_widget_roi()));
        $('#sell_div').append(elc);
        elc.show();
        elc.offset({left:e.pageX-30, top:e.pageY-50});
        var end_y = e.clientY-150;
        elc.css('opacity',100);
        if(last_float == 1) {
            var this_float = e.pageX;
            last_float = 0;
        } else {
            var this_float = e.pageX - 60;
            last_float = 1;
        }
        elc.animate({'top':end_y.toString()+'px', 'opacity':0, 'left':this_float.toString()+'px'}, 750, function() {
            $(this).remove();
        });
        {% endif %}
    });

    // End actions
    switch_tab('clickers');
    $('button').attr('disabled', false);
});
