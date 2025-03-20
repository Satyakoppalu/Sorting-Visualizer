import { arraysAreEqual } from '../helperFunctions';

const Merge=(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations)=>{
    let k=startIdx;
    let i=startIdx;
    let j=middleIdx+1;

    while (i<=middleIdx && j<=endIdx){
        animations.push(["comparison1", i, j]);
        animations.push(["comparison2", i, j]);

        if (auxiliaryArray[i]<=auxiliaryArray[j]){
            animations.push(["overwrite", k, auxiliaryArray[i]]);
            mainArray[k++]=auxiliaryArray[i++];
        }
        else{
            animations.push(["overwrite", k, auxiliaryArray[j]]);
            mainArray[k++]=auxiliaryArray[j++];
        }
    }

    while (i<=middleIdx){
        animations.push(["comparison1", i, i]);
        animations.push(["comparison2", i, i]);
        animations.push(["overwrite", k, auxiliaryArray[i]]);
        mainArray[k++]=auxiliaryArray[i++];
    }
    while (j<=endIdx){
        animations.push(["comparison1", j, j]);
        animations.push(["comparison2", j, j]);
        animations.push(["overwrite", k, auxiliaryArray[j]]);
        mainArray[k++]=auxiliaryArray[j++];
    }
}


const mergeSort=(mainArray, startIdx, endIdx, auxiliaryArray, animations)=>{
    if(startIdx===endIdx)return;
    const middleIdx=Math.floor((startIdx+endIdx)/2);
    mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSort(auxiliaryArray, middleIdx+1, endIdx, mainArray, animations);
    Merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

export const getMergeSortAnimations=(array)=>{
    let animations=[];
    if (array.length<=1) return array;
    const auxiliaryArray=array.slice();
    mergeSort(array, 0, array.length-1, auxiliaryArray, animations);
    const javaScriptSortedArray=array.slice().sort((a, b)=>a-b);
    console.log(arraysAreEqual(javaScriptSortedArray, array));
    return [animations, array];
}