/* eslint-disable import/no-commonjs, no-console */
const algoliasearch = require('algoliasearch');
const client = algoliasearch('XNIYVXANUC', 'f815a050dcf99d35dc894bc0f97c50cd');
const index = client.initIndex('seo_steps');

const interactions = [
  {
    type: 'SEQUENCE',
    objectID: 'intro',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'Hello! :)',
          "I'm Mika, a bot that know about SEO and Algolia",
          "(I'm a bit of an experiment)",
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      { type: 'STEP_REF', ref: 'choose1' },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'name',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['What should I call you?'],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_ANSWER',
        variable: 'name',
      },
      {
        type: 'STEP_TELL',
        text: ['Nice to meet you, {name}.'],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_REF',
        ref: 'level',
      },
    ],
  },

  {
    type: 'SEQUENCE',
    objectID: 'choose1',
    interactions: [
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: "Cool let's chat about SEO!",
            next: 'name',
            fork: true,
          },
          {
            val: 'Why an experiment?',
            next: 'experiment',
            // fork: true,
          },
          {
            val: 'Wait, what is Algolia?',
            next: 'algolia',
          },
        ],
      },
      { type: 'STEP_REF', ref: 'choose1' },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'level',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'Are you already familiar with SEO? Do you need a little refresher?',
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'I know the basics',
            next: 'basics',
            fork: true,
          },
          {
            val: 'What is SEO?',
            next: 'whatIsSEO',
            fork: true,
          },
          {
            val: 'Actually, I already have a question',
            next: 'openq',
          },
        ],
      },
      {
        type: 'STEP_TELL',
        text: ['You know the basics.'],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'whatIsSEO',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'SEO stands for Search Engine Optimization',
          "It's a set of practices that allow your content to rank higher on a search engine.",
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Tell me more',
            next: 'whatIsSEO2',
          },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'whatIsSEO2',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'The purpose of a search engine like Google is to promote relevant content with a great user experience',
          'To do that, it analyses your website (it\'s called "crawling") and ranks it.',
          'This ranking is done with over 200 factors.',
          "So SEO is about making sure the important factors are taken into account to optimize the website's ranking.",
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Ok, and how does it works with Algolia?',
            next: 'basics',
          },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'basics',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'Since Algolia is a technology, having great SEO depends on how you have implemented it.',
          'However, since Algolia relies on great UX and fast results, we have seen substencial boosts in ranking out of the box.',
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'What is Algolia?',
          },
          {
            val: "But Algolia relies on JS, isn't it harmful for SEO?",
          },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'experiment',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          "I'm using Algolia as a backend to power this chat we are having.",
          "I'm trying to see where conversational UI can take us.",
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Sounds exciting!',
          },
          {
            val: "What's different?",
            next: 'experiment-different',
          },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'experiment-different',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          "There's no need to have any server, since all the chat script is stored in Algolia.",
          "There's also another feature that can be pretty useful, and can make a conversation feel more natural...",
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'What is it?',
          },
        ],
      },
      {
        type: 'STEP_TELL',
        text: [
          'I call it "open question", which is... well, a mechanism that allows you to ask pre-defined open-questions.',
          'Want to try?',
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'Sure',
          },
        ],
      },
      {
        type: 'STEP_TELL',
        text: [
          'Awesome! You will see a text field appear. Simply start typing keywords and you will see questions to ask.',
          'I have restricted the topic of the question to only match those about the experiment.',
          "It's all handled thanks to facets on Algolia",
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_ASK',
        topic: 'experiment',
      },
      {
        type: 'STEP_ASK',
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'openq',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['Start typing your question'],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_ASK',
      },
    ],
  },
];

const questions = [
  {
    type: 'SEQUENCE_QUESTION',
    question: 'Question about the experiment',
    topic: 'experiment',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['Thats a question indeed!'],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    question: 'What is X?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['Thats a question indeed!'],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    question: 'What is Y?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['Thats a question indeed!'],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
    ],
  },
  {
    type: 'SEQUENCE_QUESTION',
    question: 'What is Z?',
    interactions: [
      {
        type: 'STEP_TELL',
        text: ['Thats a question indeed!'],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_TELL',
        text: ['HAve another question?'],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          {
            val: 'No',
          },
          {
            val: 'yes',
            next: 'openq',
          },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'algolia',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'Algolia is a search engine that lets people find content in your application.',
          'Are you a developper?',
        ],
        avatar:
          'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
      },
      {
        type: 'STEP_CHOOSE',
        choices: [
          { val: 'Yes', next: 'algolia-developper' },
          { val: 'No, not really', next: 'algolia-business' },
        ],
      },
    ],
  },
  {
    type: 'SEQUENCE',
    objectID: 'algolia-developper',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'Cool. Algolia was built with passion by developer, for developer.',
          "It's a hosted API with open-source libraries that handle the heavy lifting of client-facing search.",
        ],
      },
      {
        type: 'STEP_CHOOSE',
        choices: [{ val: 'Got it' }],
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

// export default interactions;
