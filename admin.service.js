const admin = require("firebase-admin");
const firebase = require('firebase/auth')

module.exports = {
    createNewuser: async function (user) {
        return await admin
            .auth()
            .createUser({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                position: user.position,
                address: user.address,
                dept: user.dept,
                dob: user.dob,
                nextOfKinName: user.nextOfKinName,
                nextOfKinPhoneNumber: user.nextOfKinPhoneNumber,
                password: "password",
                disabled: false,
            })
            .then(() => {
                const userRef = admin.firestore().collection('users');

                return userRef.doc(user.email).set({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    position: user.position,
                    dept: user.dept,
                    dob: user.dob,
                    nextOfKinName: user.nextOfKinName,
                    nextOfKinPhoneNumber: user.nextOfKinPhoneNumber,
                    disabled: false,
                })

            })
            .then(function () {
                return {
                    email: user.email,
                };
            })
            .catch(function (error) {
                throw new Error(error);
            });
    },

    deleteUser: async function (userEmail) {
        return await admin
            .auth().getUserByEmail(userEmail).then(record => {
                const theEmail = userEmail
                if (record) {
                    return  admin.auth().deleteUser(record.uid).then(() => userEmail)
                }
                return theEmail
            }).then(
                email => {
                    const userRef = admin.firestore().collection('users');
                    return userRef.doc(email).delete()
                }
            )
    }
};
