import React, {useState} from 'react';
import {Dimensions, SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, TextInput, RadioButton, Subheading} from 'react-native-paper';
import {common} from "../utils/stylesheet";
import {Line} from "../components/Line";

const {height} = Dimensions.get('window');

class Wallet extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        money: "",
        checked: "dod",
        screenHeight: height,
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({screenHeight: contentHeight});
    };

    render() {
        const {checked, money} = this.state;
        return (
            <SafeAreaView style={common.containerWrapper}>
                <ScrollView
                    style={{flex: 1}}
                    contentContainerStyle={common.scrollView}
                    scrollEnabled={true}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={common.container}>
                        <Text style={common.title}>Wallet</Text>
                        <Line/>
                        <TextInput
                            label='Money to invest'
                            value={money}
                            onChangeText={money => this.setState({money})}
                        />
                        <Subheading style={common.label}>Strategies: </Subheading>
                        <View style={[common.row, common.content]}>
                            <RadioButton
                                value="dod"
                                status={checked === 'dod' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    this.setState({checked: 'dod'});
                                }}
                            />
                            <Text>Dog of The Dow</Text>
                        </View>
                        <View style={[common.row, common.content]}>
                            <RadioButton
                                value="snp"
                                status={checked === 'snp' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    this.setState({checked: 'snp'});
                                }}
                            />
                            <Text>S&P 500</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {}}>
                            <Text>Suggest</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        width: 200,
        padding: 10,
        marginTop: 16,
    },
})

export default Wallet;