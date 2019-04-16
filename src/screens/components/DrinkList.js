import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import DrinkItem from './DrinkItem';

const drinkList = props => {

    let drinksOutput = props.drinks.map((upcNumber) => {
        return (
            <DrinkItem
                key={upcNumber.toString()}
                upc={upcNumber}
            />
        );
    });

    return (
        <ScrollView style={styles.listContainer}>
            {drinksOutput}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    },
});

export default drinkList;