/**
 * This file is part of jquery.jsonbrowser.js
 *
 * (c) Philippe Gerber <philippe@bigwhoop.ch>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$.jsonbrowser = {
    collapsibleClass: 'collapsible',
    collapsedClass: 'collapsed',
    
    collapseAll: function(container) {
        var $container = $(container);
        $container.find('.' + this.collapsibleClass + ' > ul').addClass(this.collapsedClass);
    },
    
    expandAll: function(container) {
        var $container = $(container);
        $container.find('.' + this.collapsibleClass + ' > ul').removeClass(this.collapsedClass);
    },
    
    showAll: function(container) {
        var $container = $(container);
        $container.find('li').show();
    },

    hideAll: function(container) {
        var $container = $(container);
        $container.find('li').hide();
    },

    search: function(container, searchTerm) {
        $.jsonbrowser.showAll(container);
        
        if (typeof searchTerm != 'string' || searchTerm.length == 0) {
            return;
        }
        
        searchTerm = searchTerm.toLocaleLowerCase();

        var $container = $(container);
        
        var recursiveKeySearch = function($container, keys) {
            if (keys.length == 0) {
                return;
            }
            
            var key = keys.shift();
            $container.find('> ul > li').each(function() {
                var $this = $(this);
                if ($this.find('> .key').text().toLocaleLowerCase().indexOf(key) > -1) {
                    recursiveKeySearch($this, keys);
                } else {
                    $this.hide();
                }
            });
        };
        
        // For search terms like '.key.nextKey.anotherKey...' we
        // launch the recursive key search.
        if (searchTerm.indexOf('.') == 0) {
            var keys = searchTerm.split('.').filter(function(key, value) { return value != ''; });
            recursiveKeySearch($container, keys);
            return;
        }
        
        // Otherwise we search the values
        $.jsonbrowser.hideAll(container);
        var valueFilter = function() {
            return $(this).text().toLocaleLowerCase().indexOf(searchTerm) > -1;
        };
        $container.find('.value')
                  .filter(valueFilter)
                  .parents('li')
                  .show();
    }
};

$.fn.jsonbrowser = function(json, userOptions) {
    var defaultOptions = {
        'scheme'      : 'http',
        'parseURLs'   : true,
        'collapsible' : true,
        'collapsed'   : false
    };
    
    var options = $.extend(defaultOptions, userOptions);
    var error = '';

    if (typeof json == 'string') {
        try {
            json = JSON.parse(json);
        } catch (e) {
            error = 'Failed to parse JSON: ' + e;
        }
    } else if (typeof json != 'object') {
        error = 'Expected an object or string. Got neither.';
    }
    
    function generateHtml($container, json) {
        var $ul = $('<ul></ul>');
        
        for (var key in json) {
            var keyMarkup = '<span class="key">' + key + ':</span>',
                val = json[key],
                $li = $('<li></li>');
            
            if (typeof val == 'object') { // objects
                if (val === null) { // null
                    $li.append(keyMarkup + ' <span class="value empty-value">null</span>');
                } else if ($.isArray(val) && !val.length) { // empty array
                    $li.append(keyMarkup + ' <span class="value empty-value">[]</span>');
                } else if (Object.keys(val).length == 0) { // empty object
                    $li.append(keyMarkup + ' <span class="value empty-value">{}</span>');
                } else { // non-empty object
                    $li.append(keyMarkup + ' ' + ($.isArray(val) ? '[' : '{'));
                    generateHtml($li, val);
                    $li.append($.isArray(val) ? ']' : '}');
                    
                    if (options.collapsible) {
                        $li.addClass($.jsonbrowser.collapsibleClass);
                        $li.on('click', '> .key', function() {
                            $(this).parent().children('ul').toggleClass($.jsonbrowser.collapsedClass);
                        });
                        
                        if (options.collapsed) {
                            $li.children('ul').addClass($.jsonbrowser.collapsedClass);
                        }
                    }
                }
            } else { // scalars
                var escaped = $('<div>').text(val).html();
                var $val = $('<span class="value"></span>');
                
                if (escaped === '') { // empty string
                    $val.addClass('empty-value').text('""');
                } else if (escaped == 0) { // zero
                    $val.addClass('empty-value').text('0');
                } else {
                    if (options.parseURLs) { // URLs
                        if (0 === escaped.indexOf("http://") || 0 === escaped.indexOf("https://")) {
                            escaped = $('<a href="' + escaped + '" target="_blank">' + escaped + '</a>');
                        } else if (0 === escaped.indexOf("//")) {
                            escaped = $('<a href="' + options.scheme + ':' + escaped + '" target="_blank">' + escaped + '</a>');
                        }
                    }
                    if (typeof escaped == 'string' && !$.isNumeric(escaped)) { // strings
                        escaped = '"' + escaped + '"';
                    }
                    $val.html(escaped);
                }

                $li.append(keyMarkup + ' ');
                $li.append($val);
            }
            $li.append(',');
            
            $ul.append($li);
        }
        
        $container.append($ul);
    }

    return this.each(function() {
        var $container = $(this);
        $container.empty();
        
        if (error) {
            $container.html(error);
        } else {
            generateHtml($container, json);
        }
    });
};