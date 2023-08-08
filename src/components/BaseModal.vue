<template>
  <div
      class="backdrop"
      @click="clickOutside"
  >
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  methods: {
    /**
     * Закрывает модальное окно при клике вне его
     * @param event
     */
    clickOutside(event) {
      if (event.target.classList.contains('backdrop')) {
        this.$emit('close');
      }
    }
  }

}
</script>

<style scoped lang="scss">
.backdrop{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.modal{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  box-shadow: -1px -1px 83px 35px rgba(94, 32, 245, 0.2);
  border-radius: 10px;
  padding: 30px;
  z-index: 1;
  background: hsl(210deg, 30%, 8%);
}
</style>