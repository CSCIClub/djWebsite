from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def chat(request):
	return HttpResponse('\n'.join([
'<script type="text/javascript">',
'// Note that the path doesnt matter for routing; any WebSocket',
'// connection gets bumped over to WebSocket consumers',
'socket = new WebSocket("ws://" + window.location.host + "/chat/");',
'socket.onmessage = function(e) {',
'    console.log(e.data + "\\n");',
'}',
'socket.onopen = function() {',
'    socket.send("hello world");',
'}',
'// Call onopen directly if socket is already open',
'if (socket.readyState == WebSocket.OPEN) socket.onopen();',
'</script>'
]))

def game(request):
	return render(request, 'spacegame/game.html')
