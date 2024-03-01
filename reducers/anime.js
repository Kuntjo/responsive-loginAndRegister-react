import { createSlice } from "@reduxjs/toolkit";

//aight, first we create the slice
const animeSlice = createSlice({
    name: 'anime-slice',// name that bitch, it gotta be unique
    initialState: { // initial state is the data we want to pass from the slice
        data: [], // in this case, we want to pass an array all across the screens, initialiaze the data
        loading: false // this is to have a loading screen, initialize false
    },
    reducers: {}, // this is a must have, in this case its empty cause we dont wanna manipulate data
})

const animeReducer = animeSlice.reducer // define the bitch
export default animeReducer; // then export it, don't forget to add it to index to activate it