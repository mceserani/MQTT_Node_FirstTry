// Importa il client MQTT
import mqtt from 'mqtt';
import inquirer from 'inquirer';

// Configura il client per connettersi al broker MQTT sul Raspberry Pi
const client = mqtt.connect('mqtt://192.168.68.109');

const publish_questions = [
    {
        type: 'input',
        name: 'topic',
        message: 'Inserisci il topic su cui vuoi pubblicare'
    },
    {
        type: 'input',
        name: 'message',
        message: 'Inserisci il messaggio che vuoi inviare'
    }
];

const menù = [
    {
        type: 'list',
        name: 'menu',
        message: 'Cosa vuoi fare?',
        choices: ['Pubblica un messaggio', 'Esci']
    }
];


async function publish() {
    const answers = await inquirer.prompt(publish_questions);
    const { topic, message } = answers;
    await new Promise((resolve, reject) => {
        client.publish(topic, message, (err) => {
            if (err) {
                console.error('Errore durante la pubblicazione del messaggio:', err);
                reject(err);
            } else {
                console.log(`Messaggio pubblicato su ${topic}: ${message}`);
                resolve();
            }
        });
    });
}

async function main() {
    const answers = await inquirer.prompt(menù);
    if (answers.menu === 'Pubblica un messaggio') {
        await publish();
        main();
    } else if (answers.menu === 'Esci'){
        console.log('Arrivederci!');
        client.end();
        process.exit(0);
    } else {
        console.log('Opzione non valida!');
    }
}

main();