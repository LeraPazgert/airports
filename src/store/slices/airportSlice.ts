import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAirport, IFilter } from "../../models/models";

interface AirportState {
  airports: IAirport[];
  count: number;
  loading: boolean;
  error: string;
  airportsContainer: IAirport[];
}

interface AirportPayload {
  airports: IAirport[];
  count: number;
}

const initialState: AirportState = {
  airports: [],
  count: 0,
  loading: false,
  error: "",
  airportsContainer: [],
};

export const airportSlice = createSlice({
  name: "airport",
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<AirportPayload>) {
      state.loading = false;
      state.airports = action.payload.airports;
      state.airportsContainer = action.payload.airports;
      state.count = action.payload.count;
      state.error = "";
    },
    fetchingError(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message;
    },
    filter(state, action: PayloadAction<IFilter>) {
      state.airports = state.airportsContainer
        .filter((a) => a.type.includes(action.payload.type))
        .filter((a) => a.country.includes(action.payload.country))
        .filter((a) => a.region.includes(action.payload.region));
    },
  },
});

export default airportSlice.reducer;
