import { createAsyncThunk } from "@reduxjs/toolkit";

const serviceName = "auth";

const registerUser = createAsyncThunk(`${serviceName}/register`, async (data: any) => {
    const response = await fetch("")
});