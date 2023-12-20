<template>
  <table id="table">
    <tr v-for="(lines, index1) in field" v-bind:key="index1">
      <td v-for="(num, index2) in lines" v-bind:key="index2">
        <button
          v-bind:id="buttonId(index1, index2)"
          name="box"
          @click="countUp(index1, index2)"
        >
          {{ num }}
        </button>
      </td>
    </tr>
  </table>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { SudokuSolver } from "./SudokuSolver";

  export default defineComponent({
    name: "HelloWorld",
    props: {
      msg: String,
    },
    setup(props, ctx) {
      let field = ref([
        ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ]);
      const solver: SudokuSolver = new SudokuSolver();
      const countUp = (index1: number, index2: number) => {
        console.log("push");
        if (field.value[index1][index2] == "-")
          field.value[index1][index2] = "0";
        let num = parseInt(field.value[index1][index2]) + 1;
        field.value[index1][index2] = num > 9 ? "-" : String(num);
        return;
      };
      const buttonId = (index1: number, index2: number) => {
        const value = index1 * 9 + index2;
        return "button" + String(value);
      };
      const initField = () => {
        field.value = solver.initField(field.value);
      };
      initField();

      return {
        buttonId,
        countUp,
        field,
        initField,
      };
    },
  });
</script>
<style>
  #table {
    margin: 0 auto;
    border-collapse: collapse;
    border: 3px solid #ccc;
  }

  #table td {
    border: 1px solid #ccc;
    height: 40px;
    width: 40px;
    text-align: center;
    vertical-align: middle;
  }

  button[id^="button"] {
    border: none;
    height: 40px;
    width: 40px;
    font-size: 32px;
    background-color: white;
    cursor: pointer;
  }
  button[id^="button"]:hover {
    background-color: #ccc;
  }
  button[id^="button"]:active {
    background-color: #aaa;
  }
</style>
