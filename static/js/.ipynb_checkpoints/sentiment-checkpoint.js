var data = [
{"id": "1", "post": "I'm so happy tonight", "sentiment": "2"},
{"id": "2", "post": "I'm just so so tonight", "sentiment": "1"},
{"id": "3", "post": "nothing new today", "sentiment": "1"},
{"id": "4", "post": "so bad that curry didn't make it tonight", "sentiment": "0"},
{"id": "5", "post": "I'm so happy tonight", "sentiment": "2"},
{"id": "6", "post": "I'm just so so tonight", "sentiment": "1"},
{"id": "7", "post": "nothing new today", "sentiment": "1"},
{"id": "8", "post": "so bad that curry didn't make it tonight", "sentiment": "0"},
{"id": "9", "post": "nothing new today", "sentiment": "1"},
{"id": "10", "post": "so bad that curry didn't make it tonight", "sentiment": "0"}
];

var columns = ["id", "post", "sentiment"];

var emojiMap = {
    "0": "😔negative",
    "1": "😐neutral",
    "2": "😊positive"
};

var table = d3.select("#mytable")
    .append("thead")
    .append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")
    .text(function(d) { return d; });

var rows = d3.select("#mytable")
    .append("tbody")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

var cells = rows.selectAll("td")
    .data(function(row) {
        return columns.map(function(column) {
            if (column === "sentiment") {
                return { column: column, value: emojiMap[row[column]] };
            } else {
                return { column: column, value: row[column] };
            }
        });
    })
    .enter()
    .append("td")
    .text(function(d) { return d.value; });

$(function () {
    $('#submit-btn').click(function () {
      var inputVal = $('#input-box').val();
      if (inputVal) {
        $.get('/api/data', { data: inputVal }, function (res) {
            $('#mytable').empty();
            data = res;
            var columns = ["id", "post", "sentiment"];

        var emojiMap = {
            "0": "😔negative",
            "1": "😐neutral",
            "2": "😊positive"
        };

        var table = d3.select("#mytable")
            .append("thead")
            .append("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function(d) { return d; });

        var rows = d3.select("#mytable")
            .append("tbody")
            .selectAll("tr")
            .data(data)
            .enter()
            .append("tr");
            rows.selectAll("td").remove()
            .data(function(row) {
                return columns.map(function(column) {
                    if (column === "sentiment") {
                        return { column: column, value: emojiMap[row[column]] };
                    } else {
                        return { column: column, value: row[column] };
                    }
                });
            })
            .enter()
            .append("td")
            .text(function(d) { return d.value; });
        });
      }
    });
});
