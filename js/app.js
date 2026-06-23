// Posting
function createPost(text) {
  const user = auth.currentUser;
  if (!user) return;
  db.collection("posts").add({
    uid: user.uid,
    name: user.displayName || "Anonim",
    email: user.email,
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    likes: 0,
    likedBy: [],
    comments: []
  });
}

// Like
function toggleLike(postId) {
  const user = auth.currentUser;
  if (!user) return;
  const postRef = db.collection("posts").doc(postId);
  postRef.get().then(doc => {
    const data = doc.data();
    const liked = data.likedBy.includes(user.uid);
    if (liked) {
      postRef.update({
        likes: firebase.firestore.FieldValue.increment(-1),
        likedBy: firebase.firestore.FieldValue.arrayRemove(user.uid)
      });
    } else {
      postRef.update({
        likes: firebase.firestore.FieldValue.increment(1),
        likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
      });
    }
  });
}

// Komentar
function addComment(postId, text) {
  const user = auth.currentUser;
  if (!user) return;
  db.collection("posts").doc(postId).update({
    comments: firebase.firestore.FieldValue.arrayUnion({
      uid: user.uid,
      name: user.displayName || "Anonim",
      text: text,
      timestamp: new Date().toISOString()
    })
  });
}