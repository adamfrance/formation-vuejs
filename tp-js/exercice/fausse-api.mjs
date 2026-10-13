// Simule la durée du réseau
const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Async : renvoie une promesse
export const lireTaches = async () => {
  await attendre(300);
  return [
    { id: 1, titre: "Installer Vite", fait: true },
    { id: 2, titre: "Écrire un composant", fait: false },
    { id: 3, titre: "Tester", fait: false },
  ];
};
