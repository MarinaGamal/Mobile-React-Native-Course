import React, { Component } from 'react';
import { Text} from 'react-native';
import { Card } from 'react-native-elements';
import {CONTACT} from '../shared/contact';


function RenderItem(props) {
    
        const item = props.item;
        
            return(
                <Card
                    title={item.title}>
                    <Text
                        style={{margin: 10}}>
                        {item.details}</Text>
                </Card>
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

    render() {
        return(
        <RenderItem item={this.state.contact} />
        );
    }
}


export default ContactUs;