<script setup>
import { ref, computed, watch } from 'vue'

const prix = ref(10)
const quantite = ref(1)

// computed : calcule une VALEUR, affichée dans le gabarit
const total = computed(() => prix.value * quantite.value)

// watch : fait une ACTION à chaque changement
watch(quantite, (nouvelle, ancienne) => {
  // les deux paramètres : nouvelle et ancienne valeur
  console.log(`quantité : ${ancienne} -> ${nouvelle}`)
})

watch(prix, (nouveau) => {
  console.log(`prix : ${nouveau}`)
// immediate : s'exécute aussi une première fois, tout de suite
}, { immediate: true })
</script>

<template>
  <input type="number" v-model.number="prix" />
  <button @click="quantite++">+1</button>
  <p>Total : {{ total }} €</p>
</template>