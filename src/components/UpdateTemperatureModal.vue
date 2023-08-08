<template>
  <BaseModal
      @close="$emit('cancel')"
  >
    <div class="update-temperature">
      <h3>{{ title }}</h3>
      <input
          type="number"
          v-model="temperature"
          @keydown.enter="$emit('save', temperature)"
      />
      <div
          v-if="error"
          class="error"
      >
        {{ error }}
      </div>
      <div class="flex">
        <button @click="saveTemperature">Сохранить</button>
        <button @click="$emit('cancel')">Отменить</button>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";
import {MAX_TEMP, MIN_TEMP} from "@/settings";

export default {
  name: "UpdateTemperatureModal",
  components: {BaseModal},
  emits: ['save', 'cancel'],
  props: {
    record: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      temperature: this.record.temperature,
      error: ''
    }
  },
  watch: {
    temperature() {
      this.error = '';
    }
  },
  methods: {
    saveTemperature() {
      if(this.temperature === null || Number(this.temperature) !== this.temperature){
        this.error = 'Введите температуру';
        return
      }
      if (this.temperature < MIN_TEMP || this.temperature > MAX_TEMP)  {
        this.error = `Температура должна быть в диапазоне от ${MIN_TEMP} до ${MAX_TEMP}`;
        return
      }
      this.$emit('save', this.temperature)
    }
  }
}
</script>

<style scoped lang="scss">
.update-temperature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: white;

  button {
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid hsl(260deg, 100%, 55%);
    background-color: hsl(210deg, 30%, 8%);
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #212020;
    }
  }

  input {
    border: 3px solid whitesmoke;
    padding: 10px;
    text-align: center;
    width: 100px;
    color: white;
    transition: all 0.2s ease-in-out 0s;
    background: hsl(210deg, 30%, 8%);

    &:focus-visible {
      outline: none;
      border: 3px solid hsl(260deg, 100%, 55%);
    }
  }
}

</style>