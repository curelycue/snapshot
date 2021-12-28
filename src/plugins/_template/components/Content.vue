<script setup>
import useMyPlugin from '..';

const { sayHello } = useMyPlugin();

const props = defineProps({
  proposal: Object
});

sayHello(props.proposal.title);
</script>

<template>
  <h3>My Plugin</h3>
</template>
