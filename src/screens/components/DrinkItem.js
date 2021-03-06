import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const listItem = (props) => {
    return (
        <View style={styles.listItem} >
            <Text>{props.upc}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        marginBottom: 5,
        backgroundColor: "#eee"
    }
})

export default listItem;