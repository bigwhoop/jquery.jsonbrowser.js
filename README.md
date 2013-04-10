# jquery.jsonbrowser.js

## Instructions

See demo.html for full instructions.

Create a div. Use the 'jsonbrowser' class for the default styling.

    <div id="browser jsonbrowser"></div>

Call the jQuery function.

    $('#browser').jsonbrowser('{"instruction": "pass a json string here"}');

## Options

    $('#browser').jsonbrowser(..., {
        'parseURLs'   : true,    // Whether to parse and link URLs.
        'scheme'      : 'http',  // URLs beginning with // are automatically completed using this value.
        'collapsible' : true,    // Whether the user can collapse/expand nodes. 
        'collapsed'   : false    // Whether the default behavior is collapsed or not. 'collapsible' must be true.
    });

## Collapsing / Expanding

    $.jsonbrowser.collapseAll('#browser');
    $.jsonbrowser.expandAll('#browser');

## Searching 

    $.jsonbrowser.search('#browser', 'search term');

If the search term does not start with a dot, only the values that contain the search term will be shown.

    {
        a: {
            b: [
                "foo",
                "bar"
            ],
            c: "foobar"
        },
        d: 10,
        e: 5
    }

The search term `foo` would show the following data structure:

    {
        a: {
            b: [
                "foo"
            ],
            c: "foobar"
        }
    }

If the search term starts with a dot, the search will filter the data by matching keys. You can filter nested
structures by concatenating multiple keys with a dot.

The search term `.a.b.1` would show the following data structure in the previous example:

    {
        a: {
            b: [
                "bar"
            ]
        }
    }