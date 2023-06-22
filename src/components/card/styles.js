import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        marginVertical: 3,
        padding: 4,
        borderRadius: 6,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 50,
        height: 50
    },
    text_container: {
        marginLeft: 8
    },
    text: {
        color: '#5bc0de',
        fontSize: 13
    }
});

export default styles;