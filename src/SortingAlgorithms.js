export const bubbleSort = (array) => {
  const steps = [];
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
        steps.push({ array: [...array], swap: true });
      } else {
        steps.push({ array: [...array], swap: false });
      }
    }
  } while (swapped);
  return steps;
};

export const selectionSort = (array) => {
  const steps = [];
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
      steps.push({ array: [...array], swap: false });
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      steps.push({ array: [...array], swap: true });
    }
  }
  return steps;
};

export const insertionSort = (array) => {
  const steps = [];
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      steps.push({ array: [...array], swap: true });
    }
    array[j + 1] = key;
    steps.push({ array: [...array], swap: false });
  }
  return steps;
};
