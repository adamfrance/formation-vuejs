export const formaterTache = (t) =>
  `${t.id}. ${t.titre} (${t.fait ? "fait" : "à faire"})`;
