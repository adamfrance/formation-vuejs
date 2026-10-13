import { lireTaches } from "./fausse-api.mjs";
import { formaterTache } from "./outils.mjs";

const afficher = async () => {
  console.log("Chargement...");
  try {
    const taches = await lireTaches();
    let restantes = 0;
    taches.forEach((tache) => {
      console.log(formaterTache(tache));
      if (!tache.fait) restantes++;
    });
    console.log(`${restantes} tâche(s) à faire`);
  } catch (erreur) {
    console.log("Erreur :", erreur.message);
  } finally {
    console.log("Terminé");
  }
};

afficher();
console.log("Le programme continue pendant le chargement");
