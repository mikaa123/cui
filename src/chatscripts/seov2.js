const interactions = [
  {
    type: 'SEQUENCE',
    interactions: [
      {
        type: 'STEP_TELL',
        text: [
          'Hello!',
          "I'm Mika, a bot that knows about SEO and Algolia.",
          'Before we dive in, what should I call you?',
        ],
      },
      {
        type: 'STEP_ASK',
        variable: 'name',
      },
      {
        type: 'STEP_TELL',
        text: ['Nice to meet you, {name}.'],
      },
    ],
  },
];

export default interactions;
