import * as functions from 'firebase-functions'
import * as admin from "firebase-admin"

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://temasek-jc.firebaseio.com'
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
export const onVote = functions.database.ref('votes/{collection}/{id}/{uid}').onWrite(async (change, context) => {
    const before: number = change.before.val() || 0
    const after: number = change.after.val() || 0
    const collectionPath = change.before.ref.parent?.parent?.key || "videos"
    const postId = change.before.ref.parent?.key || ""
    const uid = change.before.ref.key || ""
    await Promise.all([
        admin.database().ref(`user-votes/${collectionPath}/${uid}/${postId}`).set(change.after.val()),
        admin.database().ref(`${collectionPath}/${postId}/votes`).transaction(currentValue => (currentValue || 0) + after - before),
        admin.firestore().collection(collectionPath).doc(postId).set({votes: admin.firestore.FieldValue.increment(after - before)}, {merge: true})
    ])
})

export const onPost = functions.firestore.document('posts/{post}').onCreate(async (snapshot, context) => {
    if (context.authType === "USER" && context.auth?.uid) {
        const documentData = snapshot.data()
        switch ((await admin.auth().getUser(context.auth?.uid)).customClaims?.accessLevel) {
            case 2:
                documentData.userType = 'Student Moderator'
                await snapshot.ref.set(documentData)
                break
            case 3:
                documentData.userType = 'Teacher'
                await snapshot.ref.set(documentData)
                break
        }
    }
})

export const onComment = functions.firestore.document('posts/{post}/comments/{comment}').onCreate(async (snapshot, context) => {
    if (context.authType === "USER" && context.auth?.uid) {
        const documentData = snapshot.data()
        switch ((await admin.auth().getUser(context.auth?.uid)).customClaims?.accessLevel) {
            case 2:
                documentData.userType = 'Student Moderator'
                await snapshot.ref.set(documentData)
                break
            case 3:
                documentData.userType = 'Teacher'
                await snapshot.ref.set(documentData)
                break
        }
    }

    const postRef = snapshot.ref.parent.parent
    // await snapshot.ref.parent.parent?
    if (postRef) {
        await admin.firestore().runTransaction(async transaction => {
            const postData = (await transaction.get(postRef)).data()
            const comments: {[key: string]: any} = postData?.comments || {}
            while (Object.keys(comments).length > 2) {
                let oldestCommentKey: string = ''
                let oldestCommentTime: number = admin.firestore.Timestamp.now().toMillis()
                for (const commentsKey in comments) {
                    const commentTime = comments[commentsKey].created.toMillis()
                    if (commentTime < oldestCommentTime) {
                        oldestCommentTime = commentTime
                        oldestCommentKey = commentsKey
                    }
                }
                comments[oldestCommentKey] = undefined
            }
            comments[snapshot.id] = snapshot.data()
            if (postData) {
                postData.comments = comments
            }
            await transaction.set(postRef, postData)
        })
    }
})

export const addUsersWithPrivileges = functions.https.onRequest(async (req, resp) => {
    const participants: admin.auth.CreateRequest[] = []//[{email: 'example@gmail.com', displayName: 'Example'}]
    const participantRecordPromises: Promise<admin.auth.UserRecord>[] = []
    for (const participant of participants) {
        participant.password = admin.database().ref().push().key?.substring(0, 10) || 'Password'
        participantRecordPromises.push(admin.auth().createUser(participant))
    }
    const participantRecords = await Promise.all(participantRecordPromises)
    const setParticipantsAccess = participantRecords.map(participantRecord => admin.auth().setCustomUserClaims(participantRecord.uid, {accessLevel: 1}))
    await Promise.all(setParticipantsAccess)

    const students: admin.auth.CreateRequest[] = []//[{email: 'example@gmail.com', displayName: 'Example'}]
    const studentRecordPromises: Promise<admin.auth.UserRecord>[] = []
    for (const student of students) {
        student.password = admin.database().ref().push().key?.substring(0, 10) || 'Password'
        studentRecordPromises.push(admin.auth().createUser(student))
    }
    const studentRecords = await Promise.all(studentRecordPromises)
    const setStudentsAccess = studentRecords.map(studentRecord => admin.auth().setCustomUserClaims(studentRecord.uid, {accessLevel: 2}))
    await Promise.all(setStudentsAccess)

    const teachers: admin.auth.CreateRequest[] = []//[{email: 'example@gmail.com', displayName: 'Example'}]
    const teacherRecordPromises: Promise<admin.auth.UserRecord>[] = []
    for (const teacher of teachers) {
        teacher.password = admin.database().ref().push().key?.substring(0, 10) || 'Password'
        teacherRecordPromises.push(admin.auth().createUser(teacher))
    }
    const teacherRecords = await Promise.all(teacherRecordPromises)
    const setTeachersAccess = teacherRecords.map(teacherRecord => admin.auth().setCustomUserClaims(teacherRecord.uid, {accessLevel: 3}))
    await Promise.all(setTeachersAccess)

    await Promise.all([
        admin.database().ref('secrets').child('participants').push(participants),
        admin.database().ref('secrets').child('students').push(students),
        admin.database().ref('secrets').child('teachers').push(teachers)
    ])
})

export const userLog = functions.runWith({timeoutSeconds: 540}).https.onRequest(async (req, resp) => {
    async function listAllUsers(nextPageToken: string | undefined) {
        const listUsersResult = await admin.auth().listUsers(1000, nextPageToken)
        let userDetails: {[key: string]: {[key: string]: string}} = {}
        listUsersResult.users.forEach(value => {
            if (!userDetails[value.uid]) {
                userDetails[value.uid] = {}
            }
            userDetails[value.uid].email = value.email || "No email"
            userDetails[value.uid].uid = value.uid
        })
        console.log("updating 1000")
        await admin.database().ref("userLog").update(userDetails)
        console.log("updated 1000")
        if (listUsersResult.pageToken) {
            // List next batch of users.
            console.log("fetching next 1000")
            await listAllUsers(listUsersResult.pageToken);
        }
        return null;
    }
    await listAllUsers(undefined)
    return;
})