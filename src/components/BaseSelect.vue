<template>
  <div>
      <label v-if="label">{{ label }}</label>
      <select
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
      @change="updateValue">
      <option v-for="option in options"
        :selected="option === value"
        :value="option"
        :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        options: {
            type: Array,
            required: true
        },
        label: String,
        value: [String, Number]
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