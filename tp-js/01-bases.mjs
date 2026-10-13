// const : valeur ne change pas
// let : peut changer (dans un scope)
// var : plus utilisée

const titre = "Installer Vite"; // interface user
let compteur = 0; // suivi app
compteur = compteur + 1;
const message = `Tâche ${compteur} : ${titre}`;
// Fonction fléchée
const doubler = (n) => n * 2;
console.log(message, doubler(compteur));



