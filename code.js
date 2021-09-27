/*
Challenge Requirements
There are three challenge levels that you can choose to implement. No matter which level you choose, these two items are required:
    For each array function you implement, write at least two unit tests to verify that they are working correctly.
    When your project is finished, complete the Reflection section in the README.md file before you submit the challenge for grading.
Basic Challenge:
Implement new versions of these three array functions:
    includes()
    concat()
    join()

Make sure that your new functions return the same datatypes as the built-in Array methods. includes() returns a boolean, concat() returns a new array (and make sure not to modify the original arrays!), and join() returns a string.
*/
// Your Code Here.
let pets = ['dog', 'cat', 'parrot'];
let exotic = ['ferret', 'iguana', 'snake'];

function newIncludes(arr, val, spot = 0) {
	for (let i = spot; i < arr.length; i++) {
		if (arr[i] === val) {
			return true;
		}
	}
	return false;
}
console.assert(
	newIncludes(['dog', 'cat', 'fish'], 'cat') === true,
	'Function Sucks'
);
console.assert(
	newIncludes(['fish', 'turtle', 'dinosaur'], 'cat') === false,
	'Function Sucks'
);

/*  The concat method creates a new array consisting of the elements in the object on which it is called, followed in order by, for each argument, the elements of that argument (if the argument is an array) or the argument itself (if the argument is not an array). It does not recurse into nested array arguments.

The concat method does not alter this or any of the arrays provided as arguments but instead returns a shallow copy that contains copies of the same elements combined from the original arrays. Elements of the original arrays are copied into the new array as follows:
*/

function newConcat(val1, ...restParam) {
	// this returns a new array
	let newArray = [...val1];
	console.log(restParam);
	for (let i = 0; i < restParam.length; i++) {
		if (Array.isArray(restParam[i])) {
			newArray = [...newArray, ...restParam[i]];
		} else {
			newArray = [...newArray, restParam[i]];
		}
	}
	return newArray;
}
console.assert(
	newConcat(['ferret', 'fish', 'snake'], 'ferret').length === 4,
	'Function Sucks'
);
console.assert(
	newConcat(['ferret', 'cat', 'snake', 'bat'], 'cat').length === 5,
	'Function Sucks'
);

// what does this method does
// returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string

// what params does it take to
// Specifies a string to separate each pair of adjacent elements of the array. The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma (","). If separator is an empty string, all elements are joined without any characters in between them.

// what does it return
// A string with all array elements joined. If arr.length is 0, the empty string is returned.

function newJoin(val1, splitter = ',') {
	let string = '';
	for (let i = 0; i < val1.length; i++) {
		if (i === val1.length - 1) {
			string += val1[i];
		} else {
			string += val1[i] + splitter;
		}
	}
	return string;
}
let tester = newJoin(pets);
console.assert(tester === pets.join());
console.assert(newJoin(pets, '-') === pets.join('-'));

////////////////////////////////////////////////////////////////////////////////
/*Intermediate Challenge:

    all of the functions in the Basic challenge
    some()
    findIndex()
    map()
    filter()

These methods all take callback functions as a parameter, and your implementations must do the same.
*/

// What is some method?
//tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.

// What parameter does it take if it takes any?
// callbackFn: A function to test for each element, taking three arguments:
// Element: The current element being processed in the array.

// What does the some method return?
// This method is a boolean that either returns true or false

function newSome(val1, callback) {
	for (let i = 0; i < val1.length; i++) {
		if (callback(val1[i], i, val1)) {
			return true;
		}
	}
	return false;
}

let even = (element) => element % 2 == 0;
let inspectSome = newSome([1, 2, 3, 4, 5, 6], even);
console.assert(inspectSome === true);
console.assert(newSome([1, 3, 5], even) === false);

// The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.

// Parameters: callbackFn - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found. It takes three arguments: element - The current element being processed in the array.

let isLargeNumber = (element) => element > 13;
let isSmallNumber = (element) => element < 13;

function newFindIndex(val1, callback) {
	for (i = 0; i < val1.length; i++) {
		if (callback(val1[i], i, val1)) {
			return i;
		}
	}
	return -1;
}
let indexTest = newFindIndex([15, 12, 3, 4, 52, 6], isLargeNumber);
console.assert(indexTest === 0);
console.assert(newFindIndex([1, 2, 3, 4, 5, 6], isSmallNumber) === 0);

let map1 = (element) => element * 2;
function newMap(val1, callback) {
	let newArray = [];
	for (i = 0; i < val1.length; i++) {
		newArray.push(callback(val1[i], i, val1));
	}
	return newArray;
}

let testMap = newMap([1, 2, 3, 4, 5, 6], map1);
console.assert(
	JSON.stringify(testMap) === JSON.stringify([2, 4, 6, 8, 10, 12])
);
console.assert(
	JSON.stringify(newMap([5, 6, 3], map1)) === JSON.stringify([10, 12, 6])
);

let filter1 = (element) => element % 2 === 0;
function newFilter(val1, callback) {
	let newArray = [];
	for (i = 0; i < val1.length; i++) {
		if (callback(val1[i], i, val1) === true) {
			newArray.push(val1[i]);
		}
	}
	return newArray;
}
let testFilter = newFilter([1, 2, 3, 4, 5, 6], filter1);
console.assert(3 === testFilter.length);
console.assert(1 === newFilter([1, 3, 5, 6], filter1).length);

////////////////////////////////////////////////////////////////////////////////
// Advance Challenge:
// Nathan Holt assisted
// Flat challenge:
function* newFlat(array, depth) {
	if (depth === undefined) {
		depth = 1;
	}

	for (const item of array) {
		if (Array.isArray(item) && depth > 0) {
			yield* newFlat(item, depth - 1);
		} else {
			yield item;
		}
	}
}

const arr = [1, 2, [3, 4, [5, 6]]];
const flattened = [...newFlat(arr)];
const flatMethod = [...newFlat(arr, 3)];
console.log(flattened);
console.assert(flattened.length === 5);
console.assert(flatMethod.length === 6);

let reducer = (a, b) => a + b;
function newReduce(val1, callback, accumulator) {
	let newVal = val1[0];
	if (accumulator) {
		newVal = accumulator;
	}
	for (i = accumulator ? 0 : 1; i < val1.length; i++) {
		newVal = callback(newVal, val1[i]);
	}
	return newVal;
}
let sum = newReduce([1, 2, 3], reducer);
console.assert(sum === 6);
console.assert(newReduce([4, 2, 3], reducer) === 9);
