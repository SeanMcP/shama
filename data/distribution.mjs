export function sumDistance(indexArray) {
  // Given [0,2,4], return 4
  let sum = 0;
  for (let i = 0; i < indexArray.length; i++) {
    if (!indexArray[i + 1]) break;
    const diff = indexArray[i + 1] - indexArray[i];
    sum += diff;
  }

  return sum;
}

export function distribution(indexArray, chapterWordCount) {
  const sum = sumDistance(indexArray);

  return (sum * indexArray.length) / Math.pow(chapterWordCount, 2);
}
