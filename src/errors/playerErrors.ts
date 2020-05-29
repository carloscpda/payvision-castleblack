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

  static playerPickUpUsedObjectError = (objectId: string) => ({
    value: objectId,
    msg: `object ${objectId} is already in use`,
    param: "objectId",
  });

  static playerDisarmedError = (playerName: string) => ({
    msg: `${playerName} is not armed`,
    param: "id",
  });

  static playerAliveError = (playerName: string) => ({
    msg: `${playerName} is alive`,
    param: "id",
  });
}

export default PlayerError;
