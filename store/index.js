import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const store = new EventEmitter();
export default store

var isObject = (value) => {
  return (typeof value == 'object' || value instanceof Object);
}

var isEmpty = (value) => {
  return (value == undefined || value == null);
}

store.$get = (key, defaultValue = undefined, parser = JSON.parse, setDefault = false) => {
  console.log("get", key, defaultValue, setDefault);
  let cache = localStorage.getItem(key);
  if (isEmpty(cache)) {
    if (setDefault == true)
    {
      store.$set(key, defaultValue);
    }
    return defaultValue;
  } else {
    if (parser != undefined) {
      cache = parser(cache);
    }
  }
  if (isObject(cache) && isObject(store[key])) {
    Object.assign(store[key], cache);
  } else {
    store[key] = cache;
  }
  return store[key];
}


store.$set = (key, value, serializer = JSON.stringify, replace) => {
  console.log("set", key, value);
  if (isObject(value) && isObject(store[key])) {
    Object.assign(store[key], value);
  } else {
    store[key] = value;
  }
  if (serializer != undefined)
    value = serializer(store[key]);
  localStorage.setItem(key, value);
}


store.$delete = (key) => {
  if (isObject(store[key])) {
    Object.keys(store[key]).map((k) => {
      store[key][k] = undefined;
    });
  } else {
    store[key] = undefined;
  }
  console.log("deleted", store[key]);
  localStorage.removeItem(key);
}

/*
Store
*/
store.music = store.$get('music', {
  name: "永久に_Elements Garden",
  src: "./static/music/chapter01.mp3",
  switchy: true
}, JSON.parse, true);
