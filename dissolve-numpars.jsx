// Copyright (c)  2013
// Fabian "fabiantheblind" Morón Zirfas
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to
// whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// see also http://www.opensource.org/licenses/mit-license.php
//
var greps = [{
    "findWhat": "\n",
    "changeTo": " "
}, {
    "findWhat": "\t",
    "changeTo": " "
}, {
    "findWhat": "\r",
    "changeTo": "~/"
} //     Find all double spaces and replace with single spaces.
];


dissolve_numpars();

function dissolve_numpars() {


    if(app.documents.length < 1) {
        alert("you need at least one document");
        return;
    }
    if((app.selection.length < 1) || (app.selection.length > 1)) {
        alert("Please select one textframe of your story");
        return;
    }

    var resConfirm = confirm("This will delete all crossreferences. Are you shure?", false);
    if(resConfirm === false) {
        return;
    }
app.activeDocument.paragraphDestinations.everyItem().remove();

    var theSelectedObj = app.selection[0];
    if(theSelectedObj.constructor !== TextFrame) {
        alert("Your selection is not a textframe");
    } else {
        // alert("This is a TF");
        var selTfParentStory = theSelectedObj.parentStory;
        if(selTfParentStory.constructor == Story) {
            // alert("This is a stroy");
            var storyPars = selTfParentStory.paragraphs;

            for(var i = storyPars.length - 1; i >= 1; i--) {
                var par = storyPars[i];
                par.convertBulletsAndNumberingToText();
            } // end par loop

            for(var k = 0; k < greps.length; k++) {
                var grp = greps[k];
                for(var j = storyPars.length - 1; j >= 1; j--) {
                    var par_to_grep = storyPars[j];
                    grep_it(par_to_grep, grp.findWhat, grp.changeTo);
                    grep_it(par_to_grep, grp.findWhat, grp.changeTo);
                    grep_it(par_to_grep, grp.findWhat, grp.changeTo);
                } // end par loop
            }
        }

    } //close no TextFrame
}

function grep_it(obj, findWhat, changeTo) {
    // empts the change to field!!!thats
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    // ------------ Now set all options for find ------------
    app.findChangeGrepOptions.includeFootnotes = false;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = true;
    app.findChangeGrepOptions.includeMasterPages = false;
    app.findGrepPreferences.findWhat = findWhat;
    // this is like entering text in the change to
    app.changeGrepPreferences.changeTo = changeTo;
    obj.changeGrep();
    app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!
}