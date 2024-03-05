import mqtt from 'mqtt';


const client = mqtt.connect('mqtt://192.168.68.109');

client.on('connect', () => {
    console.log('Connesso al broker MQTT');
});

client.on('message', (topic, message) => {
    console.log(`Messaggio ricevuto su ${topic}: ${message}`);
});