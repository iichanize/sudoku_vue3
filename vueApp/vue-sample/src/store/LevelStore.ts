import { defineStore } from "pinia";

export const LevelStore = defineStore("level", {
  state: () => {
    return {
      id: "level",
      level: "NORMAL",
    };
  },
  getters: {
    getLevel(state) {
      return state.level;
    },
  },
  actions: {
    update(newLevel: string) {
      this.level = newLevel;
    },
  },
});

export const ResetStore = defineStore("reset", {
  state: () => {
    return {
      id: "reset",
      value: false,
    };
  },
  getters: {
    getValue(state) {
      return state.value;
    },
  },
  actions: {
    update() {
      this.value = !this.value;
    },
  },
});
