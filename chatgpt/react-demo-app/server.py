# server.py
import asyncio
from aiohttp import web
import json
import random

async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]
    running = True

    async def shuffle_items():
        while running:
            random.shuffle(items)
            await ws.send_str(json.dumps(items))
            await asyncio.sleep(2)  # shuffle every 2 seconds

    asyncio.create_task(shuffle_items())

    async for msg in ws:
        if msg.type == web.WSMsgType.TEXT:
            if msg.data == 'stop':
                running = False
            elif msg.data == 'start':
                running = True
                asyncio.create_task(shuffle_items())
        elif msg.type == web.WSMsgType.ERROR:
            print('WebSocket connection closed with exception %s' % ws.exception())

    print('WebSocket connection closed')
    return ws

app = web.Application()
app.add_routes([web.get('/ws', websocket_handler)])

if __name__ == '__main__':
    web.run_app(app, port=8080)
