import algoliasearch from 'algoliasearch';
const client = algoliasearch('XNIYVXANUC', '323d115ab6d407b0863f693285cb58e0');
const index = client.initIndex('steps');

function getNextStep(stepID) {
  return index.getObject(stepID);
}

let id = 0;
const nextID = () => `${++id}`;

// const steps = [
//   {
//     type: 'question',
//     questions: ['Hello, what is your name?'],
//     variable: 'name',
//     answer: 'Glad to meet you {name}',
//   },
//   {
//     type: 'question',
//     questions: ['probably a lotta questions but...', 'how old are you?'],
//     variable: 'age',
//     answer: 'Ok {name}. good to know you are {age}',
//   },
//   {
//     type: 'choice',
//     questions: ['Are you more a coffee or a tea drinker?'],
//     variable: 'drink',
//     choices: [{ id: 1, val: 'Coffee' }, { id: 2, val: 'Tea' }],
//     answer: '{drink} is good, {name}.',
//   },
// ];

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
        avatar: this.avatar,
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
          avatar: this.avatar,
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
        avatar: this.avatar,
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
        avatar: this.avatar,
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
    this.currentStep = null;
  }
  nextStep() {
    let nextStepID;

    if (!this.currentStep) {
      nextStepID = 'name';
    } else {
      nextStepID = this.currentStep.next;
    }

    if (!nextStepID) {
      this.onStep(null);
      return;
    }

    getNextStep(nextStepID).then(step => {
      this.currentStep = step;
      this.onStep(this.createStep(step));
    });
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
