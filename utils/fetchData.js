export const defaultOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4efe6f77b1msh9a61d03198c4d24p19b58djsn031c05e9afa4",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": "4efe6f77b1msh9a61d03198c4d24p19b58djsn031c05e9afa4",
  },
};
export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
