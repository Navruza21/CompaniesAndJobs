import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyType } from "../../type";
import { CompanyData } from "../../data";

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: CompanyData,
  },
  reducers: {
    setCompany: (
      state: {
        company: CompanyType[];
      },
      action: PayloadAction<CompanyType[]>
    ) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
