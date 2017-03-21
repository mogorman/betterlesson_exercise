import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import getTrainList from '../actions/get_train_list';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import moment from 'moment';
import logo from '../logo.svg';
import '../App.css';

const train_columns = [{
    columns: [
	{
	    header: 'Scheduled Time',
	    accessor: 'ScheduledTime ',
	    render: props => <span>{moment.utc(props.value[1]).format('MM/DD HH:mm:ss')}</span>
	},
	{
	    header: 'Lateness',
	    accessor: 'Lateness '
	},{
	    header: 'Destination',
	    accessor: 'Destination '
	},{
	    header: 'Origin',
	    accessor: 'Origin '
	},{
	    header: 'Status',
	    accessor: 'Status'
	},{
	    header: 'Time',
	    accessor: 'TimeStamp ',
	    render: props => <span>{moment.utc(props.value).format('MM/DD HH:mm:ss')}</span>
	},{
	    header: 'Track',
	    accessor: 'Track '
	},{
	    header: 'Trip',
	    accessor: 'Trip '
	}]
}]


class App extends Component {
    constructor(props) {
	super(props);
	this.state = {

	}

    }
    componentDidMount() {
	this.props.getTrainList();
    }

    render() {
	return (
		<div className="App container">
		<div className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<h2>Welcome to React</h2>
		</div>
		<p className="App-intro">
		Simple train schedule exercise. Default sorted by schedule time, with lateness taken in to account, but still displaying the correctly scheduled time.
		</p>
		<ReactTable
	    data={this.props.trainList}
	    columns={train_columns}
	    defaultSorting={[{id:  'ScheduledTime ',
			      asc: true}
			    ]}
	    defaultPageSize={this.props.trainList.length}
		/>
		</div>
	);
    }
}

//connects root reducer to props
function mapStateToProps(state) {
    return {
        trainList: state.trainList
    }
}

//connects redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
	getTrainList: getTrainList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
