<script setup>
import TaskCard from './TaskCard.vue'

defineProps({
  tasks: { type: Array, required: true }
})
// Événements relayés vers le parent
const emit = defineEmits(['delete-task', 'toggle-task'])
</script>

<template>
  <div class="task-list">
    <!-- Une carte par tâche ; $event = l'id émis par la carte, relayé... -->
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" @delete-task="emit('delete-task', $event)" @toggle-task="emit('toggle-task', $event)" />
  </div>
</template>

<style scoped>
.task-list { display: grid; gap: 0.75rem; }
</style>