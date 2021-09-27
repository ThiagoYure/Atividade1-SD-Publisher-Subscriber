import { createClient } from "redis";
import readline from "node:readline";

(async () => {

    const subscriber = createClient();
    const publisher = subscriber.duplicate();
    await subscriber.connect();
    await publisher.connect();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const handlerMessage = (message) => {
        const now = new Date();
        console.log("[" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + message); // 'message'
    }

    rl.question('Nome de Usuário: ', (answer) => {
        subscriber.subscribe("channel-2", handlerMessage);
        rl.on('line', (msg) => {
            publisher.publish("channel-2", "] [<" + answer + ">] : < " + msg + " >");
        });
    });
})();