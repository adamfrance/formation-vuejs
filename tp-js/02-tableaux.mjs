const taches = [
  { id: 1, titre: "Installer Vite", fait: true },
  { id: 2, titre: "Écrire un composant", fait: false },
];
const titres = taches.map((t) => t.titre);
const aFaire = taches.filter((t) => !t.fait);
const plus = [...taches, { id: 3, titre: "Tester", fait: false }];
const { id, titre } = taches[0];
console.log(titres);
console.log(aFaire.length, plus.length, taches.length);
console.log(id, titre);
