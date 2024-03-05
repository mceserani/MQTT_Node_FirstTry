import mqtt from 'mqtt';
import inquirer from 'inquirer';
import fs from 'fs';

const client = mqtt.connect('mqtt://192.168.68.109');

const f_path = '.\\messages.txt';

client.on('message', (topic, message) => {
    const msg = `Messaggio ricevuto su ${topic}: ${message}\n`;
    fs.appendFile(f_path, msg, (err) => {
        if (err) {
            console.error('\nErrore durante la scrittura del file:', err);
        }
    });
});

const menu = [
    {
        type: 'list',
        name: 'choice',
        message: 'Scegli un\'opzione',
        choices: ['Iscriviti ad un topic', 'Esci']
    }
];

const subscribe_questions = [
    {
        type: 'input',
        name: 'topic',
        message: 'Inserisci il topic a cui vuoi iscriverti'
    }
];

// Rendi la funzione subscribe asincrona
async function subscribe() {
    const answers = await inquirer.prompt(subscribe_questions);
    const { topic } = answers;
    // Usa una nuova Promise per aspettare la conferma dell'iscrizione
    await new Promise((resolve, reject) => {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error('Errore durante l\'iscrizione al topic:', err);
                reject(err); // Gestisce l'errore
            } else {
                console.log(`Iscritto al topic ${topic}`);
                resolve(); // Risolve la Promise quando la callback viene chiamata
            }
        });
    });
}

// Rendi anche la funzione main asincrona per poter usare await con subscribe
async function main() {
    const answers = await inquirer.prompt(menu);
    const { choice } = answers;
    if (choice === 'Iscriviti ad un topic') {
        await subscribe(); // Usa await per aspettare la fine dell'iscrizione prima di continuare
        main();
    } else {
        console.log('Arrivederci!');
        client.end();
        fs.closeSync(f);
        process.exit(0);
    }
}

main();
