/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Must pay for Blaze to enable this
// ENABLE BEFORE RELEASING TO PUBLIC

// const functions = require("firebase-functions");
// const Filter = require("bad-words");

// const admin = require("firebase-admin");
// admin.initializeApp();

// const db = admin.firestore();

// exports.detectEvilUsers = functions.firestore
//   .document("mesesages/{msgId}")
//   // get the msg text
//   .onCreate(async (doc, ctx) => {
//     const filter = new Filter();
//     const { text, uid } = doc.data();

//     if (filter.isProfane(text)) {
//       const cleaned = filter.clean(text);
//       await doc.ref.update({
//         text: `[User has been banned for saying: ${cleaned}]`,
//       });

//       await db.collection("banned").doc(uid).set({});
//     }
//   });
