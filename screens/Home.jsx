import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { counterActions } from "../reducers/counter"
import { getTopAnime } from "../reducers/anime"

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
    const animeState = useSelector((state) => state.anime)
    const dispatch = useDispatch()

    const handleLogout = () =>{
        AsyncStorage.removeItem('token')
        .then(() => navigation.navigate('login'))
    }

    //memanggil gettopanime harus pakai useEffect
    useEffect(() => {
        dispatch(getTopAnime())
    }, [dispatch])

    return(
        <View style={globalStyle.container}>
            <Text style={styles.bigText}>Welcome Home Mf</Text>
            <ScrollView>
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
            {
                animeState.loading ? <ActivityIndicator/> : animeState?.data?.map(anime => (
                    <TouchableOpacity onPress={() => navigation.navigate('detail',{ 
                        id: anime.mal_id,
                        title: anime.title,
                        synopsis: anime.synopsis,
                        image: anime.images.jpg.large_image_url
                        })}>
                        <Image 
                            key={anime.mal_id} // this is the id in mal, shit always need id
                            source={{ uri: anime.images.jpg.image_url }} // source in mal
                            style={styles.anime_image}></Image>
                    </TouchableOpacity>
                    
                ))
            }
            <Text>{count}</Text>
            <Button title="Increment" onPress={() => dispatch(counterActions.increment())}></Button>
            <Button title="Decrement" onPress={() => dispatch(counterActions.decrement())}></Button>
            <Button title="Go to Details" onPress={() => navigation.navigate('detail')}></Button>
            <Button title="Logout" onPress={handleLogout}></Button>
            </ScrollView>
            
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
        height: 220,
        width: 160,
        marginBottom: 10
    },

    bigText: {
        fontSize: 40,
        fontWeight: 'bold'
    }
})

export default Home;