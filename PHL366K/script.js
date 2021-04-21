// JSON object to store the results
var result = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
}

var count = {
    "camus": 0,
    "kierkegaard": 0,
    "nietzsche": 0,
    "heidegger": 0,
    "sartre": 0,
}

$('.form-check').click(function() {
    var selectedVal = $('input[name="radio"]:checked').val().split(" ")
    const question = parseInt(selectedVal[0], 10)
    const philosopher = selectedVal[1]

    // check if this has been re-selected
    if (result[question]) {
        count[result[question]] -= 1
    }

    result[question] = philosopher
    count[philosopher] += 1
})

function view_result() {
    // hide all questions
    $('.question').css("display", "none")
    $('#prompt-text').html("Below is your result.")

    // get match
    var best_match = get_best_match_philosopher()
    best_match = best_match.charAt(0).toUpperCase() + best_match.slice(1)

    // show result
    const res_string = "<h2>You most identify with " + best_match + "</h2>"
    $('#result').html(res_string)
    console.log(res_string)
}

function get_best_match_philosopher() {
    var philosopher = ""
    var max = -1

    for (const e in count) {
        if (count[e] > max) {
            max = count[e]
            philosopher = e
        }
    }
    return philosopher
}