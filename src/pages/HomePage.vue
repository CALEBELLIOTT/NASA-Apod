<template>
  <div class="row">
    <div class="col-12 text-light d-flex flex-column align-items-center justify-content-center">
      <h1 class="pt-5">{{ image.date }}</h1>
      <h2 class="">"{{ image.title }}"</h2>
      <p class="p-5 description-text">{{ image.explanation }}</p>
    </div>
    <div class="col-12 d-flex justify-content-center">
      <form action="" @submit.prevent="changeDate" class="d-flex">
        <input type="date" class="form-control mx-2" :max="new Date().toJSON().slice(0, 10)" id="date" name="date"
          required>
        <button class="btn btn-light" type="submit"><i class="mdi mdi-check"></i></button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue"
import { AppState } from "../AppState"
import { imagesService } from "../services/ImagesService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"

export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await imagesService.getImage()
        document.getElementById('app').style.backgroundImage = `url('${AppState.image.hdurl}')`;
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    })
    return {
      image: computed(() => AppState.image),
      setImage() {
        console.log(document);
      },
      async changeDate() {
        try {
          await imagesService.changeDate(window.event.target.date.value)
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }

  }



}

.description-text {
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.911);
  text-shadow: 0 0 2px black;
}
</style>
