import React, { Component } from 'react';
import { Text, FlatList, View, ScrollView , StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { ABOUT } from '../shared/about';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';




const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

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
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />

               
        );
    }
    const item = props.item; 
            return(
                <Card
                    title="Corporate Leadership"
                >
                     <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeader}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            );
}


class About extends Component {

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



export default connect(mapStateToProps)(About);