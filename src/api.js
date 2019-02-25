const DATA_1 = [1, 2, 3, 4, 5];
const DATA_2 = [5, 4, 3, 2, 1];

const USERS = {
  1: DATA_1,
  2: DATA_2
};

export function requestDataFromServer(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: USERS[userId]
      });
    }, 1000);
  });
}
