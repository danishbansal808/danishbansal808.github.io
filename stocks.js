function daily(st) {
    console.log(st)
    $('#srchbtn2').attr("disabled", true);
    searchstring = st
    document.getElementById("daily_price_table").innerHTML = `<tr>
    <th>Symbol</th>
    <th>Date</th>
    <th>Open</th>
    <th>High</th>
    <th>Low</th>
    <th>Close</th>
    <th>Adjusted Close</th>
    <th>Volume</th>
</tr>`
    $.ajax({
        url: "https://selfstockanalysis.herokuapp.com/dailyprice?stockname=" + searchstring,
        type: 'GET',
        success: function (response) {
            var response = $.parseJSON(JSON.stringify(response))
            // response = response["bestMatches"]
            var trHTML = '<tbody>';
            $.each(response, function (i, item) {
                // for(it=0;it<item.length;it++){
                trHTML += `<tr>
                <td> ${st} </td>
                <td>${i} </td>
                <td> ${item['1. open']} </td>
                <td> ${item['2. high']} </td>
                <td> ${item['3. low']} </td>
                <td> ${item['4. close']} </td>
                <td> ${item['5. adjusted close']} </td>
                <td> ${item['6. volume']} </td>
                </tr>`;
                // }
            });
            trHTML += "</tbody>"
            $('#daily_price_table').append(trHTML);
            $('#srchbtn2').attr("disabled", false);
        }
    });
}

function getDailyStockPrice() {
    $('#srchbtn2').attr("disabled", true);
    searchstring = document.getElementById("stocksymbol").value
    daily(searchstring)
    $('#srchbtn2').attr("disabled", false);
}

function searchStock() {
    console.log("I am clicked")
    $('#srchbtn').attr("disabled", true);
    searchstring = document.getElementById("srchstr")
    document.getElementById("records_table").innerHTML = `<tr>
    <th>Symbol</th>
    <th>Name</th>
    <th>Type</th>
    <th>Region</th>
    <th>Currency</th>
</tr>`
    searchstring = searchstring.value
    $.ajax({
        url: "https://selfstockanalysis.herokuapp.com/searchstocks?srchstr=" + searchstring,
        type: 'GET',
        success: function (response) {
            var response = $.parseJSON(JSON.stringify(response))
            response = response["bestMatches"]
            var trHTML = '';
            $.each(response, function (i, item) {
                // for(it=0;it<item.length;it++){
                trHTML += '<tr><td>' + '<a href=#daily onclick=daily(\"' + item["1. symbol"] + '\")>' + item["1. symbol"] + '</a>' + '</td><td>' + item["2. name"] + '</td><td>' + item["3. type"] + '</td><td>' + item["4. region"] + '</td><td>' + item["8. currency"] + '</td></tr>';
                // }
            });
            $('#records_table').append(trHTML);
            $('#srchbtn').attr("disabled", false);
        }
    });
}

function convertDate(d) {
    // console.log(d)
    var p = d.split("/");
    return +(p[2] + p[1] + p[0]);
}

function sortByDate() {
    var tbody = document.querySelector("#daily_price_table tbody").nextSibling;
    // get trs as array for ease of use
    var rows = [].slice.call(tbody.querySelectorAll("tr"));
    console.log(rows)
    headers=rows[0]
    rows.slice(1,-1).sort(function (a, b) {
        // console.log(a, b)
        return convertDate(a.cells[1].innerHTML) - convertDate(b.cells[1].innerHTML);
    });

    rows.unshift(headers)
    rows.reverse()
    rows.forEach(function (v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
    });
}

document.getElementById("sortdata").addEventListener("click", sortByDate);