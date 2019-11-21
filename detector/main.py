import sys
import zerorpc
import gevent, signal
from detector import Detector
from sys import exit

server = None

def cleanup():
  if server: server.stop()
  print('clean exit', flush=True)
  exit(signal.SIGTERM)

def main():
    addr = 'tcp://127.0.0.1:4242'
    server = zerorpc.Server(Detector())
    server.bind(addr)
    print('start field detector service on {}'.format(addr), flush=True)
    gevent.signal(signal.SIGTERM, cleanup)
    gevent.signal(signal.SIGINT, cleanup)
    server.run()

if __name__ == '__main__':
    main()
