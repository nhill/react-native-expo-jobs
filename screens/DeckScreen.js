import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon:  ({tintColor}) => {
        return <Icon name="description" size={30} color={tintColor} />
    }
  };

  renderCard(job) {
    const initialRegion = {
      latitude: job.latitude,
      longitude: job.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    }


    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={true}
            region={initialRegion}
          >
          </MapView>
        </View>

        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<.*?>/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs">
        <Button
          title="Back to Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03a9f4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return(
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="jobkey"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
}

function mapStateToProps({ jobs }){
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);
