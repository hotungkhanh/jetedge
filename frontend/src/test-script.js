
const time1 = document.getElementById('time-1');
const time2 = document.getElementById('time-2');

const rooms = document.getElementById('room-form');

const lesson1 = document.getElementById('lesson-form-1');
const lesson2 = document.getElementById('lesson-form-2');
const lesson3 = document.getElementById('lesson-form-3');
const lesson4 = document.getElementById('lesson-form-4');


const postBtn = document.getElementById('POST-btn');
const getBtn = document.getElementById('GET-btn');

getBtn.onclick = function () {
  alert("GET Request Button clicked.");
  sendGetRequest();
}

// biome-ignore lint/complexity/useArrowFunction: <explanation>
postBtn.onclick = function () {
  alert("POST Request Button clicked.");

  const time1Data = Object.fromEntries(new FormData(time1));
  const time2Data = Object.fromEntries(new FormData(time2));

  const lesson1Data = Object.fromEntries(new FormData(lesson1));
  const lesson2Data = Object.fromEntries(new FormData(lesson2));
  const lesson3Data = Object.fromEntries(new FormData(lesson3));
  const lesson4Data = Object.fromEntries(new FormData(lesson4));

  const requestBody = {
    "timeslots": [
      time1Data,
      time2Data
    ],
    "rooms": [
      {
        "name": rooms.children[0].value
      },
      {
        "name": rooms.children[1].value
      }
    ],
    "lessons": [
      lesson1Data,
      lesson2Data,
      lesson3Data,
      lesson4Data
    ]
  };

  sendPostRequest(requestBody);
}

async function sendPostRequest(body) {
  try {
    const response = await fetch('http://localhost:8080/timetables/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    const rp = document.getElementById('rp');
    rp.textContent = JSON.stringify(data);

  } catch (error) {
    console.error('Error during fetch operation:', error);
  }
}


async function sendGetRequest() {
  try {
    const response = await fetch('http://localhost:8080/hello');
    const data = await response.text();
    console.log(data);
    const rp = document.getElementById('rp');
    rp.textContent = data;
  }
  catch (error) {
    console.error('Error GET request:', error);
  }
}
