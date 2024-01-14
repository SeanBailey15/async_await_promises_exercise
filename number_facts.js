// *******************************************************************************************
// NUMBER FACTS STEP ONE: GET A SINGLE FACT ABOUT YOUR FAVROITE NUMBER

// Select our ul on our page...
const factList = document.getElementById("number_facts_ul");

async function getSinglePromise(url) {
  try {
    const res = await axios.get(url);
    let li = document.createElement("li");
    li.append(`${res.data.text}`);
    factList.append(li);
  } catch (e) {
    console.log("ERROR!", e);
  }
}

// TOGGLE COMMENT ON/OFF FUNCTION CALL BELOW TO SEE/HIDE RESULT.

getSinglePromise("http://numbersapi.com/22/trivia?json");

// *******************************************************************************************
// NUMBER FACTS STEP TWO: GET DATA ON MULTIPLE NUMBERS IN A SINGLE REQUEST

async function getMultiplePromises(arr) {
  try {
    let allPromises = [];
    for (let i = 0; i <= arr.length - 1; i++) {
      allPromises.push(
        axios.get(`http://numbersapi.com/${arr[i]}/trivia?json`)
      );
    }
    let res = await Promise.all(allPromises);
    for (let i = 0; i <= res.length - 1; i++) {
      let li = document.createElement("li");
      li.append(`${res[i].data.text}`);
      factList.append(li);
    }
  } catch (e) {
    console.log("ERROR!", e);
  }
}

// TOGGLE COMMENT ON/OFF FUNCTION CALL BELOW TO SEE/HIDE RESULT.

// getMultiplePromises([22, 45, 54, 68]);

// *******************************************************************************************
// NUMBER FACTS STEP THREE: GET 4 FACTS ON YOUR FAVORITE NUMBER AND DISPLAY THEM ON THE PAGE

async function getNumFacts(num, quantity) {
  try {
    let allPromises = [];
    for (let i = 1; i <= quantity; i++) {
      allPromises.push(
        getSinglePromise(`http://numbersapi.com/${num}/trivia?json`)
      );
    }
    let res = await Promise.all(allPromises);
    for (let i = 0; i <= res.length - 1; i++) {
      let li = document.createElement("li");
      li.append(`${res[i].data.text}`);
      factList.append(li);
    }
  } catch (e) {
    console.log("ERROR!", e);
  }
}

// TOGGLE COMMENT ON/OFF FUNCTION CALL BELOW TO SEE/HIDE RESULT.

// getNumFacts(22, 4);
