// // >>> Main Variables
var wleft; // preview window current left position
var wtop; // preview window current top position

// >>> Main functions

var loadData = function(frame, html) {
    // function that creates html document to be uploaded on iframe
    // contentDocument gets what's inside the iframe.

    var content ;//= $("#" + frame).prop("contentDocument");

        content = $("#" + html).val();

        $("#" + frame).contents().find("body").html($.parseHTML(content));

    // if (typeof contentDocument !== 'undefined') {
    //     contentDocument.write('<style>');
    //     contentDocument.write($("#" + css).val());
    //     contentDocument.write('</style></head>');
    //     contentDocument.write($("#" + html).val());
    //     contentDocument.write('</html>');
    //     contentDocument.close();
    // }
}

var old = '';


var changeTextareaSize = function(tab_name) {
    // function that increases or decreases the textarea according with content size
    // Input:
    // tab_name -> the name of the tab being edited. Possible values 'html'

    var text_buffer = getTextareaBufferData(tab_name + '-window');
    var textarea_rows = $('#' + tab_name + '-window').prop('rows');
    // console.log('textarea rows' + textarea_rows);
    // console.log('text buffer' + text_buffer);

    //checks if the number of code lines is greater than the size of textarea,
    // if so, increases that textarea and the line number div
    if (text_buffer['size'] > textarea_rows) {
        $('#' + tab_name + '-window').prop('rows', function(index, value) {
            return value + 1;
        });
        $('div.code-lines.' + tab_name + '-code').height(function() {
            return $('#' + tab_name + '-window').height() + 3;
        });
        $('#tabs-' + tab_name).scrollTop(function(index, value) {
            return value + 15;
        });
    }

    //checks if the number of code lines is greater than the default size of textarea
    //but smaller than the actual textarea size, if so, decreases that textarea and the line number div
    if (text_buffer['size'] > 38 && text_buffer['size'] < textarea_rows) {
        $('#' + tab_name + '-window').prop('rows', function(index, value) {
            return value - 1;
        });
        $('div.code-lines.' + tab_name + '-code').height(function() {
            return $('#' + tab_name + '-window').height() + 3;
        });
        $('#tabs-' + tab_name).scrollTop(function(index, value) {
            return value + 15;
        });
    }
    if (text_buffer['size'] <= 38) // sets scroll bar to top
        $('#tabs-' + tab_name).scrollTop(0);
}

var getTextareaBufferData = function(id_name) {
    var buffer = {};
    var text_str = '';
    var text_lines = [];
    var size = 0;

    text_str = $('#' + id_name).val(); // takes the textarea content given id
    text_lines = text_str.split('\n'); // create list of text lines
    size = text_lines.length;

    // update buffer
    buffer['size'] = size;
    buffer['content'] = text_lines;

    return buffer;
}

//MIGHT NEED THIS FOR LINE UPDATE
// var checkForEmptyLine = function(text_lines, line) {
//     // function that checks for an empty text line
//     // Input:
//     // text_lines -> list of text lines content
//     // line -> line chosen to check if it's empty
//     // Output:
//     // ...(Boolean) -> returns a true for empty line and false otherwise


//     var patt = /[^\s]/; // pattern for non_empty line
//     return !patt.test(text_lines[line - 1]);
// }

var updateCodeLineNumber = function(tab_name) {
    // function that updates the code line number values
    // Input:
    // tab_name -> the name of the tab being edited. Possible values 'html', 'css' or 'js'

    var text_buffer = getTextareaBufferData(tab_name + '-window');
    var nl_number = text_buffer['size'];

    $('div.code-lines.' + tab_name + '-code').empty(); // empty div.code-lines
    for (i = 1; i <= nl_number; i++)
        $('<span>' + i + '</span>').appendTo('div.code-lines.' + tab_name + '-code');
}

var codeLineNumberManagement = function() {
    // function that assigns the proper events and sub-functions to deal with code line number management

    $("#html-window").keydown(function() {
        updateCodeLineNumber('html');
        changeTextareaSize('html');
    });
    $("#html-window").keyup(function() {
        updateCodeLineNumber('html');
        changeTextareaSize('html');
    });

    $("#html-window").on('scroll', function() {
        $(".code-lines").scrollTop($(this).scrollTop());
    })
}

