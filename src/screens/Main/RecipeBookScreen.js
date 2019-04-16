import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

class RecipeBookScreen extends React.Component {

    renderScreen = () => {
        return (
            <Text>RecipeBookScreen</Text>
        );
    }

    render () {
        return(
            <View style={styles.container}>
                 {this.renderScreen()}
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default withNavigationFocus(RecipeBookScreen);