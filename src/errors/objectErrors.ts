class ObjectError {
  static objectNotFoundError = (param: string, id: string) => ({
    value: id,
    msg: "object id not found",
    param: param,
  });
}

export default ObjectError;
