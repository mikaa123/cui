let id = 0;
const nextID = () => `${++id}`;

class TellStep {
  constructor(step, state, cmds) {
    Object.assign(this, step, { state, cmds });
  }
  process() {
    this.cmds.addMsg({
      id: nextID(),
      values: this.text.map(q =>
        q.replace(/{([\w]+)}?/g, (match, ...p) => this.state.user[p[0]])
      ),
      avatar: this.avatar,
      type: 'bot',
    });
  }
}

class Sequence {
  constructor(interactions, state, cmds) {
    this.interactions = interactions;
    this.state = {};
    this.cmds = cmds;
  }
  process() {
    this.interactions.forEach(i => {
      const cI = createChatInteraction(i, this.state, this.cmds);
      cI.process();
    });

    // Handle next
  }
}

function createChatInteraction(interaction, state, cmds) {
  let newInteraction;
  switch (interaction.type) {
    case 'SEQUENCE':
      newInteraction = new Sequence(interaction, state, cmds);
      break;

    case 'STEP_TELL':
      newInteraction = new TellStep(interaction, state, cmds);
      break;

    default:
      throw new Error(`Unknown interaction type ${interaction.type}`);
  }
  return newInteraction;
}

export default createChatInteraction;
