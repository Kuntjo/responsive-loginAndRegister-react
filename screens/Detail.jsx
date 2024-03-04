import { Image, StyleSheet, Text, View } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { getTopAnimeDetails } from "../reducers/anime";
import { useEffect } from "react";

const Detail = ({ route }) =>{
    const title = route.params.title
    const id = route.params.id
    const synopsis = route.params.synopsis
    const image = route.params.image
    const count = useSelector((state) => state.counter.count)
    const globalStyle = useSelector((state) => state.style.globalStyle)

  

    return(
        <View style={globalStyle.container}>
            <View style={styles.header}>
                <Image source={{ uri: image }} style={styles.anime_image}/>
                <Text style={styles.title}>{title}</Text>
            </View>
            
            <Text>Synopsis: {synopsis}</Text>
           
        </View>
    )
}

export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40
    },

    anime_image: {
        height: 220,
        width: 160,
        padding: 20
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        padding: 12
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    }
})