<script setup>
const model = defineModel({ type: String, default: "Toutes" })
const options = ["Toutes", "Haute", "Moyenne", "Basse"]
</script>

<template>
  <label class="task-filter">
    Priorité:
    <select v-model="model">
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </label>
</template>

<style scoped>
.task-filter {
  color: var(--muted);
}
.task-filter select {
  margin-left: 0.5rem;
  padding: 0.3rem;
  background: var(--card);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 6px;
}
</style>
