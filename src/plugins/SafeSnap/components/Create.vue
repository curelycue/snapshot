<script setup>
import { clone } from '@snapshot-labs/snapshot.js/src/utils';

const props = defineProps({
  form: Object,
  space: Object,
  preview: Boolean
});

const emit = defineEmits(['update:form']);

// const isValidInput = input => {
//   return input.safes.every(
//     safe => safe.txs.length === 0 || safe.txs.flat().every(tx => tx)
//   );
// };

const coerceConfig = (config, network) => {
  if (config.safes) return config;

  // map legacy config to new format
  return {
    safes: [{ network, realityAddress: config.address }]
  };
};

const updateSafeTransactions = (/** safeIndex */) => {
  if (props.preview) return;
  // props.form.safes[safeIndex].txs;
  // props.form.valid = isValidInput(props.form);
  emit('update:form', props.form);
};

const initialValue = {
  safes: coerceConfig(props.config, props.network).safes.map(safe => ({
    ...safe,
    txs: []
  })),
  valid: true
};

const input = props.modelValue ? clone(props.modelValue) : initialValue;
</script>

<template>
  <div
    v-if="!preview || input.safes.length > 0"
    class="border-t border-b md:border rounded-none md:rounded-md mb-4 block-bg"
  >
    <h4
      class="px-4 pt-3 border-b block header-bg rounded-t-none md:rounded-t-md"
      style="padding-bottom: 12px"
    >
      {{ $t('safeSnap.transactions') }}
    </h4>
    <div class="p-4">
      <div v-for="(safe, index) in input.safes" v-bind:key="index">
        <PluginSafeSnapSafeTransactions
          v-if="!preview || safe.txs.length > 0"
          :preview="preview"
          :proposal="proposal"
          :network="safe.network"
          :realityAddress="safe.realityAddress"
          :modelValue="safe.txs"
          @update:modelValue="updateSafeTransactions(index, $event)"
        />
      </div>
    </div>
  </div>
</template>
