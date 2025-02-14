<main>
  <div>
    끝
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
