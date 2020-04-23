import React from 'react';
import { View, StyleSheet} from 'react-native';
import { ActivityIndicator, Colors,DataTable} from "react-native-paper";

export const ListStock = ({titles, stocks, loading, renderItem}) => {
    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    {titles.map((title, index) =>
                        <DataTable.Title key={`title-${index}`}>{title}</DataTable.Title>
                    )}
                </DataTable.Header>

                {loading ? <ActivityIndicator animating={true} /> : (
                    (stocks && stocks.length) ? stocks.map((stock, index) => {
                        return (
                            renderItem(stock, index)
                        )
                    }) : (
                        <DataTable.Row>
                            <DataTable.Cell>No Data</DataTable.Cell>
                        </DataTable.Row>
                    )
                )}
            </DataTable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        // marginTop: Constants.statusBarHeight,
    },
});