function myFunction() {
  //this is ajax request with venella js
  var request = new XMLHttpRequest();
  var url = document.getElementById("url").value;
  var params = JSON.stringify({ url: url });
  request.open("POST", "http://localhost:3000/url_minimising_page", true);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  // request.setRequestHeader("Content-length", params.length);
  request.onload = function() {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      document.getElementById("result").innerHTML =
        "http://localhost:3000/" + data.result;
      console.log("Hello you are in if loop");
    } else {
      console.log("error");
    }
  };
  request.send(params);
}
function ajaxjquery() {
  $("#urlForm").submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    url = $form.find("input[name='url']").val();
    var posting = $.post({ url: url });
    posting.done(function(data) {
      var content = $(data).find("#content");
      $("#result")
        .empty()
        .append(content);
    });
  });
}
