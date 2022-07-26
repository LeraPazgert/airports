import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useDebounce } from "../hooks/debounce";
import { useInput } from "../hooks/input";
import { IAirport, ServerResponse } from "../models/models";

const AirportSearch = () => {
  const input = useInput('');
  const [airports, setAirports] = useState<IAirport[]>([]);
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce<string>(input.value, 100);

  const navigate = useNavigate();

  async function searchAirports() {
    const response = await axios.get<ServerResponse<IAirport>>(`airports`, {
      params: {
        search: debounced,
        count: 10
      },
    })
    setAirports(response.data.results)
  }
  useEffect(() => {
    if (debounced.length > 3) {
      searchAirports().then(() => setDropdown(true));
    } else {
      setDropdown(false);
    }
  }, [debounced])
  return (
    <div className="mb-4 relative">
      <input
        className="border py-2 px-4 outlined-0 w-full h-[42px] "
        type="text"
        placeholder="Type something here..."
        {...input}
      />
      {dropdown && <ul className="list-none absolute left-0 right-0 h-[200px] bg-red-300 top-[42px] shadow-md bg-white overflow-y-scroll">
        {
          airports.map(airport => (
            <li
              key={airport.id}
              className="py-2 px-4 mb-2 hover:bg-gray-300 hover:cursor-pointer hover:transition-colors hover:text-white"
              onClick={() => navigate(`/airport/${airport.id}`)}
            >{airport.name}
            </li>
          ))
        }
      </ul>}
    </div>
  );
};

export default AirportSearch;