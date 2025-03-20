import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/insertionSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort';
import { getHeapSortAnimations } from '../sortingAlgorithms/heapSort';
import { getSelectionSortAnimations } from '../sortingAlgorithms/selectionSort';
import { randomIntFromInterval } from '../helperFunctions';
import './SortingVisualizer.css';


const PRIMARY_COLOR='turquoise';
const SECONDARY_COLOR='red';

const algorithms={
    "mergeSort":getMergeSortAnimations,
    "insertionSort":getInsertionSortAnimations,
    "heapSort":getHeapSortAnimations,
    "selectionSort":getSelectionSortAnimations,
    "bubbleSort":getBubbleSortAnimations
}

export class SortingVisualizer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            array:[],
            NUMBER_OF_ARRAY_BARS:240,
            ANIMATION_SPEED_MS:2,
            width:2
        };
    }

    componentDidMount(){
        this.resetArray(this.state.NUMBER_OF_ARRAY_BARS);
    }

    resetArray(size){
        const array=[];
        for (let i=0; i<size; i++){
            array.push(randomIntFromInterval(5,550));
        }
        this.setState({array});
        let numWidth = Math.floor(window.innerWidth/(array.length*3));
        if (numWidth<2){
            numWidth=2
        }
        this.setState({width:numWidth})

        if (numWidth>15){
            this.setState({ANIMATION_SPEED_MS:30});
        }else if (numWidth>10){
            this.setState({ANIMATION_SPEED_MS:20});
        }else if (numWidth>3){
            this.setState({ANIMATION_SPEED_MS:10});
        }else{
            this.setState({ANIMATION_SPEED_MS:2});
        }

        this.restoreSortButtons();

    }



    disableSortButtons(){
        document.getElementById("test5").disabled = true;

        document.getElementById("generateNewArray").disabled=true;
        let buttonStyle=document.getElementById("generateNewArray").style;
        buttonStyle.cursor="default";
        buttonStyle.background="#000000";

        document.getElementById("mergeSort").disabled=true;
        buttonStyle=document.getElementById("mergeSort").style;
        buttonStyle.cursor="default";
        buttonStyle.background="#000000";

        document.getElementById("heapSort").disabled=true;
        buttonStyle=document.getElementById("heapSort").style;
        buttonStyle.cursor="default";
        buttonStyle.background="#000000";

        document.getElementById("insertionSort").disabled=true;
        buttonStyle=document.getElementById("insertionSort").style;
        buttonStyle.cursor="default";
        buttonStyle.background="#000000";

        document.getElementById("selectionSort").disabled=true;
        buttonStyle=document.getElementById("selectionSort").style;
        buttonStyle.cursor="default";
        buttonStyle.background="#000000";

        document.getElementById("bubbleSort").disabled=true;
        buttonStyle=document.getElementById("bubbleSort").style;
        buttonStyle.cursor="default";
        buttonStyle.background="#000000";


    }

    restoreSortButtons(){
        document.getElementById("test5").disabled = false;

        document.getElementById("generateNewArray").disabled=false;
        let buttonStyle=document.getElementById("generateNewArray").style;
        buttonStyle.cursor="pointer";
        buttonStyle.background="#1abc9c";

        document.getElementById("mergeSort").disabled=false;
        buttonStyle=document.getElementById("mergeSort").style;
        buttonStyle.cursor="pointer";
        buttonStyle.background="#1abc9c";

        document.getElementById("heapSort").disabled=false;
        buttonStyle=document.getElementById("heapSort").style;
        buttonStyle.cursor="pointer";
        buttonStyle.background="#1abc9c";

        document.getElementById("insertionSort").disabled=false;
        buttonStyle=document.getElementById("insertionSort").style;
        buttonStyle.cursor="pointer";
        buttonStyle.background="#1abc9c";

        document.getElementById("selectionSort").disabled=false;
        buttonStyle=document.getElementById("selectionSort").style;
        buttonStyle.cursor="pointer";
        buttonStyle.background="#1abc9c";

        document.getElementById("bubbleSort").disabled=false;
        buttonStyle=document.getElementById("bubbleSort").style;
        buttonStyle.cursor="pointer";
        buttonStyle.background="#1abc9c";


    }


    sort(algorithmName){
        this.disableSortButtons();
        const [animations, ]=algorithms[algorithmName](this.state.array);
        
        for (let i=0;i<animations.length;i++){
            const isColorChange=animations[i][0]==="comparison1"||animations[i][0]==="comparison2";
            const arrayBars=document.getElementsByClassName('array-bar');
            if(isColorChange===true){
                const [, barOneIndex, barTwoIndex]=animations[i];
                const color=(animations[i][0]==="comparison1")?SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle=arrayBars[barOneIndex].style;
                const barTwoStyle=arrayBars[barTwoIndex].style;
                
                setTimeout(()=>{
                    barOneStyle.backgroundColor=color;
                    barTwoStyle.backgroundColor=color;

                }, i*this.state.ANIMATION_SPEED_MS);

            }
            else{
                
                setTimeout(()=>{  
                    const [, barOneIndex, newHeight]=animations[i];
                    const barOneStyle=arrayBars[barOneIndex].style;
                    barOneStyle.height=`${newHeight}px`;
                }, i*this.state.ANIMATION_SPEED_MS);
            }
        }
        setTimeout(()=> this.restoreSortButtons(), (animations.length-1)*this.state.ANIMATION_SPEED_MS);
    }



    render(){
    const {array}=this.state;

    return (     
    <>
    <nav className="navbar">
    <p className='range-field' style={{display:'inline-block', width:'25%', marginRight:'20px'}}>
        <label style={{marginRight:'10px'}}>Array Size: </label>
        <input 
        value={this.state.NUMBER_OF_ARRAY_BARS}
        type="range" 
        id="test5" 
        min="10" 
        max="275" 
        style={{ width: '75%' }}
        onChange={(e)=>{this.setState({NUMBER_OF_ARRAY_BARS:e.target.value}); 
        this.resetArray(e.target.value);
        }} 
        />
    </p>


    <button className="custombtn second" id="generateNewArray" style={{ marginRight: '8px' }} onClick={() => this.resetArray(this.state.NUMBER_OF_ARRAY_BARS)}>Generate New Array</button>
    <button className="custombtn second" id="mergeSort" style={{ marginRight: '8px' }} onClick={() => this.sort('mergeSort')}>Merge Sort</button>
    <button className="custombtn second" id="heapSort" style={{ marginRight: '8px' }} onClick={() => this.sort('heapSort')}>Heap Sort</button>
    <button className="custombtn second" id="bubbleSort" style={{ marginRight: '8px' }} onClick={() => this.sort('bubbleSort')}>Bubble Sort</button>
    <button className="custombtn second" id="insertionSort" style={{ marginRight: '8px' }} onClick={() => this.sort('insertionSort')}>Insertion Sort</button>        
    <button className="custombtn second" id="selectionSort" style={{ marginRight: '20px' }} onClick={() => this.sort('selectionSort')}>Selection Sort</button>

    </nav>
    <br /><br /><br /><br />

    <div className="array-wrapper">
  <div className="array-container">
    {array.map((value, idx) => (
      <div 
        className="array-bar" 
        key={idx} 
        style={{
          height: `${value}px`,
          backgroundColor: PRIMARY_COLOR,
          width: `${this.state.width}px`
        }}>
      </div>    
    ))}
  </div>
  </div>


    </>
    
    );

    }
}


export default SortingVisualizer;