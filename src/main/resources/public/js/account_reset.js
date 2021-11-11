
function loadProperties2(lang){
       $('#reset').html($.i18n.prop('reset'));
       $('#test').html($.i18n.prop('generate_test_data'));
}

function reset(){
    $.ajax({ 'async': true,
                    'url': '/account/reset',
                    'type': 'get',
                    'data': {},
                    'datatype': 'html',
                    'timeout': 30000,
                    'error': function (msg) {
                        //alert(JSON.stringify(msg));
                        $('.canvasLoader').hide();
     				    alert($.i18n.prop('system_error'));
                        return;
                    },
                    'success': function (msg) {
                        $('.canvasLoader').hide();
                        alert($.i18n.prop(msg))
                        return;
                    }
     });
}

function test(){
    $.ajax({ 'async': true,
                    'url': '/account/test',
                    'type': 'get',
                    'data': {},
                    'datatype': 'html',
                    'timeout': 30000,
                    'error': function (msg) {
                        //alert(JSON.stringify(msg));
                        $('.canvasLoader').hide();
     				    alert($.i18n.prop('system_error'));
                        return;
                    },
                    'success': function (msg) {
                        $('.canvasLoader').hide();
                        alert($.i18n.prop(msg))
                        return;
                    }
     });
}

function InitLoadingSpinner(){
    var $loading = $('.canvasLoader').hide();
            $(document)
              .ajaxStart(function () {
                $loading.show();
              })
              .ajaxStop(function () {
                $loading.hide();
    });

    jQuery(function ($) {
                "use strict";

                /**
                 * If canvas loader is bound to an element, then it will be displayed as an overlay and pending in the
                 * element middle.
                 */
                var element = $('<div></div>').css({
                }).appendTo('body');

                /**
                 * If canvas loader is bound to the body element, then it will be displayed as an overlay which covers
                 * the hole screen and stays fixed while body element is scrolling.
                 */
    //            element = $('body');

                /**
                 * Initial display canvas loader
                 */
                element.canvasLoader({
                    color: '#ff0000'
                });

                /**
                 * Remove canvas loader on the origin instance
                 */
                element.canvasLoader(false);

                /**
                 * Reactivate canvas loader on the origin instance
                 */
                element.canvasLoader(true);

                /**
                 * Remove canvas loader by event if the origin instance is not available
                 */
                $(element).trigger('stop.canvasLoader');

                /**
                 * Manipulate options of current canvas loader instance
                 */
                element.canvasLoader.options.color='#008000';

                /**
                 * Reactivate canvas loader by event if the origin instance is not available
                 */
                $(element).trigger('start.canvasLoader');

                /**
                 * Manipulate default options
                 */
                $.fn.canvasLoader.options.color = '#0000ff';

                /**
                 * Get current version.
                 * @type {string}
                 */
                var version = $.fn.canvasLoader.version;

            });
}

$(function(){
    InitLoadingSpinner();
});