<template>
  <div class="temperature-data">
    <h2>Записи состояния датчика температуры</h2>
    <div class="flex">
      <div>
        <input
            type="number"
            v-model="temperature"
            @keydown.enter="addNewRecord"
        /> °C
        <div v-if="error" class="error">{{error}}</div>
      </div>

      <button @click="addNewRecord">Добавить запись</button>
    </div>
    <TableWithTemperature v-if="temperatureRecords.length"/>
    <p v-else>Нет записей</p>
  </div>
</template>

<script>
import TableWithTemperature from "@/components/TableWithTemperature.vue";
import {useTemperatureStore} from "@/stores/temperature";
import {mapState, mapActions} from "pinia";
import {MAX_TEMP, MIN_TEMP} from "@/settings";

export default {
  name: "TemperatureTracking",
  components: {TableWithTemperature},
  data() {
    return {
      temperature: null,
      error: ''
    }
  },
  computed: {
    ...mapState( useTemperatureStore, ['temperatureRecords'])
  },
  watch: {
    temperature() {
      this.error = '';
    }
  },
  mounted() {
    this.loadFromLocalStorage()
  },
  methods: {
    ...mapActions(useTemperatureStore, ['addTemperatureRecord', "loadFromLocalStorage"]),

    /**
     * Добавляет новую запись в таблицу
     */
    addNewRecord() {
      if(this.temperature === null || Number(this.temperature) !== this.temperature){
        this.error = 'Введите температуру';
        return
      }
      if (this.temperature < MIN_TEMP || this.temperature > MAX_TEMP) {
        this.error = `Температура должна быть в диапазоне от ${MIN_TEMP} до ${MAX_TEMP}`;
        return
      }
      this.addTemperatureRecord({
        id: Math.max(...this.temperatureRecords.map(el => el.id), 0) + 1,
        date: new Date().toLocaleString(),
        temperature: this.temperature
      })
      this.temperature = null;
    }
  }
}
</script>

<style scoped lang="scss">
.temperature-data{
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 30px;
  color: white;
  input{
    border-bottom: 3px solid whitesmoke;
    border-right: none;
    border-left: none;
    border-top: none;
    padding: 10px;
    color: white;
    transition: all 0.2s ease;
    background: hsl(210deg, 30%, 8%);
    &:focus-visible {
      outline: none;
      border-bottom: 3px solid hsl(260deg, 100%, 55%);
    }
  }
  button {
    position: relative;
    color: white;
    text-shadow: rgba(0, 0, 0, 0.15) 1px 1px 1px;
    font-size: 18px;
    height: 60px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: hsl(325deg, 100%, 48%);
    border: 1px solid hsl(325deg, 100%, 48%);
    backface-visibility: hidden;
    width: 175px;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    &:hover {
      background: hsl(325, 99%, 40%);
      border: 1px solid hsl(325, 99%, 40%);
    }
  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 2px;
    left: 6px;
    right: 6px;
    height: 20%;
    background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
    border-radius: 20px 20px 100px 100px / 14px 14px 30px 30px;
    pointer-events: none;
  }
    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      bottom: 0px;
      left: 0px;
      right: 0px;
      height: 30%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.17));
      border-radius: 0px 0px 4px 4px;
      pointer-events: none;
    }
  }

}

</style>