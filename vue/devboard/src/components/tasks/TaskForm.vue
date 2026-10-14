<script setup>
import { reactive, computed } from "vue";

const emit = defineEmits(["add-task"]);

const form = reactive({
  title: "",
  description: "",
  priority: "",
});

const isValid = computed(() => form.title.length >= 3);

const submit = () => {
  if (!isValid.value) return;
  emit("add-task", { ...form });
  Object.assign(form, { title: "", description: "", priority: "Moyenne" });
};
</script>

<template>
  <form class="task-form" @submit.prevent="submit">
    <input
      v-model.trim="form.title"
      type="text"
      placeholder="Titre (3 carac. min.)"
    />
    <textarea
      v-model.trim="form.description"
      rows="2"
      placeholder="Description (facultative)"
    ></textarea>
    <select v-model="form.priority">
      <option>Haute</option>
      <option>Moyenne</option>
      <option>Basse</option>
    </select>
    <button type="submit" :disabled="!isValid">Ajouter</button>
  </form>
</template>

<style scoped>
.task-form {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.task-form input,
.task-form textarea,
.task-form select {
  padding: 0.5rem;
  background: var(--card);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 6px;
}
</style>
