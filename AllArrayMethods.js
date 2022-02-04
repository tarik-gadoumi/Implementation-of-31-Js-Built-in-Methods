// The implementation of  every  JS method for Array :
/*list Of methods in order :
                        ******Iterating over collections
                              .eachFromEnd:"Extra"Requires-->  [nothing !]  
                              .each : "A"       --Requires-->  [nothing !]                             
                              .map : "B"        --Requires-->  1 _.each | 2 _.push
                              .filter : "C"     --Requires-->  1 _.each | 2 _.push
                              .reduce : "D"     --Requires-->  1 _.each
                        ******Searching
                              .findIndex : "E"  --Requires-->  1 _.each
                              .find : "F"       --Requires-->  1 _.each | 2 _.findIndex
                              .indexOf : "G"    --Requires-->  1 _.each | 2 _.findIndex
                              .lastIndexOf :"H" --Requires-->  1 _.each | 2 _.findIndex
                              .every : "I"      --Requires-->  1 _.each
                              .some : "J"       --Requires-->  1 _.each
                              .includes : "K"   --Requires-->  1 _.each | 2 _.findeIndex |3 _.find
                        ******Flattening 
                              .flat : "L"       --Requires-->  1 _.each | 2 _.push | 3 _.concat | 4 _.reduce
                              .flatMap : "M"    --Requires-->  1 _.each | 2 _.push | 3 _.map | 4 _.flat
                        ******Joining, appending, and reversing arrays
                              .concat : "N"     --Requires-->  1 _.each | 2 _.push
                              .join : "O"       --Requires-->  1 _.each | 2 _.reduce
                              .reverse : "P"    --Requires-->  1 _.each | 2 _.push | 3 _.eachFromEnd
                              .joinTxt:"Extra"  --Requires-->  1 _.each | 2 _.push | 3 _.shift | 4 _.concat | 5 _.reduce | 6 _.join | 7 _.splice | 8 .split(?)
                        ******Adding, removing, and appending values
                              .push :"Extra"    --Requires-->  1 _.each
                              .shift : "Q"      --Requires-->  1 _.each
                              .unshift : "R"    --Requires-->  1 _.each | 2 _.push | 3 _.concat
                              .slice : "S"      --Requires-->  1 _.each | 2 _.push
                              .splice : "T"     --Requires-->  1 _.each | 2 _.push | 3 _.shift | 3 _.concat
                              .pop : "U"        --Requires-->  [nothing !]
                              .fill : "W"       --Requires-->  1 _.each
                        ******With generators
                              .values : "X"     --Requires-->  [nothing !]
                              .Keys : "Y"       --Requires-->  [nothing !]
                              .entries : "Z"    --Requires-->  [nothing !]
                        ******Other
                              .call : "Extra"   --Requires--> Function.prototype.callByTarik
                              .apply : "Extra"  --Requires--> Function.prototype.applyByTarik
                              .bind : "Extra"   --Requires--> Function.prototype.bindByTarik
                              .Debounce : "27"  --Requires--> ... not yet
                              .sort : "29"      --Requires--> ... not yet

  */

/*

  

   */
const _ = {};
//doesn't return anything !
_.each = function each(list, callback) {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i, list);
    }
  } else {
    for (let key in list) {
      callback(list[key], key, list);
    }
  }
};
_.eachFromEnd = function eachFromEnd(list, callback) {
  if (Array.isArray(list)) {
    for (let i = list.length - 1; i < list.length; i--) {
      if (i === -1) {
        return;
      }
      callback(list[i], i, list);
    }
  } else {
    const keysOfObj = Object.keys(list);
    const newReversedArr = [];
    const keysReversedOfObj = _.eachFromEnd(keysOfObj, (v) => {
      return newReversedArr.push(v);
    }); /*Recursivity Yeaah !*/
    for (let i = 0; i < newReversedArr.length; i++) {
      callback(list[newReversedArr[i]], newReversedArr[i], list);
    }
  }
};
//_.eachFromEnd([1,2,3], v => console.log(v))

_.push = function push(list, ...values) {
  var x = [...values];

  _.each(x, (v, i, xList) => {
    list[list.length] = v;
  });
  return list;
};
//_.push([1,2,3],"b","D",1,["a","b",c])
/*{2nd way to  implement _.push}
*************************
_.push= function push (list,...values){
var x = [...values]
for(let i = 0 ; i< x.length ;i++){

list[list.length]=x[i]
}
return list
}
*************************
*/

_.map = function map(list, callback) {
  const arr = [];
  _.each(list, (v, i, list) => {
    return _.push(arr, callback(v, i, list));
  });
  return arr;
};
//_.map([1,2,3,4],v=>{return v*2})

_.filter = function filter(list, callback) {
  const arr = [];
  _.each(list, (v, i, list) => {
    if (callback(v, i, list)) {
      return _.push(arr, v);
    }
  });
  return arr;
};
//_.filter([1,2,3,4],(v,i,list)=>{ return v < 3})

