function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
  const savedState = localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : null;
}

export const persist = {
  save,
  load,
};
