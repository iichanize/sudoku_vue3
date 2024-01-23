<template>
  <table id="table">
    <tr v-for="(lines, index1) in field" v-bind:key="index1">
      <td
        v-for="(num, index2) in lines"
        v-bind:key="index2"
        v-bind:id="tableId(index1, index2)"
      >
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
  import { correctFieldStore } from "@/store/CorrectFieldStore";
  import { fieldStore } from "@/store/FieldStore";

  export default defineComponent({
    name: "HelloWorld",
    props: {
      msg: String,
    },
    setup(props, ctx) {
      const correctStore = correctFieldStore();
      const nowStore = fieldStore();
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
        nowStore.update(JSON.parse(JSON.stringify(field.value)));
        return;
      };
      const buttonId = (index1: number, index2: number) => {
        const value = index1 * 9 + index2;
        return "button" + String(value);
      };
      const tableId = (index1: number, index2: number) => {
        const value = index1 * 9 + index2;
        return "td" + String(value);
      };
      const initField = () => {
        field.value = solver.initField(field.value);
      };
      const openRandomSquare = () => {
        field.value = solver.openRandomSquare(field.value);
      };
      initField();
      correctStore.update(JSON.parse(JSON.stringify(field.value)));
      openRandomSquare();
      nowStore.update(JSON.parse(JSON.stringify(field.value)));

      return {
        buttonId,
        tableId,
        countUp,
        field,
        initField,
        openRandomSquare,
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

  #td2,
  #td5,
  #td11,
  #td14,
  #td20,
  #td23,
  #td29,
  #td32,
  #td38,
  #td41,
  #td47,
  #td50,
  #td56,
  #td59,
  #td65,
  #td68,
  #td74,
  #td77 {
    border-right: 3px solid #ccc !important;
  }
  #td27,
  #td28,
  #td29,
  #td30,
  #td31,
  #td32,
  #td33,
  #td34,
  #td35,
  #td54,
  #td55,
  #td56,
  #td57,
  #td58,
  #td59,
  #td60,
  #td61,
  #td62 {
    border-top: 3px solid #ccc !important;
  }
</style>