_.reduce = function reduce(list, callback, initial) {
  var previous = initial;
  _.each(list, (v, i, list) => {
    if (i == 0 && previous === undefined) {
      return (previous = v); //list[0]
    } else {
      return (previous = callback(previous, v));
    }
  });
  return previous;
};

//_.reduce(["1","2","3","1"], (sum,v)=>{ return sum+v})
_.findIndex = function findIndex(list, callback) {
  var index;
  _.each(list, (v, i, list) => {
    if (callback(v, i, list)) {
      return (index = i);
    }
  });
  if (!list[index]) {
    index = -1;
  }
  return index;
};
//_.findIndex([1,2,3,4,5,6,7],v=> v===7)

_.find = function find(list, callback) {
  var index = _.findIndex(list, callback);

  if (index == -1) {
    return undefined;
  } else {
    return list[index];
  }
};
//_.find([1,2,3,4],v=> v==1)

_.indexOf = function indexOf(list, searchedValue) {
  return _.findIndex(list, (v) => {
    return v == searchedValue;
  });
};
//_.indexOf([1,2,3,4,5,88,97],88)

_.lastIndexOf = function lastIndexOf(list, searchedValue) {
  for (let i = list.length - 1; i < list.length; i--) {
    return _.findIndex(list, (v) => {
      return v == searchedValue;
    });
  }
};
//_.lastIndexOf([1,2,3,4,5,88,97,1],1)

_.every = function every(list, callback) {
  var p = true;
  _.each(list, (v, i, list) => {
    if (!callback(v, i, list)) {
      return (p = false);
    }
  });
  return p;
};

/* {2nd way to  implement _.every}
*************************
  _.every=function every(list ,callback){
    for(let i = 0 ; i<list.length ;i++){
      if(!callback(list[i],i,list)){
      return false;
    }
    }
    
    return true;
}
*************************
//_.every([1,2,3,4,'b'], v => { return Number.isInteger(v)})
*/

_.some = function some(list, callback) {
  var p = false;
  _.each(list, (v, i, list) => {
    if (callback(v, i, list)) {
      return (p = true);
    }
  });
  return p;
};
/* {2nd way to  implement _.some}
  *************************
  _.some = function  some ( list, callback){
    for(let i=0 ; i<list.length ; i++){
      if(callback(list[i],i,list)){
        return true ;
      }
    }
    return  false
  }
  *************************
  _.some(["1","2","3","4",1], v => {return Number.isInteger(v)})
*/
_.includes = function includes(list, searchedValue) {
  var x = _.find(list, (v) => {
    return v == searchedValue;
  });
  if (x == searchedValue) {
    return true;
  }
  return false;
};
//_.includes([1,2,3,4],3)
/* {2nd way to  implement _.includes}
*************************
_.includes=function(list,callback){
    for(let i = 0 ; i<list.length ; i++){
        if(list[i]==callback(list[i],i,list)){
            return true;
        }
    }
    return false ;
};
includes([1,2,3,4],v =>{ return v=3})
**************************
*/
_.concat = function concat(list, ...values) {
  //we wan t the list to  be immutable
  var y = [...list]; //so we are creating a copy
  var x = [...values];
  _.each(x, (v, i, xx) => {
    if (Array.isArray(v)) {
      _.push(y, ...v);
    } else {
      _.push(y, v);
    }
  });
  return y;
};
//_.concat([1,2,3],[4,4,4],"Tarik");

_.flat = function flat(target, depth = 0) {
  if (depth < 1 || !Array.isArray(target)) {
    return target;
  }
  return _.reduce(
    target,
    (sum, v) => {
      return _.concat(sum, _.flat(v, depth - 1));
    },
    []
  );
};
//_.flat( [1, 2, 3, [4, 5, [6]]],1)

_.flatMap = function flatMap(list, callback) {
  return _.flat(_.map(list, callback), 1);
};
//_.flatMap([1,2,3], (v,i,list)=>{return [v,v]})

_.join = function join(list, Separator) {
  return _.reduce(list, (sum, v) => sum + Separator + v);
};
//_.join(["the,"quick","brown","fow","jumps","over","the","lazy","dog"],",")

_.joinText = function joinText(String, Separator) {
  const ArrayWithWhiteSpace = String.split(" ");
  _.each(ArrayWithWhiteSpace, (v, i, list) => {
    if (v == "") {
      _.splice(list, i, 1);
      i--;
      return (ArrayWithoutWhiteSpace = ArrayWithWhiteSpace);
    }
  });
  return _.join(ArrayWithoutWhiteSpace, Separator);
};
//_.joinText(" the quick brown fow  jumps over the lazy dog",",")

_.reverse = function (list) {
  x = [...list];
  _.eachFromEnd(x, (v, ii, xlist) => {
    return _.each(list, (vv, i, list) => {
      _.push(list[i], v);
    });
  });
  return list;
};
//_.reverse([1,2,3])

