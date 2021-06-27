const fetcher = async (...args) => {
  console.log(args);
  try {
    const response = await fetch(...args);

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText);
    error.response = response;
    error.data = data;
    throw error;
  } catch (error) {
    console.log(error);
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
};

export default fetcher;
