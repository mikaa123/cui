import algoliasearch from 'algoliasearch';
const client = algoliasearch('XNIYVXANUC', '323d115ab6d407b0863f693285cb58e0');
const index = client.initIndex('steps');

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
    // this.addMsgs([
    //   {
    //     id: nextID(),
    //     values: [
    //       this.answer.replace(/{([\w]+)}?/g, (match, ...p) => this.user[p[0]]),
    //     ],
    //     avatar: this.avatar,
    //     type: 'bot',
    //   },
    // ]);
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
      {
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
    // this.addMsgs([
    //   {
    //     id: nextID(),
    //     values: [
    //       this.answer.replace(/{([\w]+)}?/g, (match, ...p) => this.user[p[0]]),
    //     ],
    //     avatar: this.avatar,
    //     type: 'bot',
    //   },
    // ]);
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
