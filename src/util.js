export const removeObjKey = (obj, removeKey) => {
  const newObj = Object.assign({}, obj);

  delete newObj[removeKey];

  return newObj;
}
