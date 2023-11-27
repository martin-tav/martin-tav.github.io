$(document).ready(function() {

    var typingTimer; //timer identifier
    var doneTypingInterval = 500; //time in ms, 5 second for example
    $('#myInput').on('keyup', function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });
    $('#myInput').on('keydown', function() {
        clearTimeout(typingTimer);
    });

    function doneTyping() {
        filterEvents();
    }
    //remove var in order to create global variable
    var $policies = [];
    $count = 0;
    //console.log("8");
    //console.log($('table.table tr').length);
    
    function buildPolicies() {
        var policies = new Array();
        first = true;
        $("table.table tbody tr").not(".display").each(function(index) {
            /*if (first){
                first = false;
                return;
            }*/
            //console.log($(this));
            policies.push($(this));
        });
        return policies;
    }
    //t here is a function which gets passed an options object and returns a string of html. I am using quicktmpl to create it based on the template located over in the html block
    myPolicies = buildPolicies();
    $('#numberSearch').text($('table.table tbody tr').not(".display").length);
    $('#numberPositive').text($('table.table tbody tr.positive').length);
    $('#numberNegative').text($('table.table tbody tr.negative').length);

    //console.log(myPolicies);
    //console.log("Apres build events : Time until DOMready: ", Date.now() - timerStart);
    function calendar($el, options) {};
    (function(defaults, $, window, document) {})({}, jQuery, window, document);
    //data must be sorted by start date
    //Actually do everything
    /*$('#holder').calendar({
        data: $eventsPastOrder.concat($events)
    });*/
});

