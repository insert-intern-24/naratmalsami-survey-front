<script>
  import { fly } from 'svelte/transition';
  import { push } from "svelte-spa-router";
</script>

<main>
  <div in:fly={{ y: 200, duration: 500 }} out:fly={{ y: -200, duration: 500 }}>
    응답 감사합니다!<br/>
    <button on:click={() => push("/survey")}>
      추가 응답하기 ▶︎
    </button>
  </div>
</main>

<style lang="scss">
  @use "../styles/_mixins.scss" as mixins;
  @use "../styles/_variables.scss" as var;
  @use "../styles/functions" as *;

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
      color: var.$primary-color;
      font-size: px-to-rem(64);
      font-weight: bold;
      padding: px-to-rem(24) px-to-rem(32);
      background: white;
      border-radius: 999px;
      border: none;
    }
  }
</style>
