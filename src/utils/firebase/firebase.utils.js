import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, updateDoc  } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCpe2iRusHwCBG1SOLcLfvc0GTy-MOtOaE",
  authDomain: "licenta-35e28.firebaseapp.com",
  projectId: "licenta-35e28",
  storageBucket: "licenta-35e28.appspot.com",
  messagingSenderId: "285239067273",
  appId: "1:285239067273:web:dcbd0841559b277fc13c58"
  };
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
  
  export const auth = getAuth();
  export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore();
  
  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) =>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
  
    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });
  
    await batch.commit();
    console.log('done');
  } 
  
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
      const {title,items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
  } 
  
  
  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      console.log(userAuth);
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          phoneNumber: additionalInformation.phoneNumber || '',
          birthDate: additionalInformation.birthDate || null,
          mainOcupation: additionalInformation.mainOcupation || null,
          skills: additionalInformation.skills || [],
          description: additionalInformation.description || '',
          profileImage: additionalInformation.profileImage || null,
          gitHubLink: additionalInformation.gitHubLink || null,
          linkedinLink : additionalInformation.linkedinLink || null,
          instagramLink : additionalInformation.instagramLink || null,
          resume : additionalInformation.resume || null,
          location : additionalInformation.location || null,
          jobs : additionalInformation.jobs || [],
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };

  export const getUserData = async (userId) => {

    const userDocRef = doc(db, 'users', userId.uid);
    const q = query(userDocRef);
  
    const docSnap = await getDoc(q);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      return docSnap.data();
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // export const updateProfile = async (userId, newPhoneNumber, newBirthDate, newDisplayName, newmainOcupation, newDescription,
  //   newGitHubLink, newLinkedinLink, newInstagramLink) =>{
  //   const userDocRef = doc(db, 'users', userId.uid);
  //   try{
  //     await updateDoc(userDocRef, {
  //       phoneNumber: newPhoneNumber,
  //       birthDate: newBirthDate,
  //       mainOcupation: newmainOcupation,
  //       displayName: newDisplayName,
  //       description: newDescription,
  //       gitHubLink : newGitHubLink,
  //       linkedinLink : newLinkedinLink,
  //       instagramLink: newInstagramLink,
  //     });
  //     console.log('User profile updated successfully');
  //   } catch (error) {
  //     console.log('Error updating user profile:', error.message);
  //   }
  // }

  export const updateProfile = async (
    userId,
    newPhoneNumber,
    newBirthDate,
    newDisplayName,
    newMainOccupation,
    newDescription,
    newGitHubLink,
    newLinkedinLink,
    newInstagramLink,
    newLocation,
    skill,
  ) => {
    const userDocRef = doc(db, 'users', userId.uid);
    const userData = (await getDoc(userDocRef)).data();
  
    // Create an object to store the updated profile data
    const updatedProfileData = {};
  
    // Compare and add changed data to updatedProfileData
    if (newLocation !== userData.location) {
      updatedProfileData.location = newLocation;
    }
    if (newPhoneNumber !== userData.phoneNumber) {
      updatedProfileData.phoneNumber = newPhoneNumber;
    }
    if (newBirthDate !== userData.birthDate) {
      updatedProfileData.birthDate = newBirthDate;

    }
    if (newDisplayName !== userData.displayName) {
      updatedProfileData.displayName = newDisplayName;
    }
    if (newMainOccupation !== userData.mainOcupation) {
      updatedProfileData.mainOcupation = newMainOccupation;
    }
    if (newDescription !== userData.description) {
      updatedProfileData.description = newDescription;
    }
    if (newGitHubLink !== userData.gitHubLink) {
      updatedProfileData.gitHubLink = newGitHubLink;
    }
    if (newLinkedinLink !== userData.linkedinLink) {
      updatedProfileData.linkedinLink = newLinkedinLink;
    }
    if (newInstagramLink !== userData.instagramLink) {
      updatedProfileData.instagramLink = newInstagramLink;
    }
  
    if (skill.trim() !== '') {
      updatedProfileData.skills = [...userData.skills, skill.trim()];
    }

    // Only update the profile if there are changes
    if (Object.keys(updatedProfileData).length > 0) {
      try {
        await updateDoc(userDocRef, updatedProfileData);
        console.log('User profile updated successfully');
      } catch (error) {
        console.log('Error updating user profile:', error.message);
      }
    }
  };

  const getImageNameFromURL = (file) => {
    const fileName = file.substring(
      file.lastIndexOf('/') + 1,
      file.indexOf('?') !== -1 ? file.indexOf('?') : undefined
    );
    return fileName;
  };
  

  export const UploadImage = async (selectedFile,userId) => {
    const userDocRef = doc(db, 'users', userId.uid);
    if(selectedFile) {
      try{
      const storageRef = getStorage();
      const fileRef = ref(storageRef,selectedFile.name);

      const docSnap = await getDoc(userDocRef);
      const oldImageURL = docSnap.data()?.profileImage;
      if (oldImageURL) {
        const oldImageRef = ref(storageRef, getImageNameFromURL(oldImageURL));
        await deleteObject(oldImageRef);
      }

      await uploadBytes(fileRef,selectedFile);
      const downloadURL = await getDownloadURL(fileRef);
     
      await updateDoc(userDocRef,{
          profileImage: downloadURL,
        });
        
      return downloadURL;
      }
      catch(error) {
        console.log('Error uploading image:' , error.message);
      };
    }
  }

  const getFileNameFromURL = (url) => {
    const startIndex = url.lastIndexOf('/') + 1;
    const endIndex = url.indexOf('?');
    let fileName = url.substring(startIndex, endIndex);
    fileName = fileName.replace('resumes%2F', ''); // Remove 'resumes%2F' from the file name
    return fileName;
  };
  
  
  export const UploadResume = async (newResume,userId) => {
    const userDocRef = doc(db, 'users', userId.uid);
    console.log(newResume);
    if(newResume) {
      try{
      const storageRef = getStorage();
      const storageChildRef = ref(storageRef, `resumes/${newResume.name}`);

      const docSnap = await getDoc(userDocRef);
      const oldResumeURL = docSnap.data()?.resume;
      if (oldResumeURL && !oldResumeURL.includes('undefined')) {
        const oldResumeFileName = getFileNameFromURL(oldResumeURL);
        const oldResumeRef = ref(storageRef, `resumes/${oldResumeFileName}`);
        await deleteObject(oldResumeRef);
      }

      await uploadBytes(storageChildRef,newResume);
      const downloadURL = await getDownloadURL(storageChildRef);
     
      await updateDoc(userDocRef,{
          resume: downloadURL,
        });
        
      return downloadURL;
      }
      catch(error) {
        console.log('Error uploading image:' , error.message);
      };
    }
  }
  
  export const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      const userData = querySnapshot.docs.map((doc) => doc.data());
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };


  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };
  
  export const signOutUser = () => signOut(auth);
  
  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);