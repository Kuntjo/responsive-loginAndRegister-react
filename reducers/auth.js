import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FIREBASE_AUTH } from "../helpers/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userSignIn = createAsyncThunk(
    //async harus di kasih nama dan harus unique
    'user-sign-in',
    async (payload, thunkApi) => {
        //here we fetch and request he api
        const firebaseAuth = FIREBASE_AUTH

        // return signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
        //         .catch(err => thunkApi.rejectWithValue(err.message))
        //         .then(res => res.user.getIdToken())

        try {
            const response = await signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
            const token = await response.user.getIdToken()
            AsyncStorage.setItem('token', token)
            return thunkApi.fulfillWithValue(token)
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const authSlice = createSlice({
    //nama harus unique
    name: 'auth',
    initialState: {
        // user: null,
        token: null,
        loading: false
    },
    reducers:{},
    extraReducers: (builder) => {
        //listener async action, jika ada action asycn dia addcase
        builder.addCase(
            userSignIn.fulfilled, //pending, fulfilled, rejected. Self explanatory
            (state, action) => {
                state.loading = false

                // console.log(action.payload)
                state.token = action.payload
            }
        )

        // ==Jika salah validasi salah
        builder.addCase(
            userSignIn.rejected, //pending, fulfilled, rejected. Self explanatory
            (state, action) => {
                // console.log(action)
                state.loading = false
                Alert.alert('Username or password wrong')
            }
        ) 

        builder.addCase(
            userSignIn.pending, //pending, fulfilled, rejected. Self explanatory
            (state, action) => {
                state.loading = true
            }
        ) 
    }
})

const authReducer = authSlice.reducer
export default authReducer