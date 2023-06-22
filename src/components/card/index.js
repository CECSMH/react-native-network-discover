import { Image, Text, View } from "react-native";
import styles from "./styles";

import desktop from '../../../assets/desktop_96.png'

export default function Card(props) {

    const { address, payload } = props.data || {};

    return (
        <View style={[styles.container]} onPress={() => props.onPress && props.onPress(props.data)}>

            <Image source={desktop} style={styles.icon} resizeMode="contain" />

            <View style={styles.text_container}>
                <Text style={styles.text}>{address}:{payload?.port}</Text>
                <Text style={styles.text}>{payload?.name}</Text>
            </View>
        </View>
    );
};