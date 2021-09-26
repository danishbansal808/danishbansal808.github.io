function searchStock() {
    console.log("I am clicked")
    $('#srchbtn').attr("disabled", true);
    searchstring = document.getElementById("srchstr")
    document.getElementById("records_table").innerHTML=`<tr>
    <th>Symbol</th>
    <th>Name</th>
    <th>Type</th>
    <th>Region</th>
    <th>Currency</th>
</tr>`
    searchstring = searchstring.value
    $.ajax({
        url: "https://selfstockanalysis.herokuapp.com/searchstocks?srchstr="+searchstring,
        type: 'GET',
        success: function (response) {
            var response = $.parseJSON(JSON.stringify(response))
            response = response["bestMatches"]
            var trHTML = '';
            $.each(response, function (i, item) {
                // for(it=0;it<item.length;it++){
                trHTML += '<tr><td>' + item["1. symbol"] + '</td><td>' + item["2. name"] + '</td><td>' + item["3. type"] + '</td><td>' + item["4. region"] + '</td><td>' + item["8. currency"] + '</td></tr>';
                // }
            });
            $('#records_table').append(trHTML);
            $('#srchbtn').attr("disabled", false);
        }
    });
}