function required(value, message) {
  if (value === undefined || value === null || value === '') {
    const error = new Error(message);
    error.status = 400;
    throw error;
  }
  return value;
}

function requiredPayload(payload, name = 'Payload') {
  return required(payload, `${name} is required`);
}

function requiredId(id, name = 'ID') {
  return required(id, `${name} is required`);
}

function ensureRepository(repository, name) {
  if (!repository) {
    throw new Error(`${name} has not been registered`);
  }
}

module.exports = {
  required,
  requiredPayload,
  requiredId,
  ensureRepository,
};
