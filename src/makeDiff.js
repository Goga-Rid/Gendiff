import _ from 'lodash';

const makeDiff = (object1, object2) => {
const keysObject1 = _.keys(object1);
const keysObject2 = _.keys(object2);
const allKeys = _.union(keysObject1, keysObject2);
const sortedKeys = _.sortBy(allKeys);

const result = sortedKeys.map((key) => {
if (!Object.hasOwn(object1, key)){
    return {type: 'added', value: object2[key], key };
}

if(!Object.hasOwn(object2, key)){
    return {type: 'removed', value: object1[key], key};
}

if(object1[key] === object2[key]){
    return {type: 'unchanged', value: object1[key], key};
}
if (typeof object1[key] !== "object" || typeof object2[key] !== "object"){
    if(object1[key] !== object2[key]){
        return {type: 'updated', oldValue: object1[key], value: object2[key], key};
    }
}

if(_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
    return {type: 'nested', children: makeDiff(object1[key], object2[key]), key}; 
}

});
return result;

};

export default makeDiff;

//typeof object1[key] === "object" && typeof object2[key] === "object"