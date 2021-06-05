import React, {useEffect} from 'react';
import {getData} from '../utilities/api';

export const useRandomUserData = () => {
  const [response, setResponse] = React.useState(null);
  useEffect(() => {
    async function getUserData() {
      try {
        let data = await getData();
        setResponse(data);
      } catch (error) {}
    }
    getUserData();
  }, []);
  return response;
  // return [{id: nanoid(),"gender":"male","name":{"title":"Mr","first":"Marin","last":"Nicolas"},"location":{"street":{"number":4483,"name":"Rue de L'Abbé-Groult"},"city":"Orléans","state":"Seine-Saint-Denis","country":"France","postcode":31541,"coordinates":{"latitude":"-0.9134","longitude":"-72.7294"},"timezone":{"offset":"-8:00","description":"Pacific Time (US & Canada)"}},"email":"marin.nicolas@example.com","login":{"uuid":"9c278ad3-9bab-45ca-9f36-775199922056","username":"brownkoala507","password":"virginie","salt":"LUORuUPM","md5":"d48d4e49acb34c7a55069d4ba2b76590","sha1":"321865b743d44419de4eb54a9c3431f741a4d9e0","sha256":"22c072619230fb91cd256262c28e4530e4cee8a2d0e1f3371821b8b2a1996037"},"dob":{"date":"1968-12-13T02:03:25.125Z","age":53},"registered":{"date":"2008-06-07T19:01:38.621Z","age":13},"phone":"04-55-11-03-40","cell":"06-19-34-65-20","id":{"name":"INSEE","value":"1NNaN91627942 96"},"picture":{"large":"https://randomuser.me/api/portraits/men/8.jpg","medium":"https://randomuser.me/api/portraits/med/men/8.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/8.jpg"},"nat":"FR"},
  // {id: nanoid(),"gender":"male","name":{"title":"Mr","first":"Marin","last":"Nicolas"},"location":{"street":{"number":4483,"name":"Rue de L'Abbé-Groult"},"city":"Orléans","state":"Seine-Saint-Denis","country":"France","postcode":31541,"coordinates":{"latitude":"-0.9134","longitude":"-72.7294"},"timezone":{"offset":"-8:00","description":"Pacific Time (US & Canada)"}},"email":"marin.nicolas@example.com","login":{"uuid":"9c278ad3-9bab-45ca-9f36-775199922056","username":"brownkoala507","password":"virginie","salt":"LUORuUPM","md5":"d48d4e49acb34c7a55069d4ba2b76590","sha1":"321865b743d44419de4eb54a9c3431f741a4d9e0","sha256":"22c072619230fb91cd256262c28e4530e4cee8a2d0e1f3371821b8b2a1996037"},"dob":{"date":"1968-12-13T02:03:25.125Z","age":53},"registered":{"date":"2008-06-07T19:01:38.621Z","age":13},"phone":"04-55-11-03-40","cell":"06-19-34-65-20","id":{"name":"INSEE","value":"1NNaN91627942 96"},"picture":{"large":"https://randomuser.me/api/portraits/men/8.jpg","medium":"https://randomuser.me/api/portraits/med/men/8.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/8.jpg"},"nat":"FR"}]
};
