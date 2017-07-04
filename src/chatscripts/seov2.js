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
            // next: 'basics',
            // fork: true,
          },
          {
            val: 'Why an experiment?',
            next: 'experiment',
            // fork: true,
          },
          {
            val: 'Wait, what is Algolia?',
            // next: 'openq',
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
        ],
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
];

index
  .clearIndex()
  .then(() => index.addObjects([...interactions, ...questions]))
  .then(res => {
    console.log('Updated', res);
  })
  .catch(console.log);

// export default interactions;
