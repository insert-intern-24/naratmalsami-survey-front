<!-- Index.svelte -->
<script>
  import '../styles/variables.scss';
</script>


<main>
  <h1 class="text-color">안녕하세요 반가워요!</h1>
</main>

<style lang="scss">
  main {
    min-height: 100dvh;
    min-width: 100dvh;
    background-size: cover;
    background-image: url('../assets/background.png');
    background-attachment: fixed;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 6rem;
    }
  }
</style>