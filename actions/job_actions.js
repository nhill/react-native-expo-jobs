import axios from 'axios';
import { dispatch } from 'react-redux';
import  reverseGeocode from 'latlng-to-zip';
import { stringify } from 'qs';

import {
  FETCH_JOBS
  LIKE_JOB
} from './types';

export const fetchJobs = (region, callback) => async (dispatch) => {
  try{
    let zip = await reverseGeocode(region);

    // data is contained in response.data so deconstruct
    let { data } = await axios.get(buildJobsURL(zip));
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  }catch(e){
    console.log(e);
  }
};

export const likeJob = (job) => async (dispatch) => {
  payload: job,
  type: LIKE_JOB
};

const buildJobsURL = (zip) => {
  const qs = stringify({
    publisher: '4201738803816157',
    l: zip,
    v: '2',
    format: 'json',
    latlong: 1,
    radius: 10,
    q: 'javascript'
  });

  return 'http://api.indeed.com/ads/apisearch?'+qs;
};
