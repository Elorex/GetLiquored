import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import DrinkList from '../components/DrinkList';

class ShelfScreen extends React.Component {

    state = {
        scannedBarcodeList: [],
        api: '',
        failedFetchingFromRemote: ''
    };

    // Reset our navigation param when we are done loading the screen
    // This is so we we don't keep sending the same upc if a new one isn't scanned
    didFocusSubscription = this.props.navigation.addListener(
        'didFocus',() => {
            // Reset scannedUPC param
            this.props.navigation.setParams({ scannedUPC: '',  });
        }
    );    

    // Check if we have a new upc
    newScanCheck = () => {
        let upc = this.props.navigation.getParam('scannedUPC', '');

        if (upc !== '' && !this.state.scannedBarcodeList.includes(upc)) {
            
            this.getDrinkFromRemote(upc);
        };
    }

    // Fetch a drink from the remote database
    getDrinkFromRemote(upc) {
        fetch(this.state.api + 'drinks/' + upc + '.json')
            .then(drinkJSON => {
                this.loadDrinkToLocal(drinkJSON);
            }).catch(() => {
                // Reload with an error if we couldn't find a drink
                this.setState({ failedFetchingFromRemote: "Oops, we couldn't find that drink" });
            });
    }

    // Load the drink into the local database
    loadDrinkToLocal(drink) {
        JSON.stringify(drink);
        this.state.scannedBarcodeList.push(drink);
    }

    // Get our drinks 
    getDrinksFromLocal() {

    }

    // Check if we failed to get a drink
    checkFailedToRemoteStatus() {
        let failedFetchingFromRemote;
        if (this.state.failedFetchingFromRemote) {
            // Reset our failed status
            failedFetchingFromRemote = this.state.failedFetchingFromRemote;
            this.state.failedFetchingFromRemote = '';
        }
        return failedFetchingFromRemote;
    }

    renderScreen(){
        // Check if an item was just scanned
        this.newScanCheck();

        // Load our drinks
        this.getDrinksFromLocal();

        return (
            <View style={styles.container}>
                <Text>{this.checkFailedToRemoteStatus()}</Text>
                <DrinkList
                    drinks={this.state.scannedBarcodeList}
                />
            </View>
        )
    }

    render() {
        return (
            this.renderScreen()
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});

export default withNavigationFocus(ShelfScreen);