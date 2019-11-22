import asyncio
import websockets
from socketStubServer import SocketStubServer
from detector import Detector
import json

stub = SocketStubServer(Detector())

start_server = websockets.serve(stub.main, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()