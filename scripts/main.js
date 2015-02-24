// // >>> Main Variables
var wleft; // preview window current left position
var wtop; // preview window current top position

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


if (w < 1200) {
    alert ('To use this applicaton your screen needs to be at least 1200px wide.');
} else {

    var loadData = function(frame, html) {
        // function that creates html document to be uploaded on iframe
        // contentDocument gets what's inside the iframe.

        var content ;

        content = $("#" + html).val();

        $("#" + frame).contents().find("body").html($.parseHTML(content));

    }

var old = '';


    var changeTextareaSize = function(tab_name) {
        // function that increases or decreases the textarea according with content size
        // Input:
        // tab_name -> the name of the tab being edited. Possible values 'html'

        var text_buffer = getTextareaBufferData(tab_name + '-window');
        var textarea_rows = $('#' + tab_name + '-window').prop('rows');

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

        if (text_buffer['size'] <= 38) { // sets scroll bar to top
            $('#tabs-' + tab_name).scrollTop(0);
        }
    };

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
    };

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

    var setUpDataPicHTMLClipboard = function () {

        ie10andbelow = navigator.userAgent.indexOf('MSIE') != -1;


        if (!ie10andbelow) {
                var client = new ZeroClipboard( document.getElementById("d_clip_button") );
                client.on( "ready", function( readyEvent ) {
                client.on( "copy", function (e) {
                var htmlString = document.getElementById('html-window').value;
                ZeroClipboard.setData("text/plain", htmlString);
          });
        } );
        };
    };

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
    var ie10andbelow = '';

    $(document).on('ready', function(){
        onClickFunctions();
        codeLineNumberManagement();
        primeIframe();
        setUpDataPicHTMLClipboard();

        updateCodeLineNumber('html');
        changeTextareaSize('html');

        // var allBrowsers = if(navigator.userAgent.indexOf("Mozilla") > 0






        $("#h3_annotation").css('display', 'none');
        $("#background_overlay_pic").css('display', 'none');
        $("#impact_figure_annotation").css('display', 'none');
        $("#paragraph_annotation").css('display', 'none');
        $("#source_annotation").css('display', 'none');
         $("#list_figures_annotation").css('display', 'none');

        $("#list_figures_annotation").css('display', 'none');

        $("#background_overlay_h2").css('display', 'block') && $("#h2_annotation").css('display', 'block');


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
                "#source_annotation"

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
            "#background_overlay_source",
            "#background_overlay_pic"
            ];

            get_html_window = $('#html-window').contents().text();

            setInterval(function counter (){

            for (var i =0; i < originalArray.length; i++) {



               if (originalArray[i].html() !== $("#iframe-preview").contents().find(changedArray[i]).html()) {
                        $('.explainer').css('display', 'none');
                        $(explainerArray[i+1]).css('display', 'block');

                        $('.annotations img').css('display', 'none');
                        $(annotationArray[i+1]).css('display', 'block');

                        $('.overlays img').css('display', 'none');
                        $(backgroundArray[i+1]).css('display', 'block');

                        // if (BrowserDetect.browser === "Explorer" || "Trident") {
                        //     $(backgroundArray[i+1]).css('display', 'block');

                        // };

                        x = $("#iframe-preview").contents().find(changedArray[i + 1]).offset();
                        y = $("#iframe-preview").contents().find('#inner_wrapper').offset();
                        myHeight = $("#iframe-preview").contents().find('.outer_wrapper')[0].clientHeight;
                        myWidth = $("#iframe-preview").contents().find('.outer_wrapper')[0].clientWidth;

                        $('.overlays img').css('display', 'none');



                        if (i < backgroundArray.length - 2) {
                            $(backgroundArray[i+1]).css({
                            'display': 'block',
                            'position': 'absolute',
                            'top': x.top + y.top + 4 + 'px',
                            'left': '16px'
                        });
                            } else {
                                $(backgroundArray[backgroundArray.length - 1]).css ({
                                'display': 'block',
                                'position': 'absolute',
                                'top': y.top + 24 + 'px',
                                'left': '8px',
                                'width': myWidth + 2 + 'px',
                                'height': myHeight
                            });
                        };



                        // ANNOTATIONS
                        $('.annotations img').css('display', 'none');
                        $(annotationArray[i+1]).css({
                            'display': 'block',
                            'position': 'absolute',
                            'top': x.top + y.top + 3 + 'px',
                            'right': x.left + -31 + 'px'
                        });


                 }

            // }

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

    //IE8 Fallback
        ie10andbelow = navigator.userAgent.indexOf('MSIE 8.0') != -1;


        if (ie10andbelow) {
            $('.explainer').css('display', 'none');
            $('.annotations img').css('display', 'none');
            $('.overlays img').css('display', 'none');
            alert('Take a screenshot by pressing the following keys:\nCtr + Alt + Prt Scr (on a PC)\ncmd + shift + 3 (on a Mac)\nThen use file preview to crop and save your data pic.');
        } else {

            newIframe = document.createElement('iframe');
            iframeCopy = document.getElementById('html-window').value;

            var html = iframeCopy;
            var x=window.open('#');
            x.document.open();
            x.document.write(html);
            x.alert('Take a screenshot by pressing the following keys:\nCtr + Alt + Prt Scr (on a PC)\ncmd + shift + 3 (on a Mac)\nThen use file preview to crop and save your data pic.');
        }
    });


    var setUpUITabs = function () {

    $(function() {
        $("#tabs").tabs().find(".ui-tabs-nav").sortable({
            axis: "x"
        });
    });
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

};












