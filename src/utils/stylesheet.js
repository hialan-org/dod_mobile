import {StyleSheet} from "react-native";
import {DefaultTheme} from "react-native-paper";
import {Colors} from "react-native-paper";

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
        fontSize: 30,
        color: 'grey'
    },
    iconImage: {
        width: 20,
        aspectRatio: 1,
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
    tableItem: {
        // backgroundColor: 'white',
        // padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'flex-start',
        // alignContent: 'flex-start'
        display: "flex",
    },
    tableText: {
        fontSize: 15,
        alignSelf: 'flex-start',
    },
    tableTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        width: "30%"
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        width: 200,
        height: 50,
        padding: 10,
        marginTop: 16,
    },
    buttonText: {

    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    tableRow: {
    },
    tableRowSelected: {
        backgroundColor: Colors.grey400,
    }
});

export const theme = {
    ...DefaultTheme,
    roundness: 2,
    // colors: {
    //     ...DefaultTheme.colors,
    //     primary: '#3498db',
    //     accent: '#f1c40f',
    // },
    // dark: true,
};