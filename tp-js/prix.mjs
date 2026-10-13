export const TVA = 0.2;
// Export nommé
export const ttc = (prix) => prix * (1 + TVA);
// Export par défaut : un seul par fichier
export default function resume(prix) {
  return `${prix} € HT = ${ttc(prix)} € TTC`;
}
