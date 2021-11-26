<script setup>
import { useApp } from '@/composables/useApp';
import { usePlugins } from '@/composables/usePlugins';

const props = defineProps(['plugin']);
const { explore } = useApp();
const { getPluginInfo } = usePlugins();
const info = getPluginInfo(props.plugin);
</script>

<template>
  <Block class="hover-border">
    <div class="flex items-center mb-1">
      <a
        :href="info.website"
        target="_blank"
        class="flex items-center"
      >
        <UiAvatar
          class="mr-2 mb-2"
          :imgsrc="info.icon"
          :seed="info.name.charCodeAt()"
          size="28"
        />
        <h3 v-text="info.name" />
      </a>
      <div class="ml-1">v{{ info.version }}</div>
    </div>
    <div class="text-color">
      <div>
        <a
          :href="`https://github.com/${info.author}`"
          target="_blank"
          class="text-color"
        >
          <Icon name="github" class="mr-1" />
          {{ info.author }}
        </a>
      </div>
      {{ $tc('inSpaces', [_n(explore.plugins[plugin])]) }}
    </div>
  </Block>
</template>
