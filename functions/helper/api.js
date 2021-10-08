const admin = require("firebase-admin");

exports.fetchPost = async function fetchPost(postId) {
  const docRef = admin
    .firestore()
    .collection("posts")
    .doc(postId);

  const snap = await docRef.get();
  const post = snap.data();
  return post;
};
