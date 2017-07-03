import algoliasearch from 'algoliasearch';
const client = algoliasearch('XNIYVXANUC', '323d115ab6d407b0863f693285cb58e0');
const index = client.initIndex('seo_steps');

function getNextStep(stepID) {
  return index.getObject(stepID);
}

let id = 0;
const nextID = () => `${++id}`;

class OpenQuestionScript {
  constructor(step, addMsgs, user, next) {
    Object.assign(this, step, { addMsgs, user, next });
  }

  process() {
    this.addMsgs([
      {
        id: nextID(),
        values: this.answers.map(q =>
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

class AskOpenQuestionScript {
  constructor(step, addMsgs, user, next) {
    Object.assign(this, step, { addMsgs, user, next });
    this.ask = true;
  }
  onValue(value, next) {
    this.next(next);
  }
  process() {}
}

class ChoiceScript {
  constructor(step, addMsgs, user, next) {
    Object.assign(this, step, { addMsgs, user, next });
  }
  onValue(value, next) {
    this.user[this.variable] = value;
    this.next(next);
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
  onValue(value) {
    this.user[this.variable] = value;
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
    const nextStepID = next || this.currentStep.next;
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
    } else if (step.type === 'askOpenQuestion') {
      return new AskOpenQuestionScript(step, this.addMsgs, this.user, next =>
        this.nextStep(next)
      );
    } else if (step.type === 'openQuestion') {
      return new OpenQuestionScript(step, this.addMsgs, this.user, next =>
        this.nextStep(next)
      );
    }
    return null;
  }
}

export default ScriptManager;
