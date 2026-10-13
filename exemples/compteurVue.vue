<script>
export default {
  // La donnée
  data() {
    return { compteur: 0 }
  }
}
</script>

<template>
  <p>Clics : {{ compteur }}</p>
  <button @click="compteur++">+1</button>
</template>

<!DOCTYPE html>
<html lang="fr">
  <head><title>Mon application</title></head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script> bundle
  </body>
</html>