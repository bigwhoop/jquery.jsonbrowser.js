# jquery.jsonbrowser.js

See demo.html for full instructions.

Create a div. Use the 'jsonbrowser' class for the default styling.

    <div id="browser jsonbrowser"></div>

Call the jQuery function.

    $('#browser').jsonbrowser('{"instruction": "pass a json string here"}');

Options.

    $('#browser').jsonbrowser(..., {
        'parseURLs'   : true,    // Whether to parse and link URLs.
        'scheme'      : 'http',  // URLs beginning with // are automatically completed using this value.
        'collapsible' : true,    // Whether the user can collapse/expand nodes. 
        'collapsed'   : false    // Whether the default behavior is collapsed or not. 'collapsible' must be true.
    });

Helpers

    $.jsonbrowser.collapseAll('#browser');
    $.jsonbrowser.expandAll('#browser');