var onClickFunctions = function() {
    // function that compiles all the click event functions

    // Tab clicking
    $("#a-tabs-run").click(function() {
        loadData('run-window', 'html-window'); //loads html document for preview on clicking tab run
        $("#toolbar").css("display", "none"); //hides toolbar
    });

    // About window
    $("#a-about").click(function() {
        // opens about window on about button click
        $("#div-about").css("display", "block");
        $("#div-about").draggable({
            zIndex: 2,
            cursor: "move",
            containment: "#tabs",
            scroll: false,
            stack: "#ul-toolbar"
        });
    });
}

var primeIframe = function() {
    //console.log(document.domain);
    document.domain = document.domain;
    $("#iframe-preview").attr('src', 'preview.html?domain='+document.domain);
    //console.log('load data', document.domain);
    setTimeout(function(){
        loadData('iframe-preview', 'html-window');
    }, 300)
    $('#html-window').keyup(function() {
        loadData('iframe-preview', 'html-window');
    });
    $('#css-window').keyup(function() {
        loadData('iframe-preview', 'html-window');
    });
}


var index = 0;
var get_h2 = '';
var get_h3 = '';
var get_impact_figure = '';
var original;
var figure = '';
var get_html_window = '';
var storage = '';

var changed_h2 = '';
var changed_h3 = '';
var changed_figure = '';
var changed_paragraph = '';
var changed = '';

var originalArray;
var changedArray;
var annotationArray;
var colourHighlighting = '';

