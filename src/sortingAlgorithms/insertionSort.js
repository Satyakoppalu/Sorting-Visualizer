import { arraysAreEqual } from '../helperFunctions';

const insertionSort=(mainArray, animations)=>{
    const N=mainArray.length;
    for (let i=1; i<N;i++){
        let key =mainArray[i];
        let j=i-1;
        animations.push(["comparison1", j, i]);
        animations.push(["comparison2", i, j]);
        while(j>=0 && mainArray[j]>key){
            animations.push(["overwrite", j+1, mainArray[j]]);
            mainArray[j+1]=mainArray[j];
            j=j-1;
            if (j>=0){
                animations.push(["comparison1", j, i]);
                animations.push(["comparison2", j, i]);
            }

        }
        animations.push(["overwrite", j+1, key]);
        mainArray[j+1]=key;
    }
}


export const getInsertionSortAnimations=(array)=>{
    let animations=[];
    insertionSort(array, animations);
    const javaScriptSortedArray=array.slice().sort((a, b)=>a-b);
    console.log(arraysAreEqual(javaScriptSortedArray, array));
    return [animations, array];
}


