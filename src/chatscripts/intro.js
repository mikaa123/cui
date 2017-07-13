/* eslint-disable import/no-commonjs, no-console */
const algoliasearch = require('algoliasearch');
const client = algoliasearch('XNIYVXANUC', 'f815a050dcf99d35dc894bc0f97c50cd');
const index = client.initIndex('seo_steps');

const chatbot =
  'http://www.theturninggear.com/wp-content/uploads/2015/04/robot_icon.png';

const mika =
  'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg';

const bored = [
  {
    type: 'SEQUENCE',
    objectID: 'bored',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['Maybe you can help me find which movie I can watch tonight?'],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Hmmm sure',
          },
        ],
      },
      {
        type: 'STEP_CHOOSE_MOVIE',
        variable: 'movie',
      },
    ],
  },
];

const intro = [
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
        text: ['Yes **chatbot**, I can see your messages...'],
        avatar: mika,
        delay: 1000,
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
          "Hey there! 👋 Didn't see you were online",
          "I'm **Michael**, and I'm still debugging this chatbot!",
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
        text: ['Welcome **{name}**! 🎉'],
        delay: 0,
        avatar: chatbot,
      },
      {
        type: 'STEP_TELL',
        text: [
          '...',
          'Seems like I still need to work on the `interruption` module!',
          "Anyways, **chatbot**, why don't you show **{name}** what you can do?",
        ],
        delay: 1000,
        avatar: mika,
      },
      {
        type: 'STEP_TELL',
        text: [
          'SURE!',
          "I'm a technologically advanced bot that can make your life a lot easier. For instance, **I can tell a joke**.",
          'I can also help you find answers to your problems by asking **why** multiple times.',
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
          {
            val: 'Help me with my problems',
            ref: 'problem',
          },
          {
            val: "It's ok! ☺️",
          },
        ],
      },
      { type: 'STEP_REF', ref: 'whatBringsYouHere' },
      { type: 'STEP_REF', ref: 'chatbot' },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'joke',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ["(I don't guarantee anything on that one...)"],
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
        text: ['...', "I'm so sorry about that {name}."],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: '😋',
          },
          {
            val: '😐',
          },
          {
            val: '😓',
          },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'problem',
    interactions: [
      {
        type: 'STEP_TELL',
        delay: 2000,
        text: ["What's wrong?"],
        avatar: chatbot,
      },
      {
        type: 'STEP_REF',
        ref: 'problemWhy',
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'problemWhy',
    interactions: [
      {
        type: 'STEP_ANSWER',
        variable: 'pb',
      },
      {
        type: 'STEP_TELL',
        text: ['Why?'],
        avatar: chatbot,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Answer',
            ref: 'problemWhy',
          },
          {
            val: 'Nevermind',
          },
        ],
      },
    ],
  },
  ...bored,
];

const openQuestion = [
  {
    type: 'SEQUENCE',
    objectID: 'openQuestion',
    interactions: [
      {
        type: 'STEP_ASK',
      },
      {
        type: 'STEP_TELL',
        text: ['Do you have another question?'],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Yes',
            ref: 'openQuestion',
          },
          {
            val: 'Not yet',
          },
        ],
      },
    ],
  },
];

const datastructure = [
  {
    type: 'SEQUENCE',
    objectID: 'datastructure',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'To power this chat, there is a non-linear dialog script.',
          "It's handled by a library that acts as an interpreter.",
        ],
        avatar: mika,
      },
      { type: 'STEP_REF', ref: 'datastructureChoice' },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'datastructureChoice',
    interactions: [
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Dialog structure?',
            ref: 'nonLinearDialogue',
          },
          {
            val: 'Dialog interpreter?',
            ref: 'dialogInterpreter',
          },
          {
            val: 'Continue...',
            branchOut: true,
          },
        ],
      },
      { type: 'STEP_REF', ref: 'datastructureChoice' },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    topic: 'UI/UX',
    objectID: 'dialogInterpreter',
    question: 'Dialog interpreter?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          "In the dialog script, sequences and steps implement the 'interaction' interface (Composite). The dialog interpreter execute each interaction.",
          'This will update the state used as an input by the frontend library.',
        ],
        avatar: mika,
      },
    ],
  },
];