$(document).on('ready', function(){
    onClickFunctions();
    codeLineNumberManagement();
    primeIframe();

    updateCodeLineNumber('html');
    changeTextareaSize('html');
    setUpDataPicHTMLClipboard();

    // $("#h3_annotation").hide();
    // $("#impact_figure_annotation").hide();
    // $("#paragraph_annotation").hide();

    // $("#list_figures_annotation").hide;

    // //var code = $("#iframe-preview").contents().find("h2");
    // // console.log('changed h2 ' + changed_h2);
    // $("#background_overlay_h2").show(1000) && $("#h2_annotation").show(1000) && $("#h2_explainer").show(1000);


    setTimeout(function(){
        alert("This tool will help you build a data pic. You have to use HTML and CSS coding to put your own data pic together. Look out for hints and advice as you work through the instructions.");

        originalArray = [
            $("#iframe-preview").contents().find('#title'),
            $("#iframe-preview").contents().find('.subtitle'),
            $("#iframe-preview").contents().find('.super_impact__fig'),
            $("#iframe-preview").contents().find('.pragraph'),
            $("#iframe-preview").contents().find('.impact__fig'),
            $("#iframe-preview").contents().find('.footer')


        ],

        changedArray = [
            '#title',
            '.subtitle',
            '.super_impact__fig',
            '.pragraph',
            '.impact__fig',
            '.footer',
            '.outer_wrapper'
        ],

        annotationArray = [
            "#h2_annotation",
            "#h3_annotation",
            "#impact_figure_annotation",
            "#paragraph_annotation",
            "#list_figures_annotation",
            "#source_annotation",
            "#preview-overlay"
        ];

        explainerArray = [
       "#h2_explainer",
       "#h3_explainer",
       "#impact_figure_explainer",
       "#paragraph_explainer",
       "#list_figures_explainer",
       "#source_explainer",
       "#bgimage_explainer"
        ];

        backgroundArray = [
        "#background_overlay_h2",
        "#background_overlay_h3",
        "#background_overlay_impact",
        "#background_overlay_paragraph",
        "#background_overlay_figures",
        "#background_overlay_source"
        ];

        get_html_window = $('#html-window').contents().text();

        setInterval(function counter (){
            // console.log('orginal array ' + originalArray.length);

        for (var i =0; i < originalArray.length; i++) {


            // console.log('Test this for equality ********************')
            // console.log('iframe prev ' + $("#iframe-preview").contents().find(changedArray[i]).text());
            // console.log(originalArray[i].text());

             // // console.log('iframe prev ' + $("#iframe-preview").contents().find(changedArray[i]).text());
             // // console.log('original array ' + originalArray);
             // // console.log('original array item ' + originalArray[i]);
             // // console.log(originalArray[i]);
             // // console.log('original array item text ' + originalArray[i].text());
        //      console.log($("#iframe-preview").contents());
        // console.log('im original');
        // console.log(originalArray[i].html());
        // console.log('im new');
        // console.log($("#iframe-preview").contents().find(changedArray[i]).html());
           if (originalArray[i].html() !== $("#iframe-preview").contents().find(changedArray[i]).html()) {


    // for (var j =0; j < originalArray.length; j++) {
                    //getElementById("h2_explainer").classList.add("hide");
                    //explainerArray[i].addClass("hide");
                    //console.log(explainerArray[i+1]);
                    //$(explainerArray[i+1]).addClass("show").removeClass("hide");
                    // console.log('siomething changed at array pos ', i);
                    /// explainerArray[i].hide();
                    console.log('im herer and its not equal');

                    $(explainerArray[i]).css('display', 'none');
                    $(explainerArray[i+1]).css('display', 'block');
                    $(explainerArray[i-1]).css('display', 'block');
                    $(explainerArray[i-2]).css('display', 'block');
                    $(explainerArray[i-3]).css('display', 'block');

                    $(annotationArray[i]).css('display', 'none');
                    $(annotationArray[i+1]).css('display', 'block');

                    $(backgroundArray[i]).css('display', 'none');
                    $(backgroundArray[i+1]).css('display', 'block');
                    //explainerArray[i+1].css('border', '10px solid red');

    // };



            // console.log('Not equal here now' + [i]);

    // var
    //          $("#explainers").prop("#h2_explainer").write('<html class=' + 'h2_explainer--hide' + '</html>');

                // for (var j = 0; j < annotationArray.length; j++) {s
                //     annotationArray[i].addClass('hide');
                // }

                //explainerArray[i].hide(1000);
                // annotationArray[i].hide(1000);
                // // backgroundArray[i].hide(1000);
                // //colourHighlighting.hide();

                // //$("#iframe-preview").contents().find(changedArray[i + 1]).css("background-color","pink");

                // annotationArray[i + 1].show(4000);
                // explainerArray[i + 1].show(4000);
                // backgroundArray[i + 1].show(4000);

                // // // console.log('NOW: CHANGED ARRAY ' + changedArray[i]);
                // // // console.log('NOW: ORIGINAL ARRAY ' + originalArray[i].text);
                // originalArray.splice(i, 1);
                // changedArray.splice(i, 1);
                // annotationArray.splice(i, 1);
                // explainerArray.splice(i, 1);
                // backgroundArray.splice(i, 1);
                // // hides the first speech bubble when something else was changed but we want it to show another asset instead
                // // eliminate hide error
                // if ($("#iframe-preview").contents().find(explainerArray[i - 1])) {
                //     annotationArray[i-1].hide();
                //     explainerArray[i-1].hide();
                //     }
                // if ($("#iframe-preview").contents().find(explainerArray[i - 2])) {
                //     annotationArray[i-2].hide();
                //     explainerArray[i-2].hide();
                //     }
                // if ($("#iframe-preview").contents().find(explainerArray[i - 3])) {
                //     annotationArray[i-3].hide();
                //     explainerArray[i-3].hide();
                //     }
                // if ($("#iframe-preview").contents().find(explainerArray[i - 4])) {
                //     annotationArray[i-3].hide();
                //     explainerArray[i-3].hide();
                //     }
                // if ($("#iframe-preview").contents().find(explainerArray[i - 5])) {
                //     annotationArray[i-3].hide();
                //     explainerArray[i-3].hide();
                //     }
                }

var title = $("#iframe-preview").contents().find('#title').text();
var titleHeight = title.getElementById("title");
var elmtHeight = titleHeight.offsetHeight;
console.log('value of title ' + title);
console.log('!!!!!!!!height of current element ' + elmtHeight);

            }
        }, 3000);

    }, 2000)


});

// GET HEIGHTS AND WIDTHS OF DATA PIC ELEMENTS FOR OVERLAYS
// var title$("#iframe-preview").contents().find('#title')
// var elmt = document.getElementById():


count = 0;

    var iframeCopy = '';
    var newWindow = '';

