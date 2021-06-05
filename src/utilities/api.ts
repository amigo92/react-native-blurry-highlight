import {nanoid} from 'nanoid/non-secure';

export const getData = async () => {
  const res = await fetch('https://randomuser.me/api?results=20', {
    headers: {
      Accept: 'application/json',
    },
  });
  const json = await res.json();
  let data = json.results.map((val: any) => {
    return {...val, id: nanoid()};
  });
  return data;
};
