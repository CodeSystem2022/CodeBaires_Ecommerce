const firebaseConfig = {
    apiKey: "AIzaSyBV_GdZ_8dTB_bBtaLjKnbWmhZ1eXyOV_U",
    authDomain: "ecommerce-f188e.firebaseapp.com",
    projectId: "ecommerce-f188e",
    storageBucket: "ecommerce-f188e.appspot.com",
    messagingSenderId: "613676929545",
    appId: "1:613676929545:web:0d07564d24ed4fcc435ed8"
  };
  
const app = initializeApp(firebaseConfig);

// Obtén una referencia a la colección de productos
const db = firebase.firestore();
const productosRef = db.collection("Productos");

// Obtén los productos y muestra en tu página
productosRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // Aquí puedes acceder a los datos de cada producto, por ejemplo, data.nombre, data.precio, etc.
    // Luego, puedes crear elementos HTML para mostrar los productos en tu página.
    console.log(data);
  });
});






