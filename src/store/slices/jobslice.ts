import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobType } from "../../type";
import { JobData } from "../../data";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    job: JobData,
  },
  reducers: {
    setJob: (
      state: {
        job: JobType[];
      },
      action: PayloadAction<JobType[]>
    ) => {
      state.job = action.payload;
    },
  },
});

export const { setJob } = jobSlice.actions;
export default jobSlice.reducer;
