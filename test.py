import requests
import paho.mqtt.client as mqtt
import time
url = "https://cg4002-gui.herokuapp.com/rec/"

def on_message(client, userdata, message):
        msg = message.payload.decode("utf8")
        try:
            page = requests.get(url + msg,timeout=1)
        except:
            pass


serverUrl   = "broker.hivemq.com"
clientId    = "G17_U96"

# Connect the client
client = mqtt.Client(clientId)
client.on_message=on_message
client.connect(serverUrl)
base_topic = "ChiHenIsASexyBoi/1"
client.subscribe(base_topic)
test = input("Do simulation test?:[y]") == 'y'
while True:
    mqtt_ser = client.loop()
