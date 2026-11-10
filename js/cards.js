export function getCardStatus(state, level, french) {
  return state.cards[`${level}::${french}`] || {
    box: 0,
    due: 0
  };
}

export function isDue(state, level, french) {
  const card = getCardStatus(state, level, french);
  return card.due <= Date.now();
}

export function reviewCard(state, level, french, result) {
  const key = `${level}::${french}`;
  const previous = getCardStatus(state, level, french);

  const intervals = [1, 3, 7, 16, 30];
  let box = previous.box || 0;
  let days = 1;

  if (result === "again") {
    box = 0;
    days = 0;
  } else if (result === "hard") {
    days = 1;
  } else if (result === "good") {
    box = Math.min(box + 1, intervals.length - 1);
    days = intervals[box];
  } else if (result === "easy") {
    box = Math.min(box + 2, intervals.length - 1);
    days = intervals[box];
  }

  state.cards[key] = {
    box,
    due: Date.now() + days * 24 * 60 * 60 * 1000
  };
}