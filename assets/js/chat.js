$(window).ready(function () {

    $("#message").focus();

    var socket = io.connect('http://192.168.0.9');

    var send = $("#send");
    var form = $("form");
    var message = $("#message");
    var messages = $("#messages");
    var messageTemplate = _.template($("#message-template").html());

    var update = function (data) {
	var element = $(messageTemplate(data));
	messages.append(element);
	//$(document).scrollTop() > $(document).height() - 2 * $(window).height() && $("html, body").scrollTop($(document).height());
	$("html, body").scrollTop($(document).height());
    };

    send.attr("disabled", "disabled");

    socket.on('connect', function () {
	send.removeAttr("disabled");
    });

    socket.on("chat", update);

    form.submit(function () {
	var data = { username: $('#username span').html(), message: message.val() };
	socket.emit("chat", data);
	update(data);
	$("#message").val('').focus();
	return false;
    });

    socket.on('message', function(data) {
	$("span.badge").html(data.count);
    });

});

