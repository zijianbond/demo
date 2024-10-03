var data = [{"word": "game", "count": 177}, {"word": "nba", "count": 138}, {"word": "curry", "count": 113}, {"word": "warriors", "count": 109}, {"word": "steph", "count": 91}, {"word": "first", "count": 90}, {"word": "round", "count": 88}, {"word": "time", "count": 80}, {"word": "playoffs", "count": 79}, {"word": "highlight", "count": 75}, {"word": "kings", "count": 71}, {"word": "series", "count": 64}, {"word": "seed", "count": 62}, {"word": "vs", "count": 62}, {"word": "lakers", "count": 58}, {"word": "playoff", "count": 58}, {"word": "history", "count": 57}, {"word": "lebron", "count": 52}, {"word": "th", "count": 52}, {"word": "team", "count": 47}, {"word": "respect", "count": 45}, {"word": "draymond", "count": 45}, {"word": "sabonis", "count": 45}, {"word": "player", "count": 44}, {"word": "win", "count": 44}, {"word": "points", "count": 38}, {"word": "season", "count": 37}, {"word": "embiid", "count": 36}, {"word": "lost", "count": 36}, {"word": "one", "count": 36}, {"word": "play", "count": 35}, {"word": "dont", "count": 35}, {"word": "james", "count": 35}, {"word": "best", "count": 34}, {"word": "knicks", "count": 33}, {"word": "looney", "count": 33}, {"word": "green", "count": 32}, {"word": "teams", "count": 32}, {"word": "year", "count": 31}, {"word": "murray", "count": 30}, {"word": "players", "count": 30}, {"word": "seeds", "count": 30}, {"word": "jimmy", "count": 30}, {"word": "nd", "count": 29}, {"word": "back", "count": 28}, {"word": "second", "count": 28}, {"word": "games", "count": 27}, {"word": "guys", "count": 26}, {"word": "fox", "count": 26}, {"word": "dillon", "count": 26}, {"word": "brooks", "count": 26}, {"word": "heat", "count": 25}, {"word": "butler", "count": 25}, {"word": "top", "count": 24}, {"word": "kevon", "count": 24}, {"word": "finals", "count": 24}, {"word": "kevin", "count": 23}, {"word": "lot", "count": 23}, {"word": "ever", "count": 23}, {"word": "today", "count": 23}, {"word": "celtics", "count": 22}, {"word": "im", "count": 22}, {"word": "conference", "count": 22}, {"word": "league", "count": 22}, {"word": "get", "count": 22}, {"word": "joel", "count": 22}, {"word": "sacramento", "count": 22}, {"word": "highlights", "count": 22}, {"word": "jokic", "count": 21}, {"word": "suns", "count": 21}, {"word": "since", "count": 21}, {"word": "knee", "count": 20}, {"word": "stephen", "count": 20}, {"word": "said", "count": 20}, {"word": "made", "count": 20}, {"word": "old", "count": 20}, {"word": "still", "count": 19}, {"word": "years", "count": 19}, {"word": "ankle", "count": 19}, {"word": "ers", "count": 19}, {"word": "fans", "count": 19}, {"word": "jordan", "count": 19}, {"word": "every", "count": 19}, {"word": "grizzlies", "count": 19}, {"word": "jamal", "count": 18}, {"word": "statmuse", "count": 18}, {"word": "giannis", "count": 18}, {"word": "hands", "count": 18}, {"word": "wins", "count": 18}, {"word": "won", "count": 18}, {"word": "offensive", "count": 18}, {"word": "last", "count": 18}, {"word": "scoring", "count": 17}, {"word": "foul", "count": 17}, {"word": "big", "count": 17}, {"word": "go", "count": 17}, {"word": "like", "count": 17}, {"word": "three", "count": 17}, {"word": "durant", "count": 17}, {"word": "amp", "count": 16}, {"word": "thread", "count": 16}, {"word": "espn", "count": 16}, {"word": "st", "count": 16}, {"word": "boston", "count": 16}, {"word": "left", "count": 16}, {"word": "minutes", "count": 16}, {"word": "doubtful", "count": 16}, {"word": "played", "count": 16}, {"word": "miami", "count": 16}, {"word": "good", "count": 16}, {"word": "rebounds", "count": 16}, {"word": "know", "count": 16}, {"word": "court", "count": 16}, {"word": "little", "count": 16}, {"word": "pts", "count": 16}, {"word": "sources", "count": 15}, {"word": "nuggets", "count": 15}, {"word": "championship", "count": 15}];

// Set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
// var colorScale = d3.scaleLinear()
//     .domain(d3.extent(data, function(d) { return d.count; }))
//     .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);
// Define an array of colors for the text
var textColors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
// Create a new SVG element
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")");

// Create a new cloud layout instance
var layout = d3.layout.cloud()
    .size([width, height])
    .words(data.map(function(d) {
        return {text: d.word, size: d.count};
    }))
    .padding(5)
    .rotate(function() {
        return ~~(Math.random() * 2) * 90;
    })
    .fontSize(function(d) {
        return d.size;
    })
    .on("end", draw);

// Start the layout algorithm
layout.start();

// Draw the word cloud
function draw(words) {
    svg.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function(d) {
            return d.size + "px";
        })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .style("fill", function(d, i) {
            return textColors[i % textColors.length];
        })
        .text(function(d) {
            return d.text;
        });
};

$(document).ready(function() {
  $('#optionsSelect').change(function() {
    var selectedOption = $(this).val(); // 获取用户选择的选项
    $.ajax({
      url: '/api/wordcloud?data=' + selectedOption, // 发送请求的 URL，并将选项作为查询字符串附加上去
      type: 'GET', // 请求类型改为 GET
      success: function(data) { // 成功回调函数
          window.data = data
          // Remove the old text elements
        svg.selectAll("text").remove();
          // Create a new cloud layout instance
        // var layout = d3.layout.cloud()
        //     .size([width, height])
        //     .words(window.data.map(function(d) {
        //         return {text: d.word, size: d.count};
        //     }))
        //     .padding(5)
        //     .rotate(function() {
        //         return ~~(Math.random() * 2) * 90;
        //     })
        //     .fontSize(function(d) {
        //         return d.size;
        //     })
        //     .on("end", draw);
          layout.words(window.data.map(function(d) {
                return {text: d.word, size: d.count};
            }))
            .padding(5)
            .rotate(function() {
                return ~~(Math.random() * 2) * 90;
            })
            .fontSize(function(d) {
                return d.size;
            })
            .on("end", draw);

        // Start the layout algorithm
        layout.start();
    },
      error: function(jqXHR, textStatus, errorThrown) { // 失败回调函数
        console.log(textStatus + ': ' + errorThrown);
      }
    });
  });
});

