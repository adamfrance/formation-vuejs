const client = { nom: "Léa", adresse: null };
console.log(client.adresse?.ville);
console.log(client.adresse?.ville ?? "inconnue");

