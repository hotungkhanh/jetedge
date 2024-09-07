export async function sendPostRequest(body: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:8080/timetable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return JSON.stringify(data);

  } catch (error) {
    console.error('Error during fetch operation:', error);
    return "Error: POST request";
  }
}


export async function sendGetRequest(): Promise<string> {
  try {
    const response = await fetch('http://localhost:8080/timetable');
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error GET request:', error);
    return "Error: GET request";
  }
}