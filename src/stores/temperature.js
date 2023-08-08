import {defineStore} from "pinia";

export const useTemperatureStore = defineStore('temperature', {
    state: () => ({
        temperatureRecords: [],
    }),
    getters: {},
    actions: {
        saveToLocalStorage() {
            localStorage.setItem('temperatureRecords', JSON.stringify(this.temperatureRecords))
        },
        loadFromLocalStorage() {
            const records = localStorage.getItem('temperatureRecords')
            if (records) {
                this.temperatureRecords = JSON.parse(records)
            }
        },
        /**
         * Удаляет запись из таблицы
         * @param record
         */
        removeTemperatureRecord(record) {
            this.temperatureRecords.splice(
                this.temperatureRecords.indexOf(record),
                1
            )
            this.saveToLocalStorage()
        },
        addTemperatureRecord(record) {
            this.temperatureRecords.push(record)
            this.saveToLocalStorage()
        },
        /**
         * Обновляет запись в таблице
         * @param record
         */
        updateTemperatureRecord(record) {
            const index = this.temperatureRecords.findIndex(r => r.id === record.id)
            this.temperatureRecords[index] = record
            this.saveToLocalStorage()
        }
    }
})
