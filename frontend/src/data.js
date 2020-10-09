import { DAY_IN_MS } from "./constants";
// Functions to manage the localStorage
export function getData(key) {
  if (!localStorage.getItem(key)) return false;
  return JSON.parse(localStorage.getItem(key));
}

export function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.log("An error was ocurred");
    return false;
  }
}

export function getStoredState(key, time=DAY_IN_MS) {
    // Get the state stored in localStorage
    let storedState = getData(key);
    // If there is no state stored return 
    if (!storedState) return ({
        update: false,
        last_modified: 0
        // last_modified: Date.now()
    });
    // Check the time for data
    const t_now = Date.now();
    const {last_modified} = storedState;
    if ((t_now - last_modified) > time) return ({
        update: false,
        last_modified: 0
        // last_modified: Date.now()
    })
    // Else return the state stored
    return {
      update: false,
      last_modified: 0,
    };
  // Else return the state stored
  return {
    ...storedState,
    update: true,
    last_modified,
  };
}
