<script>
  $: originWord = "템퍼링";
  $: refinedWord = "사전 접촉 금지 위반";

  // 단어 끝말에 종성이 있는지 확인하는 함수
  function isJongseong(char) {
    char = char.slice(-1);
    const unicodeVal = char.charCodeAt(0) - '가'.charCodeAt(0);
    const jongseongIndex = unicodeVal % 28;
    return jongseongIndex !== 0 ? 1 : 0;
  }
</script>

<main class="container">
  <div class="question-box">
    <header class="question-header">5개의 질문이 남았어요</header>
    <div class="question-content">
      <h1>
        <span>{originWord}</span>{isJongseong(originWord) ? "을" : "를"}<br />
        <span>{refinedWord}</span>{isJongseong(refinedWord) ? "으로" : "로"} 다듬었을 때<br />
        자연스럽다 생각하십니까?
      </h1>
      <h2>탬퍼링은 무단으로 변경하거나 조작하는 행위를 의미합니다</h2>

      <div class="rating-container">
        <ul class="rating-list">
          {#each [1, 2, 3, 4, 5] as num}
            <li class="rating-item">{num}</li>
          {/each}
        </ul>
        <div class="rating-labels">
          <span>전혀 그렇지 않다</span>
          <span>매우 그렇다</span>
        </div>
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  @use "../styles/_mixins.scss" as mixins;
  @use "../styles/_variables.scss" as var;
  @import "../styles/functions";

  .container {
    @include mixins.background("light");
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .question-box {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(24);
    align-items: flex-start;
  }

  .question-header {
    background-color: var.$primary-color;
    color: var.$secondary-color;
    padding: px-to-rem(18) px-to-rem(24);
    font-size: px-to-rem(32);
    border-radius: 50px;
    line-height: px-to-rem(32);
  }

  .question-content {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(40);
    
    h1 {
      @include mixins.text("light");
      font-size: px-to-rem(40);
      margin: 0px;

      span {
        color: var.$primary-color;
      }
    }

    h2 {
      color: var.$description-color;
      font-weight: 400;
      margin: 0px;
      font-size: px-to-rem(24);
    }
  }

  .rating-container {
    max-width: calc(px-to-rem(60)*5 + px-to-rem(18)*4 + px-to-rem(1)*10);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: px-to-rem(12);

    .rating-list {
      display: flex;
      gap: px-to-rem(18);
      padding: 0px;
      margin: 0px;
      
      .rating-item {
        display: flex;
        width: px-to-rem(60);
        height: px-to-rem(60);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: px-to-rem(20);
        font-weight: 400;
        list-style: none;
        background: white;
        border-radius: 100%;
        border: 2px solid var.$primary-color;
        color: var.$primary-color;
        transition: 0.3s ease-in-out;
        cursor: pointer;
      }

      .rating-item:hover {
        background-color: var.$primary-color;
        color: white;
      }
    }

    .rating-labels {
      display: flex;
      justify-content: space-between;
      width: 100%;
      
      span {
        font-size: px-to-rem(14);
        color: var.$description-color;
      }
    }
  }
</style>
