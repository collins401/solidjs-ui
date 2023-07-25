import axios from 'redaxios';
const request: any = axios.create({
  baseURL: '',
  headers: {
    systemid: '00000000'
  }
});

export default request;
