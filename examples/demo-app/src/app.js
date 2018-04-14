// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Processor from 'kepler.gl/processors';
import {updateVisData, addDataToMap} from 'kepler.gl/actions';

import {loadSampleConfigurations} from './actions';
import {replaceLoadDataModal} from './factories/load-data-modal';

const KeplerGl = require('kepler.gl/components').injectComponents([
  replaceLoadDataModal()
]);

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

/*
  define custom header
  inject custom component factory to replace default one

import {withState} from 'kepler.gl/components';
import {visStateLens} from 'kepler.gl/reducers';
import {wrapTo} from 'kepler.gl/actions';

// custom action wrap to mounted instance
const addTodoAction = (text) => wrapTo('map', {
    type: 'ADD_TODO',
    text
});

const CustomHeader = ({visState, addTodo}) => (
  <div onClick={() => addTodo('hello')}>{`${Object.keys(visState.datasets).length} dataset loaded`}</div>
);

const headerStateToProps = state => ({loaded: state.app.loaded});
const myCustomHeaderFactory = () => withState(
  // keplerGl state lenses
  [visStateLens],
  // customMapStateToProps
  headerStateToProps,
  // actions
  {addTodo: addTodoAction}
)(CustomHeader);

const KeplerGl = injectComponents([
  [PanelHeaderFactory, myCustomHeaderFactory]
]);
 */

// Sample data
/* eslint-disable no-unused-vars */
import sampleTripData from './data/sample-trip-data';
import sampleGeojson from './data/sample-geojson.json';
/* eslint-enable no-unused-vars */

class App extends Component {
  componentWillMount() {
    // if we pass an id as part f the url
    // we ry to fetch along map configurations
    const {params: {id: sampleMapId} = {}} = this.props;
    // if (sampleMapId) {
    this.props.dispatch(loadSampleConfigurations(sampleMapId));
  }
  componentDidMount() {
    // if we pass an id as part f the url
    // we ry to fetch along map configurations
    // const {params: {id: sampleMapId} = {}} = this.props;
    // if (sampleMapId) {
    // this.props.dispatch(loadSampleConfigurations(sampleMapId));
    // }

    /**
     * ENABLE THE FOLLOWING CODE TO PRE-POLUATE KEPLER.GL INSTANCE
     */
    // load trip based data with config
    // this.props.dispatch(
    //   updateVisData(
    //     // datasets
    //     {
    //       info: {
    //         label: 'Sample Taxi Trips in New York City',
    //         id: 'test_trip_data'
    //       },
    //       data: sampleTripData
    //     },
    //     // option
    //     {
    //       centerMap: true,
    //       readOnly: false
    //     },
    //     // config
    //     {
    //       filters: [
    //         {
    //           id: 'me',
    //           dataId: 'test_trip_data',
    //           name: 'tpep_pickup_datetime',
    //           type: 'timeRange',
    //           enlarged: true
    //         }
    //       ]
    //     })
    // );

    // load icon data
    // this.props.dispatch(
    //   updateVisData({
    //     info: {
    //       label: 'Icon Data',
    //       id: 'test_icon_data'
    //     },
    //     data: Processor.processCsvData(sampleIconCsv)
    //   })
    // );

    // load geojson
    // this.props.dispatch(
    //   updateVisData({
    //     info: {label: 'SF Zip Geo'},
    //     data: Processor.processGeojson(sampleGeojson)
    //   })
    // );
  }

  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              /*
               * Specify path to keplerGl state, because it is not mount at the root
               */
              getState={state => state.demo.keplerGl}
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
