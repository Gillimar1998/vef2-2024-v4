const API_URL = process.env.REACT_APP_API_URL;

export const fetchData = async (path: string) => {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const PostData = async <T>(path: string, data: T) => {
  const response = await fetch(`${API_URL}${path}`,{
    method: 'POST', // Specify the method explicitly
    headers: {
      'Content-Type': 'application/json', // Specify the content type in the headers
    },
    body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json(); // Parse and return the response data as JSON

}

export const deleteData = async (path: string) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Check if the response has content before parsing
  const text = await response.text(); // First, get the response as text
  try {
    return text ? JSON.parse(text) : {}; // Parse text as JSON if not empty, else return an empty object
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
};

export const updateData = async <T> (path: string, data: T) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};