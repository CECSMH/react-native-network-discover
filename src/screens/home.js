import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import UdpNDService from "../services/udp_nd_service";
import Main from "../components/main";
import Card from "../components/card";

export default function Home(props) {
    const [refreshing, setRefresh] = useState(false);
    const [items, setItems] = useState(false);

    async function start_component() {
        UdpNDService.init(9090); //porta do servidor echo

        await UdpNDService.start();

        search();
    };

    async function search() {
        setRefresh(true);

        UdpNDService.search_echo((result) => {

            setItems(result);

            setRefresh(false);
        });
    };

    useEffect(() => {
        start_component();
        return UdpNDService.stop
    }, [])

    return (
        <Main>
            <View style={styles.container}>

                <Text style={styles.title}>Descoberta De Rede</Text>

                <View style={styles.content}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        renderItem={({ item, index }) => <Card data={item} />}
                        data={items}
                        refreshControl={<RefreshControl refreshing={refreshing} tintColor={'#505050'} onRefresh={() => { search() }} />}
                    />
                </View>

            </View>
        </Main>
    );
};



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%'
    },
    title: {
        color: '#505050',
        fontSize: 24,
        marginTop: 20
    },
    content: {
        flex: 1,
        marginTop: 10,
        borderRadius: 8,
        backgroundColor: '#dfdfdf',
        width: '90%',
        margin: 8,
        padding: 4
    },
    list: {
        flex: 1,
        height: '100'
    }
})