function addClassByClick(element, myclass) {
    if (!myclass) {
        var myclass = 'active';
    }
    $(element).siblings().removeClass(myclass); // if you want to remove class from all sibling buttons
    $(element).toggleClass(myclass);
}
/*function setInputValue(myValue) {
    input = document.getElementById('myInput');
    input.value = myValue;
    input.focus();
    inputValue = input.value.toUpperCase();
    filterEvents(myValue);
}*/
function filterEvents(valueCommittee) {
    console.log("63");
    if (!valueCommittee) {
        var valueCommittee = '';
    }
    console.log("67");
    console.log($('table').length);
    ul = $('table');

    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    if (valueCommittee != "") {
        input.value = "";
        input.focus();
    }
    if (input.value.length == 0 && valueCommittee.length == 0) {
        valueCommittee = 'ALL';
    }
    console.log(input);
    var acronyms = {};
    acronyms["WEO"] = "WORLD ENERGY OUTLOOK";
    acronyms["ETP"] = "ENERGY TECHNOLOGIES POLICY";
    acronyms["OMR"] = "OIL MARKET REPORT";
    acronyms["WEI"] = "WORLD ENERGY INVESTMENT";
    acronyms["EBC"] = "ENERGY BUSINESS COUNCIL";
    acronyms["ENAD"] = "ENERGY ADVISOR";
    acronyms["EEWP"] = "WORKING PARTY ON ENERGY EFFICIENCY";
    acronyms["SOM"] = "STANDING GROUP ON THE OIL MARKET";
    acronyms["CETP"] = "CLEAN ENERGY TRANSITIONS PROGRAMME";
    acronyms["CIAB"] = "COAL INDUSTRY ADVISORY BOARD";
    acronyms["GB"] = "GOVERNING BOARD";
    nbMultiMatch = 0;
    nbExactMatch = 0;
    //$('#noresult').addClass("hidden");
    inputTab = input.value.split(" ");
    //console.log(inputTab.length);
    if (valueCommittee.length != 0 || (inputTab.length == 1 && inputTab[0].length != 0)) {
        console.log("single");
        //console.log(valueCommittee.length);
        console.log("101");
        nbExactMatch = searchSingleValue(input, acronyms, valueCommittee, myPolicies);
        console.log("nbExactMatch = " + nbExactMatch);
        if (nbExactMatch == 0) {
            if (valueCommittee.length != 0) {
                $('#noresult').removeClass("hidden");
            } else {
                searchApproximate(myPolicies, acronyms);  
            }
        } else {
            $('#noresult').addClass("hidden");
            $('#numberSearch').text(nbExactMatch);
        }
    } else if (inputTab.length > 1 && inputTab[1].length != 0) {
        //console.log("double");
        nbMultiMatch = searchMultiValue(input, myPolicies);
        if (nbMultiMatch == 0) {
            searchApproximate(myPolicies, acronyms);
        } else {
            $('#noresult').addClass("hidden");
            $('#numberSearch').text(nbMultiMatch);
        }
    } else {
        //$('.EventsTitle').removeClass("hidden");
        $('#noresult').addClass("hidden");
        //$('#noresult').addClass("hidden");
    }

    function searchSingleValue(searchvalue, acronyms, committee, events) {
        //$('.TitleThisWeek').removeClass("hidden");
        console.log("128");
        inputValue = searchvalue.value.toUpperCase();
        committee = committee.toUpperCase();
        inputValue = inputValue.replace(" ", "");
        if (inputValue.toUpperCase() in acronyms) inputValueAcronym = acronyms[inputValue];
        else inputValueAcronym = Object.keys(acronyms).find(key => acronyms[key] === inputValue);
        nbExactMatch = 0;
        //console.log(events.length);
        events.forEach(function(event) {
            text = event.text().toUpperCase();
            //console.log("136");
            //console.log(text);
            if ((text.indexOf(inputValue) > -1 && inputValue.length != 0) || (text.indexOf(inputValueAcronym) > -1 && inputValueAcronym.length != 0) || committee == 'ALL' || (text.indexOf(committee) > -1 && committee.length != 0)) {
                console.log("138");
                event.addClass("display");
                event.removeClass("hidden");
                //event.removeHighlight();
                //event.highlight(inputValue);
                //event.highlight(inputValueAcronym);
                //event.highlight(committee);
                nbExactMatch++;
            } else {
                event.addClass("hidden");
                event.removeClass("display");
            }
        });
        return nbExactMatch;
    }

    function searchMultiValue(searchMultiplevalue, events) {
        inputValue = searchMultiplevalue.value.toUpperCase();
        multipleValue = inputValue.split(" ");
        firstValue = multipleValue[0];
        secondValue = multipleValue[1];
        thirdValue = "";
        if (multipleValue.length > 2 && multipleValue[2].length != 0) {
            thirdValue = multipleValue[2];
            console.log(firstValue);
            console.log(secondValue);
            console.log(thirdValue);
            console.log(" ");
        }
        nbMultiMatch = 0;
        //var myEvents = new Array();
        events.forEach(function(event) {
            //myEvents.push(event.text());
            conditions = (event.text().toUpperCase().indexOf(firstValue) > -1 && firstValue.length != 0) && (event.text().toUpperCase().indexOf(secondValue) > -1 && secondValue.length != 0)
            text = event.text().toUpperCase();
            if (multipleValue.length > 2 && multipleValue[2].length != 0) {
                conditions = conditions && (event.text().toUpperCase().indexOf(thirdValue) > -1 && thirdValue.length != 0);
            }
            if (conditions) {
                event.removeClass("hidden");
                event.addClass("display");
                //event.removeHighlight();
                //event.highlight(firstValue);
                //event.highlight(secondValue);
                if (thirdValue.length != 0) //event.highlight(thirdValue);
                nbMultiMatch++;
            } else {
                event.addClass("hidden");
                event.removeClass("display");
            }
        });
        return nbMultiMatch;
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function searchApproximate(events, acronyms) {
        $('#noresult').addClass("test");
        var eventsText = new Array();
        events.forEach(function(event) {
            eventsText.push(event.text().toUpperCase());
            //console.log(event.text().toUpperCase());
        });
        var myEventsFlat = [].concat.apply([], eventsText);
        var words = [];
        var wordsSameLetter = [];
        myEventsFlat.forEach(function(item) {
            var wordsItem = item.split(/\W+/);
            wordsItem.forEach(function(word) {
                words.push(word);
                if (word.substring(0, 2) == inputValue.substring(0, 2)) wordsSameLetter.push(word);
            });
        });
        var uniqueWords = wordsSameLetter.filter(onlyUnique);
        uniqueWordsFlat = uniqueWords.join(' ');
        console.log("UniqueWordsFlat"+uniqueWordsFlat.length);
        var paramMyData = $.param(events);
        if (uniqueWordsFlat.length > 0) {
            $.ajax({
                type: "POST",
                url: "/python/myenv/smart.py?word=" + inputValue + "&vocab=" + uniqueWordsFlat,
                data: paramMyData, // "inp1=val1&inp2=val2"
                success: function(response) {
                    $('#noresult').removeClass("hidden");
                    var responseValue = response.replace(/\s/g, '');
                    responsebutton = "<a onclick=\"setInputValue('" + responseValue + "')\";><span>" + responseValue + "</span></a>";
                    if (responseValue.length > 0) $('#noresult').html("Do you mean \"<span class=\"yellow\">" + responseValue.toLowerCase() + "</span>\" ? Check out the results below.");
                    else $('#noresult').html("No result, please search again ");
                    if (responseValue.toUpperCase() in acronyms) responseValueAcronym = acronyms[responseValue.toUpperCase()];
                    else responseValueAcronym = "";
                    nbApproximateMatch = 0;
                    events.forEach(function(event) {
                        if (event.text().toUpperCase().indexOf(responseValue.toUpperCase()) > -1 || (responseValueAcronym.length > 0 && event.text().toUpperCase().indexOf(responseValueAcronym.toUpperCase()) > -1)) {
                            event.removeClass("hidden");
                            event.addClass("display");
                            event.removeHighlight();
                            nbApproximateMatch += 1;
                            event.highlight(responseValue);

                            if (responseValueAcronym.length > 0) event.highlight(responseValueAcronym);
                        }
                    });
                    $('#numberSearch').text(nbApproximateMatch);

                },
                error: function(error) {
                    console.log(error);
                }
            });
        } else {
            $('#noresult').html("No result, please search again ");
            $('.EventsTitle').removeClass("hidden");
        }
    }
}

function reset() {
    // Declare variables
    if ($(this["0"]).length > 0) {
        if ($(this["0"].$Other).find("a").length > 0) {
            console.log("605");
        }
    } else {
        var ul = document.getElementById('myUL');
        ul.setAttribute("style", "display:none;");
        var input, filter, ul, li, a, i;
        input = document.getElementById('myInput');
        input.value = "";
        //input.focus();
    }
}