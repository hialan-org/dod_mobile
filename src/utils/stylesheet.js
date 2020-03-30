import {StyleSheet} from "react-native";

export const common = StyleSheet.create({
    containerWrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginHorizontal: 10,
    },
    label: {
        marginHorizontal: 15,
        fontSize: 20,
    },
    content: {
        marginHorizontal: 15,
        fontSize: 20,
    },
    icon: {
        fontSize: 20,
    },
    row: {
        minHeight: 30,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 8,
    },
    scrollView: {
        flexGrow: 1,
    },
});