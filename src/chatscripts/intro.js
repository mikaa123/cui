/* eslint-disable import/no-commonjs, no-console */
const algoliasearch = require('algoliasearch');
const client = algoliasearch('XNIYVXANUC', 'f815a050dcf99d35dc894bc0f97c50cd');
const index = client.initIndex('seo_steps');

const chatbot =
  'http://www.theturninggear.com/wp-content/uploads/2015/04/robot_icon.png';

const mika =
  'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg';

const interactions = [
  {
    type: 'SEQUENCE',
    objectID: 'intro',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['Testing, testing...', 'Can you see my messages?'],
        avatar: chatbot,
        delay: 0,
      },
      {
        type: 'STEP_TELL',
        text: ['Yes chatbot, I can see your messages...'],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'I can see them too',
          },
        ],
      },
      {
        type: 'STEP_TELL',
        text: [
          "Hey there! Didn't see you were online",
          "I'm Michael, and I'm still debugging this chatbot!",
          "What's your name?",
        ],
        avatar: mika,
      },
      {
        type: 'STEP_ANSWER',
        variable: 'name',
      },
      {
        type: 'STEP_TELL',
        text: ['Nice to m...'],
        avatar: mika,
      },
      {
        type: 'STEP_TELL',
        text: ['Welcome {name}!'],
        delay: 0,
        avatar: chatbot,
      },
      {
        type: 'STEP_TELL',
        text: [
          '...',
          'Seems like I still need to work on the "interruption" module!',
          "Anyways, chatbot, why don't you show {name} what you can do?",
        ],
        delay: 1000,
        avatar: mika,
      },
      {
        type: 'STEP_TELL',
        text: [
          'SURE!',
          "I'm a technologically advanced bot that can make your life a lot easier. For instance, I can tell a joke.",
        ],
        delay: 1000,
        avatar: chatbot,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Tell me the joke',
          },
        ],
      },
      {
        type: 'STEP_TELL',
        text: ["I don't guarantee any SLA on that one..."],
        avatar: mika,
      },
      {
        type: 'STEP_TELL',
        text: ['{name}, do you have updog?'],
        avatar: chatbot,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Updog?',
          },
        ],
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'What is Updog?',
          },
        ],
      },
      {
        type: 'STEP_TELL',
        text: ["Nuuthin dog, what's up with you?"],
        avatar: chatbot,
      },
      {
        type: 'STEP_TELL',
        delay: 3000,
        text: [
          '...',
          "I'm so sorry about that {name}.",
          'So hmm... What brings you here?',
        ],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'I want to learn more about the chatbot',
          },
        ],
      },
      { type: 'STEP_REF', ref: 'chatbot' },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'chatbot',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['Which topic would you like to talk about?'],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'The idea',
            next: 'idea',
          },
          {
            val: 'The UI/UX',
          },
          {
            val: 'Non-linear dialogues',
          },
        ],
      },
      { type: 'STEP_REF', ref: 'chatbot' },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'idea',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'The idea was to build an open-source Conversational UI engine, together with a non-linear dialogue module.',
          'The little twist was that I wanted all the dialogue to be driven by the server. So not included in the front-end.',
          'And for the server part... I wanted to go "serverless" by using Algolia.',
        ],
        avatar: mika,
      },
      { type: 'STEP_REF', ref: 'ideaChoice' },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'ideaChoice',
    interactions: [
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Conversational UI?',
            next: 'conversationalUI',
          },
          {
            val: 'Non-linear dialogue?',
            next: 'nonLinearDialogue',
          },
          {
            val: 'Serverless?',
            next: 'serverless',
          },
          {
            val: 'Continue...',
            branchOut: true,
          },
        ],
      },
      { type: 'STEP_REF', ref: 'ideaChoice' },
    ],
  },
];

const questions = [
  {
    type: 'SEQUENCE_QUESTION',
    objectID: 'conversationalUI',
    question: 'Conversational UI?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          "It's a user interface that looks like a chat. Just like we are having a conversation.",
          "We're not talking chatbot here, although a chatbot might be answering to you.",
        ],
        avatar: mika,
      },
      {
        type: 'STEP_TELL',
        text: ['Am I a chatbot?'],
        avatar: chatbot,
      },
      {
        type: 'STEP_TELL',
        text: [
          "Nope, actually you're not. You are just part of a script written using non-linear dialogue.",
        ],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          { val: 'What is a chatbot?', next: 'whatIsAChatBot' },
          { val: 'Continue...', branchOut: true },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    objectID: 'nonLinearDialogue',
    question: 'Non-linear dialogue?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          "It's a dialogue where you can choose different branches.",
          'Often, those are presented to you as a choice:',
        ],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [{ val: "That's a branch" }, { val: "That's another one" }],
      },
      {
        type: 'STEP_TELL',
        text: [
          'The whole conversation will adapt depending on what you choose.',
        ],
        avatar: mika,
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    objectID: 'serverless',
    question: 'Serverless?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          "It's one of those buzzwords that can mean different things...",
          "In this case, it means that I didn't have to code a backend. I just used Algolia.",
        ],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [{ val: 'Algolia?', next: 'algolia' }, { val: 'Continue...' }],
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    objectID: 'algolia',
    question: 'Algolia?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'Algolia is a hosted search engine that let us do faceted search, which is wonderful when building chatbots.',
        ],
        avatar: mika,
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    objectID: 'whatIsAChatBot',
    question: 'What is a chatbot?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'Most of the time, when we say chatbot we refer to an AI that can understand the user, and have a real conversation with them',
          "It uses NLP to understand the intent of the user's message, and acts accordingly.",
        ],
        avatar: mika,
      },
    ],
  },
];

index
  .clearIndex()
  .then(() => index.addObjects([...interactions, ...questions]))
  .then(res => {
    console.log('Updated', res);
  })
  .catch(console.log);
