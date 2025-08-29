function PowerFrameWork(rootId) {
  let state = {};
  let listeners = [];

  function useState(key, initialValue) {
    // Initialize only if not defined yet
    if (!(key in state)) state[key] = initialValue;

    function setState(newValue) {
      state[key] = newValue;             
      listeners.forEach(fn => fn());    
    }

    return [() => state[key], setState];  
  }

  function render(component) {
    const root = document.querySelector(rootId);
    root.innerHTML = component();
    listeners = [() => render(component)];  
  }

  return { useState, render };
}

 
const app = PowerFrameWork("#root");

function Counter() {
  const [count, setCount] = app.useState("count", 0);

   
  window.increment = function () {
    setCount(count() + 1);
  };

  return `
    <h1>Count: ${count()}</h1>
    <button onclick="increment()">+1</button>
  `;
}

app.render(Counter);
