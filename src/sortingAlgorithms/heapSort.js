import { arraysAreEqual, swap } from "../helperFunctions";

const heapify=(mainArray, N, i, animations)=>{
    let largest=i
    const l=2*i+1
    const r=2*i+2

    if (l<N && mainArray[i]<mainArray[l]){
        animations.push(["comparison1", i, l]);
        animations.push(["comparison2", i, l]);
        largest=l
    }
    if (r<N && mainArray[largest]<mainArray[r]){
        animations.push(["comparison1", r, largest]);
        animations.push(["comparison2", r, largest]);
        largest=r
    }

    if (largest!==i){
        animations.push(["swap", i, mainArray[largest]]);
        animations.push(["swap", largest, mainArray[i]]);
        swap(mainArray, i, largest)

        heapify(mainArray, N, largest, animations)
    }

}

const heapSort=(mainArray, animations)=>{
    const N=mainArray.length;

    for (let i=Math.floor(N/2)-1;i>-1;--i){
        heapify(mainArray, N, i, animations);
    }

    for (let i=N-1; i>0;--i){
        animations.push(["swap", i, mainArray[0]]);
        animations.push(["swap",0, mainArray[i]]);
        swap(mainArray, i, 0);
        heapify(mainArray, i, 0, animations);
    }
}

export const getHeapSortAnimations=(array)=>{
    let animations=[];
    heapSort(array, animations);
    const javaScriptSortedArray=array.slice().sort((a, b)=>a-b);
    console.log(arraysAreEqual(javaScriptSortedArray, array));
    return [animations, array];
}
