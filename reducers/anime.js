import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const getTopAnime = createAsyncThunk(
    'get-top-anime',
    async (payload, thunkApi) => {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/top/anime')
            return thunkApi.fulfillWithValue(response.data.data)
        } catch (error) {
            
        }
    }
)

// export const getTopAnimeDetails = createAsyncThunk(
//     'get-top-anime-details',
//     async (payload, thunkApi) => {
//         try {
//             const response = await axios.get('https://api.jikan.moe/v4/top/anime')
//             console.log(response.data.data.synopsis)
//             return thunkApi.fulfillWithValue(response.data.data.synopsis)
//         } catch (error) {
            
//         }
//     }
// )

//aight, first we create the slice
const animeSlice = createSlice({
    name: 'anime-slice',// name that bitch, it gotta be unique
    initialState: { // initial state is the data we want to pass from the slice
        data: [], // in this case, we want to pass an array all across the screens, initialiaze the data
        detail: null,
        loading: false // this is to have a loading screen, initialize false
    },
    reducers: {}, // this is a must have, in this case its empty cause we dont wanna manipulate data
    extraReducers: (builder) =>{ // in this case extrareducers is used to check the api state
        builder.addCase(getTopAnime.fulfilled, (state, action) => { 
            state.data = action.payload
            state.loading = false
        })

        builder.addCase(getTopAnime.pending, (state, action) => {
            state.loading = true
        })

        // builder.addCase(getTopAnimeDetails.fulfilled, (state, action) => { 
        //     state.data = action.payload
        //     state.loading = false
        // })

        // builder.addCase(getTopAnimeDetails.pending, (state, action) => {
        //     state.loading = true
        // })

        // builder.addCase(getTopAnime.rejected, (state, action) => {
        //     Alert.alert('Username or password wrong')
        //     state.loading = false
        // })
    }
})

const animeReducer = animeSlice.reducer // define the bitch
export default animeReducer; // then export it, don't forget to add it to index to activate it