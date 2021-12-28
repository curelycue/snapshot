<script setup>
defineProps({
  proposal: Object
});
</script>

<template>
  <div class="text-right">
    <UiButton>Open "{{ proposal.title }}" Github</UiButton>
  </div>
</template>
