import { GET_TRAIN_LIST } from './types';
import axios from 'axios';
import Papa from 'papaparse';

export default function getTrainList() {
    return dispatch => {
	axios.get('../exercise.csv')
	    .then(res => {
		console.log('Train list ::', res.data);
		//Idealy this would be done on backend. but I wanted deliverable to able to host from anywhere
		//So I put the csv parsing on the front end.
		Papa.parse(res.data, {
		    header: true,
		    dynamicTyping: true,
		    skipEmptyLines: true,
		    complete: function(results) {
			console.log(results);
			if(results.errors.length > 0) {
			    for( var i = 0; i < results.errors.length; i++ ) {
				alert('bad data from csv endpoint\n' + results.errors[i]['message'] + ' on row ' + results.errors[i]['row']);
			    }
			    //if csv is bad we aren't going to show anything and warn the user via an alert
			    return;

			}
			for(i = 0; i < results.data.length; i++) {
			    console.log("mog");
			    var scheduled_time = results.data[i]['ScheduledTime '];
			    var delay = results.data[i]['Lateness '] * 1000; //lateness is in seconds not ms
			    results.data[i]['ScheduledTime '] =  [scheduled_time + delay, scheduled_time];
			    console.log(results.data[i]['ScheduledTime ']);
			}
			dispatch(getTrainListAsync(results.data));
			console.log(results.data);
		    }
		});
	    });
    }
}

function getTrainListAsync(trains){
    return {
	type: GET_TRAIN_LIST,
	payload: trains
    };
}
