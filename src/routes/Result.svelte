<script>
  import { fly } from 'svelte/transition';
</script>

<main>
  <div in:fly={{ y: 200, duration: 500 }} out:fly={{ y: -200, duration: 500 }}>
    응답 감사합니다!<br/>
    <img src="src/assets/more.png" alt="more" />
  </div>
</main>

<style lang="scss">
  @use "../styles/_mixins.scss" as mixins;
  main {
    @include mixins.background("dark");

    div {
      @include mixins.text("dark");
      font-size: 6rem;
      user-select: none;
      text-align: left;
      position: absolute;
      cursor: pointer;
    }
  }
</style>
