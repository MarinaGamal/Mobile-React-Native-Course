import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Switch, Button, Modal ,ScrollView,Alert} from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable';
import { Permissions, Notifications } from 'expo';

class Reservation extends Component {

    static navigationOptions = {
        title: 'Reserve Table',
    }

    static defaultState() {
        return ({
            guests: 1,
            smoking: false,
            date: '',
        });
    }

    constructor(props) {
        super(props);
        this.state = Reservation.defaultState();
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    // toggleModal() {
    //     this.setState({showModal: !this.state.showModal});
    // }

    resetForm() {
        this.setState(Reservation.defaultState());
    }

    // handleReservation() {
    //     console.log(JSON.stringify(this.state));
    //     this.toggleModal();
    // }

    confirmReservation() {
        this.resetForm();
    }

    // resetForm() {
    //     this.setState({
    //         guests: 1,
    //         smoking: false,
    //         date: '',
    //         showModal: false
    //     });
    // }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
    
    handleReservation() {
        const { date, guests, smoking } = this.state;

        Alert.alert(
            'Your Reservation OK?',
            `Number of guests: ${guests}\nSmoking? ${smoking ? 'Yes' : 'No'}\nDate and Time:${date}`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => this.resetForm(),
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.confirmReservation()
                        this.presentLocalNotification(this.state.date)
                    }
                    
                },
            ],
            { cancelable: false },
        );
    }

    
    render() {
        const todayDate = new Date().toISOString().split('T')[0];
        const { date, guests, smoking } = this.state;
        return(
            <Animatable.View animation="zoomIn" duration={2000}>
                <ScrollView>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={guests}
                        onValueChange={itemValue => this.setState({ guests: itemValue })}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={smoking}
                        trackColor="#512DA8"
                            onValueChange={value => this.setState({ smoking: value })}/>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={date}
                        format=""
                        mode="datetime"
                        placeholder="Select Date and Time"
                        minDate={todayDate} 
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                        },
                        dateInput: {
                            marginLeft: 36
                        }                        }}
                        onDateChange={newDate => this.setState({ date: newDate })} />
                    </View>
                    <View style={styles.formRow}>
                    <Button
                        //onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        //accessibilityLabel="Learn more about this purple button"
                        onPress={() => this.handleReservation()}
                        accessibilityLabel="Learn more about this purple button" />
                    </View>


                    {/* <Modal animationType = {"slide"} transparent = {false}
                        visible = {this.state.showModal}
                        onDismiss = {() => this.toggleModal() }
                        onRequestClose = {() => this.toggleModal() }>
                        <View style = {styles.modal}>
                            <Text style = {styles.modalTitle}>Your Reservation</Text>
                            <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                            
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color="#512DA8"
                                title="Close" 
                                />
                        </View>
                    </Modal> */}
                </ScrollView>
            </Animatable.View>
        );
    }

};
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
});


export default Reservation;