<template>
  <div class="about">
    <h1>Sudoku</h1>
  </div>
  <div
    class="container mx-auto"
    id="id_container"
    style="text-align: center; width: 95%; height: 70%; margin: 0 auto"
  >
    <Sudoku />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Sudoku from "@/components/Sudoku.vue";

  export default defineComponent({
    name: "AboutView",
    components: {
      Sudoku,
    },
  });
</script>
