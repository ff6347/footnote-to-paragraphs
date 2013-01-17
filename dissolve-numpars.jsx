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
dissolve_numpars();
function dissolve_numpars() {


if(app.documents.length < 1) {
        alert("you need at least one document");
        return;
    }
    // var parStyles = app.activeDocument.characterStyles;
    // var foundStyle = false;
    // for(var p = 0; p < parStyles.length; p++){
    //     if(parStyles[p].name == 'ScriptNumber'){
    //         foundStyle = true;
    //     }
    // }

    // if(foundStyle === false){
    //     alert('You need a character style called "ScriptNumber" or the script cant continue.\n not "scriptnumber" or "Script Number". It has to be"ScriptNumber"');
    //     return;
    // }
    if((app.selection.length < 1)||(app.selection.length > 1)){
        alert("Please select one textframe of your story");
        return;
    }

    var theSelectedObj = app.selection[0];
    if(theSelectedObj.constructor !== TextFrame){
        alert("Your selection is not a textframe");
    }else{
        // alert("This is a TF");
        var selTfParentStory = theSelectedObj.parentStory;
        if(selTfParentStory.constructor == Story){
            // alert("This is a stroy");
            var storyPars = selTfParentStory.paragraphs;
            for(var i = 1; i < storyPars.length;i++){

                var par = storyPars[i];
                par.convertBulletsAndNumberingToText ();
                // var bufNum = String(i);
                // par.insertionPoints[0].contents = bufNum + ". ";
                // for(var j = 0; j < (bufNum.length+1);j++){
                //     par.characters[j].appliedCharacterStyle = 'ScriptNumber';
                // }
                // par.
            }
        }

    }//close no TextFrame

}

