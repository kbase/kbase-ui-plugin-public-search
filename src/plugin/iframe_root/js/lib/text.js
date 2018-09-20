define([
], function () {
    'use strict';

    const textDB = {
        tooltips: {}
    };

    function addTooltip(name, text) {
        if (text instanceof Array) {
            text = text.join('');
        }
        textDB.tooltips[name] = text;
    }

    function getTooltip(name, defaultValue) {
        const tooltipText = textDB.tooltips[name];
        if (!tooltipText) {
            return defaultValue;
        }
        return tooltipText;
    }

    // SEARCH BAR

    addTooltip('SEARCH_INPUT', [
        'Enter one or more search terms in this input. Press the "Enter" or "Return" key, or click the Search Button ',
        'to the right to initiate the search.\n\n',
        'All search terms are "and"ed together, and further restrict the search.\n',
        'All search terms are matched exactly against whole words.'
    ]);

    addTooltip('SEARCH_BUTTON', [
        'Click me to initiate a search with the current input and filter settings.\n\n',
        'You may also click the "Enter/Return" key when the cursor is in the search input.\n\n',
        'This button is most useful for refreshing an existing search if you are monitoring for specific data objects ',
        'to be indexed.'
    ]);

    addTooltip('SEARCH_HISTORY_BUTTON', [
        'Show a list of the most recent 10 searches you have conducted\n\n',
        'Note: The search history is saved to your user profile if you are logged in, and to a cookie otherwise.'
    ]);

    addTooltip('SEARCH_CLEAR_BUTTON', [
        'Clear the search input and reset the search results.'
    ]);

    addTooltip('COPY_OBJECTS_BUTTON', [
        'When you have selected one or more search result items, this button will become enabled.\n\n',
        'It will open a tool with which you may copy the selected data objects into an existing or new ',
        'Narrative of your choosing.\n\n',
        'Note: This button will not be enabled if you are not logged in.'
    ]);

    addTooltip('FEEDBACK_BUTTON', [
        'Comment, compliment, or complaint about search?\n\n',
        'Click me to provide feedback for this search tool in a new browser tab or window.'
    ]);

    addTooltip('HELP_BUTTON', [
        'I should\'t need to tell you what this doees!'
    ]);

    // FILTER AREA

    addTooltip('FILTERS_HEADER', [
        'Filters allow you to include or remove search results according to criteria enabled ',
        'or disabled within the given filter group.'
    ]);


    addTooltip('DATA_PRIVACY_HEADER', [
        'Select whether to include Private or Public data.\n\n',
        'Private data resides in a Narrative owned by or shared with you.\n\n',
        'Public data resides in any Narrative shared publicly or in a reference data workspace.\n\n',
        'Note: If you are not logged into KBase, Public Data is always selected.'
    ]);

    addTooltip('WORKSPACE_TYPE_HEADER', [
        'Data objects reside in "workspaces". A workspace is like a folder which can ',
        'contain data objects, has a kbase user as the owner, and provides sharing permissions.\n\n',
        'There are two kinds of workspace:\n',
        'Narratives - contain data objects and a special Narrative object which contains ',
        'cells (app, markdown, code, and data visualization)\n',
        'Reference Data - hidden workspaces which contain public reference data; e.g. RefSeq, MycoCosm'
    ]);

    addTooltip('DATA_TYPES_HEADER', [
        'KBase is a strongly typed system: Every data object is assigned to and conforms with a ',
        'specific type (and type version as well.)\n\n',
        'The search service indexes a limited number of KBase data types, which are shown in this ',
        'filter control box.\n\n',
        'By default all types are selected, and will show the number of items available in the current ',
        'search for the given type.\n',
        'You may exclude objects of a given type from search by unchecking the box next to it. Hover over ',
        'a checkbox to see advanced selection controls.'
    ]);

    addTooltip('DATA_TYPES_SEARCH_RESULTS_HEADER', [
        'Shows the number of items in the current search:\n',
        'Included - the number of items included in the current search results with current filtering applied\n',
        'Excluded - the number if items found in the current search but filtered out of the search results'
    ]);

    addTooltip('DATA_TYPES_CHECKBOX', [
        'Check to include objects of this type; uncheck to exclude them\n\n',
        'Advanced usage:\n',
        'Press command (mac) or fn (window) key with the click to "solo" this item; ',
        ' select only it and unselect all others\n',
        'Press alt (mac, windows) key with the click to toggle this item, and set all ',
        'others to the reverse of it.'
    ]);

    addTooltip('DATA_TYPES_DATA_TYPE_COLUMN', [
        'The KBase data type.'
    ]);

    addTooltip('DATA_TYPES_COUNT_COLUMN', [
        'The number of data objects found for this type for the current search.\n',
        'With no current search, displays a dash: -.'
    ]);

    return {getTooltip};
});