$('#screenshot').click(function () {
    newIframe = document.createElement('iframe');
    iframeCopy = document.getElementById('html-window').value;


    // newWindow = window.open();
    // $(newWindow).append(newIframe);

    //var w = window.open('http://'+document.domain+'/window');
    var html = iframeCopy;
    // w.document.domain = document.domain;
    // w.document.writeln(html);
    // w.alert('Take a screenshot by pressing the following keys:\nCtr + Alt + Prt Scr (on a PC)\ncmd + shift + 3 (on a Mac)\nThen use file preview to crop and save your data pic.');
    // w.document.close();
    // newWindow.document.write(iframeCopy);
    // newWindow.alert('Take a screenshot by pressing the following keys:\nCtr + Alt + Prt Scr (on a PC)\ncmd + shift + 3 (on a Mac)\nThen use file preview to crop and save your data pic.');
    // newWindow.document.close();

    //writeConsole('Hello from JavaScript!');
    //function writeConsole(content) {
     // top.consoleRef=window.open('','',
     //  'width=625,height=400'
     //   +',menubar=0'
     //   +',toolbar=1'
     //   +',status=0'
     //   +',scrollbars=1'
     //   +',resizable=1')
     // top.consoleRef.document.writeln(
     //  '<html><head><title>Console</title></head>'
     //   +'<body bgcolor=white onLoad="self.focus()">'
     //   +html
     //   +'<h1>TEST</h1>'
     //   +'</body></html>'
     // )
//     top.consoleRef.alert('Take a screenshot by pressing the following keys:\nCtr + Alt + Prt Scr (on a PC)\ncmd + shift + 3 (on a Mac)\nThen use file preview to crop and save your data pic.');
     //top.consoleRef.document.close()



console.log('gets to here***************');
    var x=window.open('#');
$(x).append(newIframe);

x.document.open();
x.document.write(html);
x.alert('Take a screenshot by pressing the following keys:\nCtr + Alt + Prt Scr (on a PC)\ncmd + shift + 3 (on a Mac)\nThen use file preview to crop and save your data pic.');
//x.close();


     // top.consoleRef=window.open('','myconsole',
     //  'width=625,height=400'
     //   +',menubar=0'
     //   +',toolbar=1'
     //   +',status=0'
     //   +',scrollbars=1'
     //   +',resizable=1')
     // top.consoleRef.document.writeln(
     //  '<html><head><title>Console</title></head>'
     //   +'<body bgcolor=white onLoad="self.focus()">'
     //   +html
     //   +'</body></html>'
     // )
     // top.consoleRef.alert('Take a screenshot by pressing the following keys:\nCtr + Alt + Prt Scr (on a PC)\ncmd + shift + 3 (on a Mac)\nThen use file preview to crop and save your data pic.');
     // top.consoleRef.document.close()

    //}
});


var setUpUITabs = function () {

$(function() {
    $("#tabs").tabs().find(".ui-tabs-nav").sortable({
        axis: "x"
    });
});
};

var setUpDataPicHTMLClipboard = function () {
    var client = new ZeroClipboard( document.getElementById("d_clip_button") );
    client.on( "ready", function( readyEvent ) {
      client.on( "copy", function (e) {
        var htmlString = document.getElementById('html-window').value;
        ZeroClipboard.setData("text/plain", htmlString);
      });
    } );
};

var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [
            {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
            {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
            {string: navigator.userAgent, subString: "Safari", identity: "Safari"},
            {string: navigator.userAgent, subString: "Opera", identity: "Opera"}
        ]

    };


$('#d_clip_button').click(function () {
    BrowserDetect.init();
    // if (BrowserDetect.browser === "Explorer" || "Trident") {
    //     alert ('Sorry, this feature does not work on Internet Explorer.');
    //     // console.log("You are using <b>" + BrowserDetect.browser + "</b> with version <b>" + BrowserDetect.version + "</b>");
    // }
});

//Gets devive width
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

// console.log('w ' + w + 'h ' + h);

if (w < 1259) {
    alert ('This application only supports laptop and desktop.');
    $("p:first").addClass("device_message");
}


// setUpDataPicHTMLClipboard();
// setUpUITabs();
// //HidePreviewWindowAnnotations();
// loadData();
// //resetPanel();
// //toggleBackground();
// changeTextareaSize();
// //getTextareaBufferData();
// checkForEmptyLine();
// updateCodeLineNumber();
// onClickFunctions();
// takeScreenshot();












