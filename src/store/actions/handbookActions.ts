import { AppDispatch } from "..";
import axios from "../../axios";
import {
  IAirportCountry,
  IAirportRegion,
  IAirportType,
} from "../../models/models";
import { handbookSlice } from "../slices/handbookSlice";

export const fetchHandbooks = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(handbookSlice.actions.fetching());
      const response = await Promise.all([
        axios.get<IAirportType[]>('handbooks/airport-types'),
        axios.get<IAirportRegion[]>('handbooks/regions'),
        axios.get<IAirportCountry[]>('handbooks/countries'),
      ]);
      dispatch(
        handbookSlice.actions.fetchSuccess({
          types: response[0].data,
          regions: response[1].data,
          countries: response[2].data,
        })
      );
    } catch (e) {}
  };
};
