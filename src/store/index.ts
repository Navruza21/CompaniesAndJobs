import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slices/companyslice";
import jobReducer from "./slices/jobslice";

const store = configureStore({
  reducer: {
    company: companyReducer,
    job: jobReducer,
  },
});

// Store turlarini eksport qilish
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
