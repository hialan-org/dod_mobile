import React from 'react';
import { SafeAreaView, Text, FlatList, View, StyleSheet } from 'react-native';
import {common} from "../utils/stylesheet";
import {connect} from 'react-redux';
import { FontAwesome } from "@expo/vector-icons";

const data = [
        {
            id: '1',
            content: 'First Item',
        },
        {
            id: '2',
            content: 'Second Item',
        },
        {
            id: '3',
            content: 'Third Item',
        },
    ];

Item = ({ title }) => {
    return (
        <View style={[common.row, styles.notifications]}>
            <FontAwesome name="android" color="black" style={[styles.icon, common.icon]}/>
            <View style={styles.notificationContent}>
                <Text style={{fontSize: 20}}>{title}</Text>
            </View>
        </View>
    );
}

class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={common.containerWrapper}>
                <FlatList
                    data={this.props.notifications}
                    renderItem={({ item }) => <Item title={item.content} />}
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={<Text style={common.title}>Notifications</Text>}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    notifications: {
        marginVertical: 10,
    },
    notificationContent: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        // marginH: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
});

const mapStateToProps = state => {
    return {
        notifications: state.notifications,
    }
}

export default connect(mapStateToProps, null)(Notifications);