// TODO: Get successes to be green in the console.
// TODO: Make sure only one error per failure goes to the console.
// TODO: Make failures red in the console.
// TODO: Show stack traces for failures.
// TODO: Only show stack traces if you click expand.
// TODO: Output summary statistics to DOM.

var TinyTestHelper = {
    renderStats: function(tests, failures) {
        var totalNumberOfTests = Object.keys(tests).length;
        var successes = totalNumberOfTests - failures;        
        var summaryString = "Ran " + totalNumberOfTests + " tests: " 
                        + successes + " successes, "
                        + failures + " failures";        
        var summaryElement = document.createElement('h1');
        summaryElement.textContent = summaryString;
        document.body.appendChild(summaryElement);        
    }
};

var TinyTest = {
    run: function(tests) {
        var failures = 0;
        // var successes = 0;

        for (var testName in tests) {         
            var testAction = tests[testName];
            
            try {      
                testAction.apply(this);
                // successes++;
                // console.log('Test:', testName, 'OK');
                // console.log(('%c' + 'Test: ' + testName + ' OK'), 'color: green');
                console.log(('%c' + testName), 'color: green');
            } catch (e) {
                failures++;
                // console.log('Test:', testName, 'FAILED', e);
                // console.log(('%c' + testName), 'color: red');
                // console.error(e.stack);
                console.groupCollapsed(('%c' + testName), 'color: red');
                console.error(e.stack);
                console.groupEnd();
            }
        }
        // inside setTimeout is where we are manipulating the DOM.

        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');

                // Output summary statistics
                // Number of tests that were run.
                // Number of successes.
                // Number of failures.
                // var totalNumberOfTests = failures + successes;

                // var totalNumberOfTests = Object.keys(tests).length;
                // var successes = totalNumberOfTests - failures;

                // console.log(totalNumberOfTests);
                // console.log('failures', failures);
                // console.log('successes', totalNumberOfTests - failures);

                // var summaryString = "Ran " + totalNumberOfTests + " tests: " 
                //                     + successes + " successes, "
                //                     + failures + " failures";
                // console.log(summaryString);

                // var myDiv = document.createElement('div');
                // myDiv.innerHTML = summaryString;
                // var grabBody = document.querySelector('body');
                // grabBody.appendChild(myDiv);

                // var summaryElement = document.createElement('h1');
                // summaryElement.textContent = summaryString;
                // document.body.appendChild(summaryElement);

                TinyTestHelper.renderStats(tests, failures);

            } else {
                console.log("DOM is not ready yet");
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);

