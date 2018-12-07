import * as firebase from 'firebase';

const DB_CONFIG = {
    apiKey: "AIzaSyCVwheOQvQRUD4o9HG2Ckq1oTgznVcJ8kk",
    authDomain: "todoapplication-29762.firebaseapp.com",
    databaseURL: "https://todoapplication-29762.firebaseio.com",
    projectId: "todoapplication-29762",
    storageBucket: "",
    messagingSenderId: "1080693884527"
};

firebase.initializeApp(DB_CONFIG);
let database = firebase.database();
export default database;
