# MQTT publisher and subscriber on Node.js

## Overview

This Node.js project demonstrates how to publish and subscribe to messages using MQTT protocol with a focus on communication with an MQTT broker hosted on a Raspberry Pi. The project is split into two main files: `publish.js` and `subscribe.js`, facilitating the publishing of messages to specific topics and subscribing to receive messages from those topics, respectively.

## Prerequisites

- Node.js installed on your machine.
- MQTT broker running on a Raspberry Pi within your network (or any MQTT broker accessible through an IP address or hostname).
- `mqtt` and `inquirer` npm packages.

Before running the scripts, ensure you have installed the required packages using npm:

```bash
npm install mqtt inquirer
```

## `publish.js` - Publishing Messages

This script allows users to publish messages to a specific topic on an MQTT broker. It uses the `inquirer` package to interactively ask the user for the topic and the message they wish to publish.

### How to Run

Execute the script in your terminal:

```bash
node publish.js
```

Follow the prompts to input the topic and the message you wish to publish. The script will then publish your message to the specified topic on the MQTT broker.

## `subscribe.js` - Subscribing to Topics

This script enables users to subscribe to a specific topic and save incoming messages to a file named `messages.txt`. It leverages the `inquirer` package to interactively ask the user for the topic they wish to subscribe to.

### How to Run

To start the script, run:

```bash
node subscribe.js
```

When prompted, enter the topic you want to subscribe to. The script will listen for messages on that topic and append them to `messages.txt` along with the topic name.

## `receive.js` - Code Reference

This file contains code snippets for reference and demonstrates how to connect to an MQTT broker and handle incoming messages. It is not intended to be executed directly.

## Configuration

Both `publish.js` and `subscribe.js` scripts are configured to connect to an MQTT broker at the address `mqtt://192.168.68.109`. If your broker's address differs, you will need to update the scripts accordingly.

## Conclusion

This project showcases basic MQTT publish/subscribe functionality in Node.js. It is designed as a learning tool and a starting point for more complex MQTT-based applications. Remember to replace the broker address with that of your own MQTT broker and ensure that your broker is running before attempting to publish or subscribe to topics.