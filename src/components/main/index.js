import { SafeAreaView, View } from "react-native";

export default function Main(props) {
    return (
        <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
            <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>{props.children}</View>
        </SafeAreaView>
    );
};