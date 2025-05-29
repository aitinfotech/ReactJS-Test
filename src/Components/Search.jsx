import React, { useState } from "react";

const BING_SEARCH_API_ENDPOINT = "https://api.bing.microsoft.com/v7.0/search";
const BING_API_KEY = "1234567890abcdef1234567890abcdef";

export default function SearchRes() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClickedEvent = async (e) => {
    e.preventdefault();
if(query=="")
{

    return alert("Please enter query to search");
}


    try {
      const response = await fetch(
        `${BING_SEARCH_API_ENDPOINT}?q=${encodeURIComponent(query)}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": BING_API_KEY,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();
      // Bing Search API returns webPages.value with the results
      if (data.webPages && data.webPages.value) {
        setResults(data.webPages.value);
      } else {
        setResults([]);
        setError("No results found.");
      }
    } catch (err) {
      setError(`Failed to fetch results: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="p-6 w-center max-w-sm min-w-[200px]">
          <div className="relative flex items-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
            >
              <path
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              />
            </svg>
            <form onSubmit={onClickedEvent}>

            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search here" value={query}
          onChange={(e) => setQuery(e.target.value)}
            />

            <button
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="submit"
            >
                 {loading ? 'Searching...' : 'Search'}
            </button>
            </form>
            {error && <p>{error}</p>}
      <ul>
        {results.map((item) => (
          <li key={item.id || item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" >
              <h3>{item.name}</h3>
            </a>
            <p>{item.snippet}</p>
          </li>
        ))}
      </ul>
          </div>
        </div>
      </div>
    </>
  );
}
