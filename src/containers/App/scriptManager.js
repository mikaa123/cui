import algoliasearch from 'algoliasearch';
const client = algoliasearch('XNIYVXANUC', '323d115ab6d407b0863f693285cb58e0');
const index = client.initIndex('seo_steps');

function getNextStep(stepID) {
  return index.getObject(stepID);
}

let id = 0;
const nextID = () => `${++id}`;

class ChoiceScript {
  constructor(step, addMsgs, user, next) {
    Object.assign(this, step, { addMsgs, user, next });
  }
  onChoice(values) {
    this.user[this.variable] = values[0];
    const c = this.choices.find(f => f.val === values[0]);
    this.next(c.next);
  }
  process() {
    this.addMsgs([
      {
        id: nextID(),
        values: this.questions.map(q =>
          q.replace(/{([\w]+)}?/g, (match, ...p) => this.user[p[0]])
        ),
        avatar: this.avatar,
        type: 'bot',
      },
      {
        id: nextID(),
        type: 'choice',
        choices: this.choices,
      },
    ]);
  }
}

class QuestionScript {
  constructor(step, addMsgs, user, next) {
    Object.assign(this, step, { addMsgs, user, next });
  }
  onText(values) {
    this.user[this.variable] = values[0];
    this.next();
  }
  process() {
    this.addMsgs([
      {
        id: nextID(),
        values: this.questions.map(q =>
          q.replace(/{([\w]+)}?/g, (match, ...p) => this.user[p[0]])
        ),
        avatar: this.avatar,
        type: 'bot',
      },
    ]);
  }
}

class ScriptManager {
  constructor(addMsgs, onStep) {
    this.addMsgs = addMsgs;
    this.onStep = onStep;
    this.user = {};
    this.currentStep = null;
  }
  nextStep(next) {
    let nextStepID;

    if (!this.currentStep) {
      nextStepID = 'greetings';
    } else {
      nextStepID = next || this.currentStep.next;
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
      return new ChoiceScript(step, this.addMsgs, this.user, next =>
        this.nextStep(next)
      );
    } else if (step.type === 'fork') {
      return new ForkScript(step, this.addMsgs, this.user, next =>
        this.nextStep(next)
      );
    }
    return null;
  }
}

export default ScriptManager;
