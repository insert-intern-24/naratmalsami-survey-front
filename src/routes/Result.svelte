<script>
  import { fly } from 'svelte/transition';
  import { push } from "svelte-spa-router";
</script>

<main>
  <div in:fly={{ y: 200, duration: 500 }} out:fly={{ y: -200, duration: 500 }}>
    응답 감사합니다!<br/>
    <button on:click={() => push("/survey")}>
      <img src="src/assets/more.png" alt="more" />
    </button>
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

    button {
      background: none;
      border: none;
    }
  }
</style>
