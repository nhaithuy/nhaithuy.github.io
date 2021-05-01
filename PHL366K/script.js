// JSON object to store the results
var result = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null
}

var count = {
    "camus": 0,
    "kierkegaard": 0,
    "nietzsche": 0,
    "heidegger": 0,
    "sartre": 0,
}

// variable to choose displayed question
var curr_question = 1;


// checking forms
$('.form-check-input').click(function() {
    // console.log(result)
    var selectedVal = $(this).val().split(" ")
    // console.log(selectedVal)
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
    const img_string = "<img src=\"./assets/" + best_match + ".jpg\" >"
    best_match = best_match.charAt(0).toUpperCase() + best_match.slice(1)
    // console.log(result)

    // show result
    const res_string = "<h2>You most identify with " + best_match + "</h2>"
    $('#res-text').html(res_string)
    $('#res-img').html(img_string)
    // console.log(res_string)
    $('#view-result').css("display", "none")
    $('.toggle-questions').css("display", "none")
    $('.nav').css("display", "none")
    $('#reset').css("display", "block")
    calculate_result()
    $('#chart-container').css("display", "block")
    $('res-img').css("padding", "20px 0")
}

function reset() {
    location.reload(true)
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

// switching tabs
function switch_tab(q) {
    const nav_items = $('.nav-link')

    for (var i = 0; i < nav_items.length; i++) {
        var nav_item = nav_items[i]
        if (nav_item.classList.contains("active")) {
            nav_item.classList.remove("active")

            // hide this question. ID is index + 1
            $('#q' + (i + 1)).removeClass('active')
        }
    }

    $('#' + q).addClass('active')

    // show the other question
    $('#q' + q).addClass('active')
}

function toggle_question(is_next) {
    const questions = $('.question')

    for (var i = 0; i < questions.length; i++) {
        if (questions[i].classList.contains("active")) {
            if (is_next) {
                if (i + 2 <= 8) {
                    switch_tab(i + 2)
                }
            } else {
                if (i >= 1) {
                    switch_tab(i)
                }
                
            }
            return
        }
    }
}


// testing Google Chart
// google.charts.load('current', {packages: ['corechart', 'bar']});
// google.charts.setOnLoadCallback(drawBasic);

// function drawBasic() {

//       var data = google.visualization.arrayToDataTable([
//         ['City', '2010 Population',],
//         ['New York City, NY', 8175000],
//         ['Los Angeles, CA', 3792000],
//         ['Chicago, IL', 2695000],
//         ['Houston, TX', 2099000],
//         ['Philadelphia, PA', 1526000]
//       ]);

//       var options = {
//         title: 'Population of Largest U.S. Cities',
//         chartArea: {width: '100%'},
//         hAxis: {
//           title: 'Total Population',
//           minValue: 0
//         },
//         vAxis: {
//           title: 'City'
//         }
//       };

//       var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

//       chart.draw(data, options);
//     }

function calculate_result() {
    const labels = [
        'Camus',
        'Kierkegaard',
        'Nietzsche',
        'Heidegger',
        'Sartre'
    ];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Your Responses',
        
        data: [count["camus"], count["kierkegaard"], count["nietzsche"], count["heidegger"], count["sartre"]],
        backgroundColor: [
          'rgb(109, 102, 55)',
          'rgb(111, 78, 55)',
          'rgb(180, 172, 106)',
          'rgb(211, 184, 135)',
          'rgb(149, 142, 75)'
        ],
        borderColor: [
          'rgb(109, 102, 55)',
          'rgb(111, 78, 55)',
          'rgb(180, 172, 106)',
          'rgb(211, 184, 135)',
          'rgb(149, 142, 75)'
        ],
        borderWidth: 1
      }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            },
          }
        },
      };
    
      var myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
      $('#myChart').css("height", "100%")
}


