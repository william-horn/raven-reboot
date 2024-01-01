

export function toSimpleArray(dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    const v = dataArray[i];
    dataArray[i] = v.toJSON();
    dataArray[i]._id = v._id.toJSON();
  }

  return dataArray;
}
