import { arraysAreEqual, swap} from '../helperFunctions';

const selectionSort=(mainArray, animations)=>{
    const N=mainArray.length;

    for (let i=0;i<N;i++){
        let minIndex=i;
        for (let j=i+1;j<N;j++){
            animations.push(["comparison1", j, minIndex]);
            animations.push(["comparison2", j, minIndex]);

            if (mainArray[j]<mainArray[minIndex]){
                minIndex=j;
            }
        }
        animations.push(["swap", minIndex, mainArray[i]]);
        animations.push(["swap", i, mainArray[minIndex]]);

        swap(mainArray, minIndex, i);
    }
}

export const getSelectionSortAnimations=(array)=>{
    let animations=[];
    selectionSort(array, animations);
    const javaScriptSortedArray=array.slice().sort((a, b)=>a-b);
    console.log(arraysAreEqual(javaScriptSortedArray, array));
    return [animations, array];
}