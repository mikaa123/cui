/* eslint-disable import/no-commonjs, no-console */
const algoliasearch = require('algoliasearch');
const client = algoliasearch('XNIYVXANUC', 'f815a050dcf99d35dc894bc0f97c50cd');
const index = client.initIndex('seo_steps');

const script = [
  {
    objectID: 'greetings',
    type: 'question',
    questions: [
      'Hello!',
      "I'm Mika, a bot that knows about SEO and Algolia.",
      'Before we dive in, what should I call you?',
    ],
    variable: 'name',
    avatar:
      'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
    next: 'seolevel',
  },
  {
    objectID: 'seolevel',
    type: 'choice',
    questions: [
      'Cool {name}.',
      'So tell me, are you already familiar with SEO? Or do you need a little refresher?',
    ],
    choices: [
      {
        val: 'I know the basics',
        next: 'basics',
      },
      {
        val: "I'm a noob",
        next: 'noob',
      },
    ],
    avatar:
      'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
  },
  {
    objectID: 'noob',
    type: 'choice',
    questions: [
      'SEO stands for Search Engine Optimization',
      "It's a set of practices that allow your content to rank higher on a search engine.",
    ],
    choices: [
      {
        val: 'Tell me more',
        next: 'noob2',
      },
    ],
    avatar:
      'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
  },
  {
    objectID: 'noob2',
    type: 'choice',
    questions: [
      'The purpose of a search engine like Google is to promote relevant content with a great user experience',
      'To do that, it analyses your website (it\'s called "crawling") and ranks it.',
      'This ranking is done with over 200 factors.',
      "So SEO is about making sure the important factors are taken into account to optimize the website's ranking.",
    ],
    // choices: [
    //   {
    //     val: 'Tell me more',
    //     next: 'noobs2',
    //   },
    // ],
    avatar:
      'https://pbs.twimg.com/profile_images/669557251120721921/3bya0idT_400x400.jpg',
  },
];

index
  .clearIndex()
  .then(() => index.addObjects(script))
  .then(res => {
    console.log('Updated', res);
  })
  .catch(console.log);
