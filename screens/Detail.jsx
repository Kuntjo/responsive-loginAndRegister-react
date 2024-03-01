import { StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux";

const Detail = () =>{
    const count = useSelector((state) => state.counter.count)
    const globalStyle = useSelector((state) => state.style.globalStyle)
    return(
        <View style={globalStyle.container}>
            <Text>{count}</Text>
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
})