const uiux = [
  {
    type: 'SEQUENCE',
    objectID: 'uiux',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'The UX is heavily inspired by Typeform Conversational UI article (see here), and from most of the chat apps we interact with daily.',
          'At the core of the UX there is Cui, the library that powers it. This library only deals with managing the visual state of the chat, not with the non-linear dialog logic.',
        ],
        avatar: mika,
      },
      { type: 'STEP_REF', ref: 'uiuxChoice' },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'uiuxChoice',
    interactions: [
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Technology used?',
            ref: 'techUsed',
          },
          {
            val: 'Architecture?',
            ref: 'frontendArchitecture',
          },
          {
            val: 'Continue...',
            branchOut: true,
          },
        ],
      },
      { type: 'STEP_REF', ref: 'uiuxChoice' },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    topic: 'UI/UX',
    objectID: 'techUsed',
    question: 'Technology used?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          "It's built in React, but the underlying idea can be used to port it to other framework.",
        ],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Architecture?',
            ref: 'frontendArchitecture',
          },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    topic: 'UI/UX',
    objectID: 'frontendArchitecture',
    question: 'Architecture of the front-end?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'We can see it as a sort of message queue.',
          'Messages comes in as JSON, and subcomponent handle them. Once they are done, they inform the queue so that the next message can be handled.',
          'Because this is both simple and flexible, we can use it to create any sort of event-driven experience, such as games, interactive-fictions, story-telling platforms...',
        ],
        avatar: mika,
      },
    ],
  },
];

const interactions = [
  ...intro,
  {
    type: 'SEQUENCE',
    objectID: 'whatBringsYouHere',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['What brings you here **{name}**?'],
        avatar: mika,
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'I want to learn more about the chatbot',
            ref: 'chatbot',
          },
          {
            val: 'I have some questions...',
            ref: 'openQuestion',
          },
          {
            val: "I'm bored",
            ref: 'bored',
          },
        ],
      },
      { type: 'STEP_REF', ref: 'whatBringsYouHere' },
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
            ref: 'idea',
          },
          {
            val: 'The UI/UX',
            ref: 'uiux',
          },
          {
            val: 'Non-linear dialogues',
            ref: 'datastructure',
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
            ref: 'conversationalUI',
          },
          {
            val: 'Non-linear dialogue?',
            ref: 'nonLinearDialogue',
          },
          {
            val: 'Ask',
            ref: 'askIdea',
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
  {
    type: 'STEP_ASK',
    branchOut: true,
    objectID: 'askIdea',
    topic: 'idea',
  },
  ...uiux,
  ...datastructure,
  ...openQuestion,
];

const questions = [
  {
    type: 'SEQUENCE_QUESTION',
    topic: 'idea',
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
          { val: 'What is a chatbot?', ref: 'whatIsAChatBot' },
          { val: 'Continue...', branchOut: true },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    topic: 'idea',
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
          'In this case, the whole dialog is stored as JSON in Algolia and is composed of a serie of `sequence` and `step`.',
          'A sequence is a serie of step, and a step is an action for the UI, such as "TELL" to make me tell you things, or "CHOOSE" to let you choose between different branches.',
        ],
        avatar: mika,
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    topic: 'idea',
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
        choices: [{ val: 'Algolia?', ref: 'algolia' }, { val: 'Continue...' }],
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    topic: 'idea',
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
    topic: 'idea',
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
  {
    type: 'SEQUENCE_QUESTION',
    topic: 'idea',
    objectID: 'whatIsAChatBot',
    question: 'Why should the script be driven by the server?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'So that we can use the same engine to power other chat systems (you know, slack, facebook, etc..)',
          "Also it's easier for mobile, no need to redeploy when the script changes.",
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
