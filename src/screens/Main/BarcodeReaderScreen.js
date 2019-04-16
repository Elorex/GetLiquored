import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation';

class BarcodeReaderScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            camera: {
                type: RNCamera.Constants.Type.back,
                barcodeFinderVisible: true,
                // Storing scanned barcodes in an array for now
                // Will need to make the data go to a database at some point
                barcode: '',
            }
        };
    }

    // Place the use on the shelf screen after a bar code is scanned
    onBarCodeRead = (scan) => {
        if (scan.data != null) {
            this.props.navigation.navigate('Shelf', { scannedUPC: scan.data });
        }
    }

    renderScreen = () => {
        let canReadBarcode = this.props.navigation.isFocused();

		return (
			<RNCamera
				barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
				barcodeFinderWidth={280}
				barcodeFinderHeight={220}
				barcodeFinderBorderColor="white"
				barcodeFinderBorderWidth={2}
				captureAudio={false}
				defaultTouchToFocus
				onBarCodeRead={canReadBarcode ? this.onBarCodeRead.bind(this) : null}
				permissionDialogTitle={'Camera Permission'}
				permissionDialogMessage={'We need your permission to use the camera.'}
				ref={ref => this.camera = ref}
				style={styles.preview}
				type={this.state.camera.type}
			/>
		);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderScreen()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});

export default withNavigationFocus(BarcodeReaderScreen);