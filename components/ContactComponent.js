import React, { Component } from 'react';
import { Text} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import {CONTACT} from '../shared/contact';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';




function RenderItem(props) {
    
    
        const item = props.item;
        
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>      
                    <Card
                        title={item.title}>
                        <Text
                            style={{margin: 10}}>
                            {item.details}</Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: "#512DA8"}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                            onPress={this.sendMail}
                        />
                    </Card>

                </Animatable.View>
            );
}


class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: CONTACT,
          };
    }

    static navigationOptions = {
        title: 'Contact Us',
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {
        return(
        <RenderItem item={this.state.contact} />
        );
    }
}


export default ContactUs;