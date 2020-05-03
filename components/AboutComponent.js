import React, { Component } from 'react';
import { Text, FlatList, View, ScrollView , StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { ABOUT } from '../shared/about';
import { LEADERS } from '../shared/leaders';

function History(props) {
    
        const item = props.item; 
            return(
                <Card
                    title={item.title}>
                    <Text
                        style={{margin: 10}}>
                        {item.description}</Text>
                </Card>
            );
}
function RenderItemLeaders(props){

    const renderLeaderItem = ({item, index}) => {

        return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={<Text style={{color:"#808080"}}>{item.description}</Text>}
                    hideChevron={true}
                    leftAvatar={{ source: require('./images/alberto.png')}}
                />

               
        );
    }
    const item = props.item; 
            return(
                <Card
                    title="Corporate Leadership"
                >
                    <FlatList 
                    data={item}
                    renderItem={renderLeaderItem}
                    keyExtractor={item => item.id.toString()}
                    />
                </Card>
            );
}


class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            about: ABOUT,
            leaders:LEADERS
          };
    }

    static navigationOptions = {
        title: 'About Us',
    };

    render() {
       
        return(
        <ScrollView>
            <History item={this.state.about} />
            <RenderItemLeaders item={this.state.leaders} />
    
        </ScrollView>
        );
    }
}


export default About;