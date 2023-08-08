<template>
  <BaseModal
      @close="$emit('cancel')"
  >
    <div class="confirm">
      <h3>{{title}}</h3>
      <p>{{message}}</p>
      <div class="flex">
        <button @click="$emit('confirm')">Подтвердить</button>
        <button @click="$emit('cancel')">Отменить</button>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";

export default {
  name: "ConfirmActionModal",
  components: {BaseModal},
  emits: ['confirm', 'cancel'],
  props:{
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
  },


}
</script>

<style scoped lang="scss">
.confirm{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: white;
  button{
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid hsl(260deg, 100%, 55%);
    background-color:  hsl(210deg, 30%, 8%);
    color: white;
    cursor: pointer;
    &:hover{
      background-color: #212020;
    }
  }
}

</style>