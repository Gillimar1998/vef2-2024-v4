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
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();

}

export const deleteData = async (path: string) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }


  const text = await response.text(); 
  try {
    return text ? JSON.parse(text) : {};
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