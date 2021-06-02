<template>
  <div>
      <label v-if="label">{{ label }}</label>
      <input
      :id="value"
      :value="value"
      v-bind="$attrs"
      @input="updateValue"
      v-on="listeners"/>
  </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        label: String,
        value: [String, Number]
    },

    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.updateValue
            }
        }
    },

    methods: {
        updateValue(event){
            this.$emit('input', event.target.value)
        }
    }
}
</script>

<style>

</style>