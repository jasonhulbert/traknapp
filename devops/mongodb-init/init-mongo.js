db = db.getSiblingDB('trakn_app');

db.createUser({
    user: `user`,
    pwd: `pass`,
    roles: [{ role: 'readWrite', db: `trakn_app` }]
});

db.createCollection('plans');
