import random
import json
import threading
import time
import copy

from channels import Group
from channels.sessions import channel_session
from channels.auth import http_session_user, channel_session_user, channel_session_user_from_http
from .utils import delay
from .newserver import server

@delay(1.0)
def deleteShot(id):
	del server.gamestate["shotsFiredMessage"][id]

@delay(0.2)
def killPlayer(player):
	server.gamestate['players'][player] = {
		'id': player,
		'alive': False, 
		'name': server.gamestate['players'][player]['name'],
		'score': server.gamestate['players'][player]['score'],
		'position': {
			'x': -10000,
			'y': -10000,
			'z': -10000,
		},
		'rotation': {
			'x': 0,
			'y': 0,
			'z': 0,
		},
	}


vowels = 'aeiouy'
consonants = 'bcdfghjklmnpqrstvwxyz'

def ws_add(message):


	Group("players").add(message.reply_channel)

	if(not server.is_alive()):
		print('starting server...', end=' ')
		try:
			server.start()
		except:
			print('error\n')
		else:
			print('done\n')


def ws_message(message):
	try:
		player_update = json.loads(message.content['text'])
	except:
		print('Malformed client message:', message.content['text'])
	else:
		player = str(message.reply_channel)
		if(player_update['type'] == 'respawn'):
			server.gamestate['players'][server.ids[player]] = {
				'id': server.ids[player],
				'alive': True, 
				'name': server.gamestate['players'][server.ids[player]]['name'],
				'score': server.gamestate['players'][server.ids[player]]['score'],
				'position': {
					'x': random.randrange(20),
					'y': random.randrange(20),
					'z': random.randrange(20),
				},
				'rotation': {
					'x': 0,
					'y': 0,
					'z': 0,
				},
			}

			#send connection confirmation to client
			message.reply_channel.send({
				'text': json.dumps({
					'type': 'respawn accepted',
					'player_state': server.gamestate['players'][server.ids[player]],
				})
			})

		elif(player_update['type'] == 'join'):
			#initialize player in gamestate
			server.ids[player] = server.id_count
			#generate random name
			name = player_update['name']
			server.gamestate['players'][server.ids[player]] = {
				
				'id': server.id_count,
				'alive': True, 
				'name': name,
				'score': 0,
				'position': {
					'x': random.randrange(20),
					'y': random.randrange(20),
					'z': random.randrange(20),
				},
				'rotation': {
					'x': 0,
					'y': 0,
					'z': 0,
				},
			}

			#send connection confirmation to client
			message.reply_channel.send({
				'text': json.dumps({
					'type': 'connection accepted',
					'player_state': server.gamestate['players'][server.ids[player]],
				})
			})

			#send connection message to everyone on server
			Group("players").send({
				'text': json.dumps({
					'type':	  'player connect',
					'player':  name,
				})
			})

			server.id_count += 1

		elif(player_update['type'] == 'update'):
			if(server.gamestate['players'][server.ids[player]]['alive']):
				for key in player_update['player']:
					if(key in server.gamestate['players'][server.ids[player]]):
						server.gamestate['players'][server.ids[player]][key] = copy.deepcopy(player_update['player'][key])

		elif(player_update['type'] == 'shoot'):
			server.gamestate["shotsFiredMessage"][server.shotID] = {}
			server.gamestate["shotsFiredMessage"][server.shotID]['shooter'] = server.ids[player]
			server.gamestate["shotsFiredMessage"][server.shotID]['position'] = {}
			server.gamestate["shotsFiredMessage"][server.shotID]['position']['x'] = player_update['position']['x']
			server.gamestate["shotsFiredMessage"][server.shotID]['position']['y'] = player_update['position']['y']
			server.gamestate["shotsFiredMessage"][server.shotID]['position']['z'] = player_update['position']['z']

			server.gamestate["shotsFiredMessage"][server.shotID]['distance'] = player_update['distance']

			if 'hit' in player_update:
				server.gamestate['players'][server.ids[player]]['score'] += 1
				server.gamestate['players'][int(player_update['hit'])]['score'] /= 2
				server.gamestate['players'][int(player_update['hit'])]['alive'] = False
				killPlayer(int(player_update['hit']))
				server.gamestate["shotsFiredMessage"][server.shotID]['hit'] = player_update['hit']

			server.gamestate["shotsFiredMessage"][server.shotID]['rotation'] = {}
			server.gamestate["shotsFiredMessage"][server.shotID]['rotation']['x'] = player_update['rotation']['x']
			server.gamestate["shotsFiredMessage"][server.shotID]['rotation']['y'] = player_update['rotation']['y']
			server.gamestate["shotsFiredMessage"][server.shotID]['rotation']['z'] = player_update['rotation']['z']

			deleteShot(server.shotID)
			server.shotID += 1
		else:
			pass

def ws_disconnect(message):
	player = str(message.reply_channel)
	Group("players").discard(message.reply_channel)
	Group("players").send({
		'text': json.dumps({
			'type':	  'player disconnect',
			'player': server.gamestate['players'][server.ids[player]]['name'],
		})
	})
	del server.gamestate['players'][server.ids[player]]
