const HandleHttp = (res, error) => {
  res.status(error.status).json({ msg: error.msg });
};

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export { HandleHttp, ValidationError };
