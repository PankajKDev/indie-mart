const asyncHandler = (requestHandler) => {
  // higher order function
  //returns request handler wrapped in a promise to
  //catch any errors
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export { asyncHandler };
