<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
    validator: (value) =>
      ["info", "warning", "danger", "success"].includes(value),
  },
});

const badgeClass = computed(() => `badge--${props.type}`)
</script>

<template>
  <span class="badge" :class="badgeClass">
    <slot>Statut inconnu</slot>
  </span>
</template>

<style scoped>
.badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}
.badge--info {
  background: var(--blue);
  color: #000;
}
.badge--danger {
  background: var(--red);
  color: #fff;
}
.badge--warning {
  background: var(--amber);
  color: #000;
}
.badge--success {
  background: var(--green);
  color: #000;
}
</style>
