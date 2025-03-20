export const arraysAreEqual=(arrayOne, arrayTwo)=>{
    if (arrayOne.length!==arrayTwo.length) return false;
    for (let i=0; i<arrayOne.length; i++){
        if (arrayOne[i]!==arrayTwo[i]){
            return false;
        }
    }
    return true;
}

export const randomIntFromInterval=(min, max)=>{
    return Math.floor(Math.random()*(max-min+1)+min);
}

export const swap=(auxillaryArray, firstIndex, secondIndex)=>{
    let temp=auxillaryArray[firstIndex];
    auxillaryArray[firstIndex]=auxillaryArray[secondIndex];
    auxillaryArray[secondIndex]=temp;
}