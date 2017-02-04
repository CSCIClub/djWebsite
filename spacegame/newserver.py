import threading
import time
import json

from channels import Group

class Server(threading.Thread):
	def __init__(self):
		threading.Thread.__init__(self)
		self.stop = False
		self.gamestate = {}
		self.gamestate["shotsFiredMessage"] = {}
		self.gamestate["players"] = {}
		self.ids = {}
		self.shotID = 0;
		self.id_count = 0
		self.tickrate = 20

	def run(self):
		self.next_tick = time.time() + (1 / self.tickrate)
		while(not self.stop):
			if(self.gamestate):
				Group("players").send({
					'text': json.dumps({
						'type': 	 'update',
						'gamestate': self.gamestate,
					})
				})

			delta = self.next_tick - time.time()
			if(delta > 0):
				time.sleep(delta)
			self.next_tick += (1 / self.tickrate)

	def stop(self):
		self.stop = true

server = Server()
