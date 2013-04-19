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

You can use the `search()` function to filter the data by either keys or values.

    $.jsonbrowser.search('#browser', 'search term');

For the following examples we'll use this data structure:

    [
        {
            'title': 'Harold and Maude',
            'runtime': 91,
            'genres': ['Comedy', 'Drama'],
            'release_date': '1971-12-20',
            'director': 'Hal Ashby',
            'writer': 'Colin Higgins',
            'roles': {
                'Maude': 'Ruth Gordon',
                'Harold': 'Bud Cort',
                'Mrs. Chasen': 'Vivian Pickles',
                'Glaucus': 'Cyril Cusack'
            },
            'imdb_url': 'http://www.imdb.com/title/tt0067185/'
        },
        {
            'title': 'Garden State',
            'runtime': 102,
            'genres': ['Comedy', 'Drama', 'Romance'],
            'release_date': '2004-09-22',
            'director': 'Zach Braff',
            'writer': 'Zach Braff',
            'roles': {
                'Andrew Largeman': 'Zach Braff',
                'Gideon Largeman': 'Ian Holm',
                'Sam': 'Natalie Portman',
                'Mark': 'Peter Sarsgaard',
            },
            'imdb_url': 'http://www.imdb.com/title/tt0333766/'
        }
    ]

### Value search

If the search term does not start with a dot, only the values that contain the search term will be shown.
The search term `an` would show the following data structure:

    [
        0: {
            title: "Harold and Maude",
            roles: {
                Mrs. Chasen: "Vivian Pickles",
            },
        },
        1: {
            genres: [
                2: "Romance",
            ],
            roles: {
                Gideon Largeman: "Ian Holm",
                Sam: "Natalie Portman",
            },
        }
    ]

### Key search

If the search term starts with a dot, the search will filter the data by matching keys. You can filter nested
structures by concatenating multiple keys with a dot, where each dot separates the depth level.

The search term `.0.ro.ma` would result in ...

    [
        0: {
            roles: {
                Maude: "Ruth Gordon",
            },
        }
    ]

By using the special `*` character a whole level can be matched. For example `.*.ti` would resolve to ...

    [
        0: {
            title: "Harold and Maude",
            runtime: 91,
        },
        1: {
            title: "Garden State",
            runtime: 102,
        }
    ]