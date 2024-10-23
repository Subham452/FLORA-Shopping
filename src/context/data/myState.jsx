import React, { useState, useEffect } from 'react';
import MyContext from './myContext';
// import { addDoc, collection, onSnapshot,Timestamp  } from 'firebase/firestore';
import { addDoc,updateDoc, query, orderBy, deleteDoc, collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fireDB } from '../../components/firebase/FireabseConfig';
import { firestore } from '../../components/firebase/FireabseConfig'
const MyState = (props) => {

  const [product, setProduct] = useState([]); // State to hold products
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [currentProductId, setCurrentProductId] = useState(null);
  const [note, setNote] = useState('');
  const [noteData, setNoteData] = useState([]); // State to hold products
  const [noteTitle, setNoteTitle] = useState('');

  const [updateName, setUpdateName] = useState();
  const [updatePrice, setUpdatePrice] = useState();
  const [updateCategory, setUpdatCategory] = useState();
  const [updateDesc, setUpdateDesc] = useState();
  const [updateImage, setUpdateImage] = useState();
  const [popup, setPopup] = useState(false)

  const [itemsInCart, setItemsInCart] = useState();

  const user = JSON?.parse(localStorage?.getItem('user'))




  const fetchProducts = () => {
    const productsCollection = collection(fireDB, "products");
    onSnapshot(productsCollection, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProduct(productsData);
    });
  };

  const fetchNotes = () => {
    const productsCollection = collection(fireDB, "notes");
    onSnapshot(productsCollection, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNoteData(productsData);
    });
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
    fetchNotes(); // Fetch notes on component mount
  }, []);


  const resetForm = () => {
    setName('');
    setCategory('');
    setImage('');
    setPrice('');
    setDesc('');
    // setIsEditing(false);
    setCurrentProductId(null);
  };


  const addProduct = async (e) => {
    e?.preventDefault();

    if (!name || !category || !price || !desc || !image) {
      toast.error('Please fill all the fields!');
      return;
    }

    try {
      const docRef = await addDoc(collection(fireDB, "products"), {
        name,
        price,
        image,
        category,
        desc,
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        ) // Add current date as a Firestore Timestamp
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success('Product added successfully');
    } catch (error) {
      toast.error('Error adding product: ' + error.message);
    } finally {
      setName('');
      setCategory('');
      setImage('');
      setPrice('');
      setDesc('');
    }
  };

  const addNotes = async (e) => {
    e?.preventDefault();

    if (!note || !noteTitle) {
      toast.error('Please fill all the fields!');
      return;
    }

    try {
      const docRef = await addDoc(collection(fireDB, "notes"), {
        userEmail: user?.user?.email,
        note,
        noteTitle,
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        ) // Add current date as a Firestore Timestamp
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success('Product added successfully');
    } catch (error) {
      toast.error('Error adding product: ' + error.message);
    } finally {
      setName('');
      setCategory('');
      setImage('');
      setPrice('');
      setDesc('');
    }
  };




  const deleteUserById = async (id) => {
    await collection("products").doc(id).delete();

    console.log(id)
    return id;
  }


  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(fireDB, 'products', id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Error deleting product: ' + error.message);
    }
  };


  const modal1 = (id) => {
    popup(true)
  }

  const updateProduct = async (e, id) => {

    await fireDB.collection("products").doc("hOQnCDvEEs1anAroKKP6	").update({
      name:"Okra 250 g"
    });
  };


  return (
    <MyContext.Provider value={{ addNotes, noteData, note, setNote, noteTitle, setNoteTitle ,updateProduct, deleteUserById, modal1, popup, setPopup, updateName, setUpdateName, updatePrice, setUpdatePrice,setUpdateImage, updateImage, updateCategory, setUpdatCategory, setUpdateDesc, updateDesc ,name, addProduct, deleteProduct, setName, price, setPrice, category, setCategory, desc, setDesc, image, setImage, product, setItemsInCart, itemsInCart }}>
      {props.children}
      <ToastContainer />
    </MyContext.Provider>
  );
};

export default MyState;