let id = 0;
const nextID = () => `${++id}`;

const steps = [
  {
    type: 'question',
    questions: ['Hello, what is your name?'],
    variable: 'name',
    answer: 'Glad to meet you {name}',
  },
  {
    type: 'question',
    questions: ['probably a lotta questions but...', 'how old are you?'],
    variable: 'age',
    answer: 'Ok {name}. good to know you are {age}',
  },
  {
    type: 'choice',
    questions: ['Are you more a coffee or a tea drinker?'],
    variable: 'drink',
    choices: [{ id: 1, val: 'Coffee' }, { id: 2, val: 'Tea' }],
    answer: '{drink} is good, {name}.',
  },
];

class ChoiceScript {
  constructor(step, addMsgs, user, next) {
    Object.assign(this, step, { addMsgs, user, next });
  }
  onChoice(value) {
    this.user[this.variable] = value;
    this.addMsgs([
      {
        id: nextID(),
        value: this.answer.replace(
          /{([\w]+)}?/g,
          (match, ...p) => this.user[p[0]]
        ),
        type: 'bot',
      },
    ]);
    this.next();
  }
  process() {
    this.addMsgs(
      this.questions
        .map(q => ({
          id: nextID(),
          value: q,
          type: 'bot',
        }))
        .concat({
          type: 'choice',
          choices: this.choices,
        })
    );
  }
}

class QuestionScript {
  constructor(step, addMsgs, user, next) {
    Object.assign(this, step, { addMsgs, user, next });
  }
  onText(value) {
    this.user[this.variable] = value;
    this.addMsgs([
      {
        id: nextID(),
        value: this.answer.replace(
          /{([\w]+)}?/g,
          (match, ...p) => this.user[p[0]]
        ),
        type: 'bot',
      },
    ]);
    this.next();
  }
  process() {
    this.addMsgs(
      this.questions.map(q => ({
        id: nextID(),
        value: q,
        type: 'bot',
      }))
    );
  }
}

class ScriptManager {
  constructor(addMsgs, onStep) {
    this.addMsgs = addMsgs;
    this.onStep = onStep;
    this.user = {};
  }
  nextStep() {
    const step = steps.shift();
    if (step) {
      step.id = nextID();
      this.onStep(this.createStep(step));
    } else {
      this.onStep(null);
    }
  }
  createStep(step) {
    if (step.type === 'question') {
      return new QuestionScript(step, this.addMsgs, this.user, () =>
        this.nextStep()
      );
    } else if (step.type === 'choice') {
      return new ChoiceScript(step, this.addMsgs, this.user, () =>
        this.nextStep()
      );
    }
    return null;
  }
}

export default ScriptManager;
