<template>
  <div class="flex flex-col">
    <label v-if="label" :for="id" class="mb-2 text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <!-- icon slot / class -->
      <span v-if="icon" class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <i :class="icon" aria-hidden="true"></i>
      </span>

      <!-- PrimeVue Dropdown bound to vee-validate field value -->
      <Dropdown
        :id="id"
        v-model="value"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :placeholder="placeholder"
        :filter="filter"
        :multiple="multiple"
        :showClear="clearable"
        :disabled="disabled"
        class="w-full"
        :style="icon ? 'padding-left: 2.5rem;' : ''"
        @blur="handleBlur"
      />
    </div>

    <!-- validation message -->
    <p v-if="errorMessage" class="mt-1 text-sm text-red-500">{{ errorMessage }}</p>

    <!-- hint / help text -->
    <p v-else-if="hint" class="mt-1 text-sm text-muted-500 text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup>
/*
  Requirements:
    - Vue >= 3.4 (defineModel)
    - PrimeVue Dropdown registered (or globally installed)
    - vee-validate v4 (useField)
    - Tailwind v4
*/

import { watch, computed } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useField } from 'vee-validate'

// props
const props = defineProps({
  name: { type: String, required: true }, // vee-validate field name
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] }, // [{ label, value }, ...]
  optionLabel: { type: String, default: 'label' },
  optionValue: { type: String, default: 'value' },
  placeholder: { type: String, default: 'Select...' },
  rules: { type: [String, Object, Function], default: undefined },
  multiple: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  filter: { type: Boolean, default: false },
  icon: { type: String, default: '' }, // e.g. "pi pi-globe" or "fas fa-user"
  hint: { type: String, default: '' },
  id: { type: String, default: null },
  initial: { default: null }, // initial value fallback
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
})

// v-model via defineModel (Vue 3.4+)
const model = defineModel() // returns a ref that's synced with parent v-model

// vee-validate field
// pass a reactive name so changes to props.name work if ever changed
const { value, errorMessage, meta, handleChange, handleBlur, resetField } = useField(
  () => props.name,
  props.rules,
  { initialValue: model.value ?? props.initial ?? null },
)

// keep the defineModel (parent v-model) in sync with vee-validate field.value
//  - when internal value changes -> update parent model
watch(value, (v) => {
  if (model.value !== v) model.value = v
})

//  - when parent (model) changes externally -> update field value (do not revalidate by default)
watch(model, (v) => {
  // handleChange exists to mutate the field value in a way vee-validate expects.
  // pass `false` as 2nd arg to avoid immediate validation or `true` if you want validate instantly.
  if (value.value !== v) handleChange(v, false)
})

// expose some helpful computed states (optional)
const hasError = computed(() => meta.touched && !!errorMessage.value)

// local ID fallback
const id = props.id || `select-${Math.random().toString(36).slice(2, 8)}`
</script>

<style scoped>
/* small visual polish — tailwind handles most; keep styles minimal */
</style>