_.shift = function shift(list) {
  // it  mutate the array  by  removing the first  value Then  Return it//
  var firstVal = list[0];
  _.each(list, (v, i, list) => {
    list[i - 1] = v;
  });
  //idk  why  the  array  keep storing the -1 index + value
  list.length = list.length - 1;
  return firstVal;
};
//_.shift([1,2,3])

_.unshift = function unshift(list, ...values) {
  var emergedArray = _.concat(values, ...list);
  _.each(emergedArray, (v, i, emergedArray) => {
    return (list[i] = v);
  });
  return list.length;
};
//_.unshift([1,2,3],4,5)

_.slice = function slice(list, indexStart = 0, End = list.length) {
  var emptyarr = [];
  for (let i = indexStart; i < End; i++) {
    _.push(emptyarr, list[i]);
  }
  return emptyarr;
};
//_.slice([1,2,3,4,5,6,7,8,9,10],3,6)
_.splice = function splice(list, indexStart = 0, lastelem, ...values) {
  var RemovedElements = [];
  for (let i = indexStart; i < lastelem; i++) {
    _.push(RemovedElements, _.shift(list));
  }
  list = _.concat(...values, list);

  return RemovedElements;
};
//var array =[1,2,3,4,"A","B"]
//_.splice(array,0,3,"G","T","Z","Y")

_.pop = function pop(list) {
  var lastElement = list[list.length - 1];
  list.length = list.length - 1;
  return lastElement;
};
//_.pop([1,2,3])

_.fill = function fill(list, value, indexStart = 0, endIndex = list.length) {
  _.each(list, (v, i, list) => {
    list[i] = value;
  });
  return list;
};
//_.fill([... new Array(5)],4)

_.values = function values(list) {
  function* gen() {
    for (let i = 0; i < list.length; i++) {
      yield list[i];
    }
  }
  return gen();
};
//const Valuegenerator = _.values([1,2,3,4,5]);
//Valuegenerator.next()

_.keys = function keys(list) {
  function* gen() {
    for (let i = 0; i < list.length; i++) {
      yield i;
    }
  }
  return gen();
};
//const Valuegenerator = _.keys([1,2,3,4,5]);
//Valuegenerator.next()

_.entries = function entries(list) {
  function* gen() {
    for (let i = 0; i < list.length; i++) {
      yield [i, list[i]];
    }
  }
  return gen();
};
//const Valuegenerator = _.entries([1,2,3,4,5]);
//Valuegenerator.next()

/***************************************************************************************************************************/
// this methods uses eval and may be blocked by CSP
function test() {
  console.log("this = ", this);
  console.log("Arguments = ", arguments);
}
//test.call({name:"bob",age:32},"orange","apple");

Function.prototype.$call = function (context) {
  context ? Object(context) : window;

  console.log(typeof context, context);
  console.log(typeof this, this);
  context.callerFn = this;

  const args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  const strFun = "context.callerFn(...args)";

  const result = eval(strFun);
  delete context.callerFn;
  return result;
};
test.$call({ name: "bob", age: 32 }, "orange", "apple");
/***************************************************************************************************************************/
Function.prototype.callByTarik = function (context) {
  context ? Object(context) : window;
  context.callerFn = this;
  var arr = [];
  for (let i = 0; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }
  context.callerFn(...arr);
  delete context.callerFn;
};
function test() {
  console.log(this);
  console.log(arguments);
}
//test()
const myObj = { name: "tarik", age: 23 };
test.callByTarik(myObj, "Adam", 21);
/***************************************************************************************************************************/
// Function.prototype.$callOp= function (context,...arguments){
// context ?  Object(context) : window ;
// context.FonctionAppelante = this
// context.FonctionAppelante(...arguments);
// delete context.FonctionAppelante
//}
/***************************************************************************************************************************/
Function.prototype.applyByTarik = function (context, array) {
  context ? Object(context) : window;
  context.callerFn = this;
  context.callerFn(...array);
  delete context.callerFn;
};
function test() {
  console.log(this);
  console.log(arguments);
}
//test()
const myObj = { name: "tarik", age: 23 };
test.applyByTarik(myObj, ["Adam", 21]);

// Function.prototype.$apply=function (context){
// context ? Object(context) : window ;
// context.FonctionAppelante = this ;

// for(let i = 1 ; i<arguments.length  ; i++){
//               context.FonctionAppelante(...arguments[i]);
// }
// delete context.FonctionAppelante
// }
// changeThisAndArgument.$apply(myObj,[7,8,9])
/***************************************************************************************************************************/
Function.prototype.bindByTarik = function (context) {
  that = this;
  return function () {
    context.callerFn = that;
    context.callerFn(...arguments);
    delete context.callerFn;
  };
};
function test() {
  console.log(this);
  console.log(arguments);
}
const myObj = { name: "tarik", age: 23 };
var a = test.bindByTarik(myObj);
a(); //pour loger le this de test en tant que myObj
a(1, 2, 3); //pour loger les arguments
/***************************************************************************************************************************/
// Function.prototype.$bind = function (context){
// //console.log(this);
// that=this;
// return function (){
//   that.$callOp(context,...arguments)

// };
// }
/***************************************************************************************************************************/
