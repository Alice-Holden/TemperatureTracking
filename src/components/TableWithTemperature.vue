<template>
    <ConfirmActionModal
        v-if="confirmDeletion"
        title="Удаление записи"
        message="Вы действительно хотите удалить запись?"
        @confirm="deleteRecord"
        @cancel="confirmDeletion = false"
    />
    <UpdateTemperatureModal
        v-if="updateTemperature"
        title="Редактирование записи"
        :record="recordForUpdate"
        @save="editTemperatureRecord"
        @cancel="updateTemperature = false"
    />
  <div class="table">
    <div class="table__thead">
      <div class="table__id row">ID</div>
      <div class="table__date row">Дата</div>
      <div class="table__temp row">°C</div>
      <div class="table__actions row">Действия</div>
    </div>
    <div
        class="table__body"
        v-for="record in temperatureRecords"
        :key="record.id"
    >
      <div class="table__id row">{{record.id}}</div>
      <div class="table__date row">{{record.date}}</div>
      <div  class="table__temp row">{{record.temperature}}</div>
      <div class="table__actions row">
        <div title="Редактировать запись">
          <img
              src="/icon/edit.svg"
              alt="edit"
              @click="openUpdateWindow(record)"
          />
        </div>
        <div title="Удалить запись">
          <img
            src="/icon/trash.svg"
            alt="trash"
            @click="openConfirmationWindow(record)"
        />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmActionModal from "@/components/ConfirmActionModal.vue";
import UpdateTemperatureModal from "@/components/UpdateTemperatureModal.vue";
import {mapActions, mapState} from "pinia";
import {useTemperatureStore} from "@/stores/temperature";

export default {
  name: "TableWithTemperature",
  components: {UpdateTemperatureModal, ConfirmActionModal},
  data() {
    return {
      confirmDeletion: false,
      recordForDeletion: null,
      updateTemperature: false,
      recordForUpdate: null
    }
  },
  computed: {
    ...mapState(useTemperatureStore, ['temperatureRecords'])
  },
  methods: {
    ...mapActions(useTemperatureStore, ['updateTemperatureRecord', 'removeTemperatureRecord']),
    /**
     * Обновляет температуру в записи
     * @param newTemperature
     */
    editTemperatureRecord(newTemperature) {
      this.updateTemperatureRecord({
        ...this.recordForUpdate,
        temperature: newTemperature
      });
      this.updateTemperature = false;
      this.recordForUpdate = null;
    },
    /**
     * Открывает окно подтверждения удаления записи
     * @param record
     */
    openConfirmationWindow(record) {
      this.confirmDeletion = true;
      this.recordForDeletion = record;
    },
    /**
     * Открывает окно редактирования записи
     * @param record
     */
    openUpdateWindow(record) {
      this.updateTemperature = true;
      this.recordForUpdate = record;
    },
    deleteRecord() {
      this.removeTemperatureRecord(this.recordForDeletion)
      this.confirmDeletion = false;
      this.recordForDeletion = null;
    }
  }
}
</script>

<style scoped lang="scss">
.table{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  color: white;
  max-height: calc(100vh - 200px);
  overflow-y: scroll;
  &__thead{
    position: sticky;
    top: 0;
    display: flex;
    margin: 1px;
    background: hsl(260deg, 100%, 55%);
    gap: 1px;
  }
  &__body{
    display: flex;
    margin: 1px;
    background: hsl(260deg, 100%, 55%);
    gap: 1px;
  }
  &__id{
    width: 50px;
  }
  &__date{
    width: 200px;
  }
  &__temp{
    width: 100px;
  }
  &__actions{
    width: 100px;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    div{
      width: 20px;
      height: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      img{
        width: 100%;
      }
      &:hover{
        transform: scale(1.1);
      }
    }
  }

}
.row {
  padding: 5px 10px;
  margin: 1px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: hsl(210deg, 30%, 8%);
}
.blur-table{
  filter: blur(5px);
}
</style>