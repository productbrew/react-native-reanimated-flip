import React from "react"
import {Text, View, StyleSheet} from "react-native"

type Props = {
    title: string
    color: string
}

const CardSide = ({title, color}: Props) => {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        setInterval(() => {
            setCount(count => count + Math.floor(Math.random() * 20))
        }, 1000)
    }, [])

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>{count}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        width: 200,
        height: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
        margin: 'auto',
    },
    text: {
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
    },
})

export default CardSide
