<template>
  <div class="flex flex-row justify-between text-white">
    <div
      class="flex flex-row place-items-center flex-initial my-5 ml-5 space-x-5 "
    >
      <img
        style="width:70px"
        src="https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
        alt=""
      />
      <div class="flex flex-col">
        <div>Song</div>
        <div>Band</div>
      </div>
      <i>heart</i>
    </div>
    <div class="flex flex-row flex-initial  place-items-center">
      <div class="flex flex-col ">
        <div class="space-x-2">
          <button>shuffle</button>
          <button>previous</button>
          <button>play/pause</button>
          <button>next</button>
          <button>repeat</button>
        </div>
        <div>
          player bar
        </div>
      </div>
    </div>
    <div class="flex flex-row flex-initial place-items-center space-x-2">
      <button>volume button</button>
      <div>volume slider</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlaylistFooter"
});
</script>
