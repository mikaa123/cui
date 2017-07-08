import { Message } from '../Cui/src';
import algoliasearch from 'algoliasearch';
const client = algoliasearch('XNIYVXANUC', '323d115ab6d407b0863f693285cb58e0');
const index = client.initIndex('seo_steps');

function getName(name) {
  return index.getObject(name);
}

class ChooseStep {
  constructor(step, state, cmds, done) {
    if (!step.choices) {
      throw new Error('ChooseStep with no choices');
    }
    Object.assign(this, step, { state, cmds, done });
  }
  onValue(choice, ref) {
    if (this.variable) {
      this.user[this.variable] = choice;
    }
    if (!ref) {
      this.done(choice.branchOut);
      return;
    }
    getName(ref).then(interaction => {
      const cI = createChatInteraction(
        interaction,
        this.state,
        this.cmds,
        () => {
          if (!choice.fork && this.done) {
            this.done();
          }
        }
      );
      cI.process();
    });
  }
  process() {
    this.cmds.onStep(this);
    this.cmds.addMessage(
      new Message({
        type: 'choice',
        choices: this.choices,
      })
    );
  }
}

class RefStep {
  constructor(step, state, cmds, done) {
    if (!step.ref) {
      throw new Error('RefStep with no ref');
    }
    Object.assign(this, step, { state, cmds, done });
  }
  process() {
    getName(this.ref).then(interaction => {
      const cI = createChatInteraction(
        interaction,
        this.state,
        this.cmds,
        () => {
          if (this.done) {
            this.done();
          }
        }
      );
      cI.process();
    });
  }
}

class AskStep {
  constructor(step, state, cmds, done) {
    Object.assign(this, step, { state, cmds, done });
  }
  onValue(value, seq) {
    if (!seq) {
      return;
    }
    const cI = createChatInteraction(seq, this.state, this.cmds, () => {
      if (this.done) {
        this.done();
      }
    });
    cI.process();
  }
  process() {
    this.cmds.onStep(this);
  }
}

class AnswerStep {
  constructor(step, state, cmds, done) {
    if (!step.variable) {
      throw new Error('AnswerStep with no variable');
    }
    Object.assign(this, step, { state, cmds, done });
  }
  onValue(value) {
    this.state[this.variable] = value;
    this.done();
  }
  process() {
    this.cmds.onStep(this);
  }
}

class TellStep {
  constructor(step, state, cmds, done) {
    Object.assign(this, step, { state, cmds, done });
  }
  process() {
    this.cmds.onStep(this);
    this.cmds.addMessage(
      new Message({
        values: this.text.map(q =>
          q.replace(/{([\w]+)}?/g, (match, ...p) => this.state[p[0]])
        ),
        delay: this.delay,
        avatar: this.avatar,
        type: 'bot',
        doneCb: () => {
          this.done();
        },
      })
    );
  }
}

class Sequence {
  constructor(sequence, state, cmds, done) {
    this.interactions = sequence.interactions;
    this.state = state || {};
    this.cmds = cmds;
    this.done = done;
    this.currentIndex = 0;
  }
  nextInteraction = branchOut => {
    if (branchOut || this.currentIndex === this.interactions.length) {
      if (this.done) {
        this.done();
      }
      return;
    }
    const cI = createChatInteraction(
      this.interactions[this.currentIndex],
      this.state,
      this.cmds,
      this.nextInteraction
    );
    this.currentIndex++;
    cI.process();
  };
  process() {
    this.cmds.onStep(this);
    this.nextInteraction();
  }
}

function createChatInteraction(interaction, state, cmds, done) {
  let newInteraction;
  switch (interaction.type) {
    case 'SEQUENCE':
      newInteraction = new Sequence(interaction, state, cmds, done);
      break;

    case 'SEQUENCE_QUESTION':
      newInteraction = new Sequence(interaction, state, cmds, done);
      break;

    case 'STEP_REF':
      newInteraction = new RefStep(interaction, state, cmds, done);
      break;

    case 'STEP_TELL':
      newInteraction = new TellStep(interaction, state, cmds, done);
      break;

    case 'STEP_ANSWER':
      newInteraction = new AnswerStep(interaction, state, cmds, done);
      break;

    case 'STEP_CHOOSE':
      newInteraction = new ChooseStep(interaction, state, cmds, done);
      break;

    case 'STEP_ASK':
      newInteraction = new AskStep(interaction, state, cmds, done);
      break;

    default:
      throw new Error(`Unknown interaction type ${interaction.type}`);
  }
  return newInteraction;
}

export default createChatInteraction;
