<script>
export default {
  name: "TaskForm",
  emits: ["add-task"],
  data() {
    return {
      title: "",
      description: "",
      priority: "",
    };
  },
  computed: {
    isValid() {
      return this.title.length >= 3;
    },
  },
  methods: {
    submit() {
      if (!isValid) return;
      this.$emit("add-task", {
        title: this.title,
        description: this.description,
        priority: this.priority,
      });
      this.title = "";
      this.description = "";
      this.priority = "Moyenne";
    },
  },
};
</script>


<template>
    <form class="task-form" @submit.prevent="submit">
        <input v-model.trim="title" type="text" placeholder="Titre (3 carac. min.)" />
        <textarea v-model.trim="description" rows="2" placeholder="Description (facultative)"></textarea>
        <select v-model="priority">
            <option>Haute</option>
            <option>Moyenne</option>
            <option>Basse</option>
        </select>
        <button type="submit" :disabled="!isValid">Ajouter</button>
    </form>
</template>