import { arraysAreEqual, swap } from '../helperFunctions';


const bubbleSort=(mainArray, animations)=>{
    const N=mainArray.length;

    for(let j=0; j<N; ++j){
        let flag=false;
        for (let i=0; i<N-1;++i){
            animations.push(["comparison1", i, i+1]);
            animations.push(["comparison2", i, i+1]);
        
        if(mainArray[i]>mainArray[i+1]){
            flag=true;
            animations.push(["swap", i, mainArray[i+1]]);
            animations.push(["swap", i+1, mainArray[i]]);
            swap(mainArray,i,i+1);
        }
    }
    if(flag===false) break;
    }
}

export const getBubbleSortAnimations=(array)=>{
    let animations=[];
    bubbleSort(array, animations);
    const javaScriptSortedArray=array.slice().sort((a, b)=>a-b);
    console.log(arraysAreEqual(javaScriptSortedArray, array));
    return [animations, array];
}