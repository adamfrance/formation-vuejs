console.log("1");
setTimeout(() => console.log("3"), 1000); 
console.log("2");

// Une promesse qui se termine après ms millisecondes
const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// 1. Synchrone : chaque ligne attend la précédente
console.log('1a. je prépare le café')
console.log('1b. le café est prêt')

// 2. Asynchrone « classique » : une fonction de rappel (callback)
console.log('2a. je lance la commande')
setTimeout(() => console.log('2c. commande reçue (callback)'), 500)
console.log('2b. je continue sans attendre')
await attendre(700)

// 3. Asynchrone avec une promesse : async / await
const commander = async () => {
  console.log('3a. je lance la commande')
  await attendre(500)
  console.log('3c. commande reçue (async / await)')
}
commander()
console.log('3b. je continue sans attendre')