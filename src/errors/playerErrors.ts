class PlayerError {
  static playerNotFoundError = (param: string, id: string) => ({
    value: id,
    msg: "Player Id not found",
    param: param,
  });

  static playerObjectNotFoundError = (
    playerName: string,
    objectId: string
  ) => ({
    value: objectId,
    msg: `${playerName} hasn't got object ${objectId} on his bag`,
    param: "objectId",
  });
}

export default PlayerError;
