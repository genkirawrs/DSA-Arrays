require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const mem = require('./memory')
const app = express()


// Exercise 5
/*
function URLifyString(string){
    let formattedString = '';
    if(string.length > 0){
	for( let i = 0; i < string.length; i++){
	    if(string[i] === ' '){
		formattedString = formattedString + '%20';
	    }else{
		formattedString = formattedString + string[i];
	    }
	}
	return formattedString;
    }else{
	return string;
    }
}

let string_to_urlify = 'tauhida parveen';
console.log(URLifyString(string_to_urlify));

string_to_urlify = 'www.thinkful.com /tauh ida parv een';
console.log(URLifyString(string_to_urlify));
*/

/*
// Exercise 6
//assuming a sorted list of numbers

function filterNumbers(numbers){
	if( numbers.length < 1 || numbers[0] >= 5){
		return 0;
	}

	let startIndex = 0;
	let lastIndex = numbers.length

	while( lastIndex > startIndex){
	    let midIndex = Math.floor((lastIndex + startIndex) / 2);
	    if(numbers[midIndex] >= 5){
		lastIndex = midIndex;
	    }else if(numbers[midIndex + 1] < 5){
		startIndex = midIndex;
	    }else{
		numbers.splice(0,lastIndex);
		return numbers;
	    }
	}
}


let numbers = [1,3,4,5,6,7,8,9];
console.log(filterNumbers(numbers));
*/

/*
//Exercise 7

function maxSum(numbers){
    let max = 0;
    let newMax = 0;

    for(let i = 0; i < numbers.length; i++){
	newMax = Math.max(0, newMax + numbers[i]);
	max = Math.max(max, newMax);
    }
    
    return max;
}


//let numbers = [4, 6, -3, 5, -2, 1];
let numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSum(numbers));
*/



//Exercise 8
/*
function mergeArray(arr1, arr2){
    let arr3 = [];
    let mergedTotal = arr1.length + arr2.length;
    let toAdd = 0;
    
    while( mergedTotal > 0 ){
	if( (arr1[0] < arr2[0]) || (arr2.length === 0 && arr1.length > 0) ){
	    arr3.push(arr1.shift());
	    mergedTotal--;
	}else if( (arr2[0] < arr1[0]) || (arr1.length === 0 && arr2.length > 0) ){
	    arr3.push(arr2.shift());
	    mergedTotal--;
	}else if( arr1[0] === arr2[0] ){
	    arr3.push(arr1.shift());
	    arr3.push(arr2.shift());
	    mergedTotal-=2;
	}
    }

    console.log(arr3);
}

mergeArray([1, 3, 6, 8, 11],[2, 3, 5, 8, 9, 10]);

*/


//Exercise 9
/*
function removeChars(string, toRemove){
    let newString = "";

    for(let i = 0; i < string.length; i++){
	if( toRemove.indexOf(string[i]) === -1){
	    newString += string[i];
	}
    }

    console.log(newString);
}

removeChars('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou');

*/


//Exercise 10
/*
function products(numbers){
    let productList = [];
    let blah = numbers;
 
	for(let i = 0; i < numbers.length; i++){
	    let toAdd = 1;
	    for(let j = 0; j < numbers.length; j++){
		if(j === i){
		    toAdd = toAdd * 1;
		}else{
		    toAdd = toAdd * numbers[j];
		}
	    }
	    productList.push(toAdd);
	}

    console.log(productList);
}

products([1, 3, 9, 4]);

*/



//Exercise 11
/*
function convertGrid(grid){
    let tmpGrid = grid;
    let newGrid = [];
    let finalGrid = [];
    let indexes = [];
    
    tmpGrid.forEach(row => {
	if( row.indexOf(0) > -1 ){
	    let newRow = [];
	    row.forEach((col,index)=> {
		newRow.push(0);
		if(col === 0){
		    indexes.push(index);
		}
	    });
	    newGrid.push(newRow);
	}else{
	    newGrid.push(row);
	}
    });

    newGrid.forEach(row => {
	indexes.forEach( i => {
	    row[i] = 0;
	});
	finalGrid.push(row);
    });

console.log(finalGrid);

}

let grid = [[1,0,1,1,0],[0,1,1,1,0],[1,1,1,1,1],[1,0,1,1,1],[1,1,1,1,1]];

convertGrid(grid);

*/


//Exercise 12

function stringRotation(str1, str2, rotateLen){
    let toMove = str1.substring(0,2);
    let toCompare = str1.substr(2)+toMove;

    if( toCompare === str2 ){
	return true;
    }else{
	return false;
    } 
}

console.log(stringRotation('amazon','azonma',2));
console.log(stringRotation('amazon','azonam',2));





const memory = new mem();

class Array {
    constructor() {
        this.length = 0;//store the current length of the array
        this._capacity = 0;//stores the current max number of elements array can store
        this.ptr = memory.allocate(this.length);//set up pointer to point to the block of memory
    }

    push(value) {
	//if current length of array is at max capacity, triple the size
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value);//use memory class to store value at given position
        this.length++;//update length
    }

    _resize(size) {
        const oldPtr = this.ptr;//store old pointer value
        this.ptr = memory.allocate(size);//increase array size by creating a new array of a larger size
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);//copy over data
        memory.free(oldPtr);//delete old block from memory
        this._capacity = size;//update capacity value to new size
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
	    //if there's no more space, resize
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}
Array.SIZE_RATIO = 3;

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
console.log('=== starting push drill ===');
    arr.push(3);
console.log(arr);
    arr.push(5);
console.log(arr);
    arr.push(15);
console.log(arr);
    arr.push(19);
console.log(arr);
    arr.push(45);
console.log(arr);
    arr.push(10);
console.log(arr);

console.log('=== starting pop drill ===');
    arr.pop();
console.log(arr);
    arr.pop();
console.log(arr);
    arr.pop();
console.log(arr);


console.log('=== print first item in array ===');
let firstEntry = arr.get(0);
console.log(firstEntry);

console.log('=== empty array & add 1 item ===');
while(arr.length >= 1){
console.log(arr.length);
arr.remove(0);
}
console.log(arr);

arr.push('tauhida');
console.log(arr);
console.log('=== print out new item ===');
firstEntry = arr.get(0);
console.log(firstEntry);
}

//main();



const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
   res.send('Hello, boilerplate!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app
