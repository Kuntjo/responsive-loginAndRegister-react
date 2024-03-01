import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { counterActions } from "../reducers/counter"

const Home = ({ navigation }) =>{
    // const [animes, setAnimes] = useState([])

    // useEffect(() => {
    //     AsyncStorage.getItem('token') //check token
    //         .then(token => { 
    //             if( token !== null){ //jalankan dulu kalau ada atau tidak
    //                 return fetch('https://api.jikan.moe/v4/top/anime')
    //             }
    //             return Promise.reject('Not Authorize') //if token tidak ada
    //         })
    //         .then(response => response.json()) //convert to json
    //         .then(({data}) => setAnimes(data)) // or .then((res) => setAnimes(res.data))
    // }, [])

    const count = useSelector((state) => state.counter.count)
    const globalStyle = useSelector((state) => state.style.globalStyle)
    const dispatch = useDispatch()

    const handleLogout = () =>{
        AsyncStorage.removeItem('token')
        .then(() => navigation.navigate('login'))
    }

    return(
        <View style={globalStyle.container}>
            {/* <ScrollView style={styles.scrollContainer}>
                <Text   Text>Welcome Homes!</Text>
               
                    {animes?.map(anime => 
                        <View style={{ justifyContent: 'center' }}>
                            <Text key={anime.mal_id}>{anime.title}</Text>
                            <Image 
                                key={anime.mal_id}
                                source={{ uri:anime.images.webp.image_url }}
                                style={styles.anime_image}></Image>
                        </View>
                        
                    )}
                <Button title="Logout" onPress={handleLogout}></Button>
            </ScrollView> */}

            <Text>Welcome Home mf</Text>
            <Text>{count}</Text>
            <Button title="Increment" onPress={() => dispatch(counterActions.increment())}></Button>
            <Button title="Decrement" onPress={() => dispatch(counterActions.decrement())}></Button>
            <Button title="Go to Details" onPress={() => navigation.navigate('detail')}></Button>
            <Button title="Logout" onPress={handleLogout}></Button>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40
    },

    scrollContainer: {
        // flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    anime_image: {
        height: 80,
        width: 60
    }
})

export default Home;