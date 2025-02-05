<main>
  <div>
    <header>5개의 질문이 남았어요</header>
    <div>
      <h1>
        <span>템퍼링</span>을<br /><span>사전 접촉 금지 위반</span>으로 다듬었을
        때<br />자연스럽다 생각하십니까?
      </h1>
      <h2>탬퍼링은 무단으로 변경하거나 조작하는 행위를 의미합니다</h2>
      <div>
        <ul>
          {#each [1, 2, 3, 4, 5] as num}
            <li on:click={() => handleClick(num)}>{num}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  @use "../styles/_mixins.scss" as mixins;
  @use "../styles/_variables.scss" as var;
  @import "../styles/functions";

  main {
    @include mixins.background("light");

    div {
      display: flex;
      gap: 1.5rem;
      flex-direction: column;
      align-items: flex-start;
      header {
        background-color: var.$primary-color;
        color: var.$secondary-color;
        padding: px-to-rem(18) px-to-rem(24);
        font-size: px-to-rem(32);
        border-radius: 50px;
        line-height: px-to-rem(32);
      }
      div {
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
        div {
          ul {
            display: flex;
            padding: 0px;
            gap: px-to-rem(18);
            li {
              display: flex;
              width: 60px;
              height: 60px;
              padding: 20px;
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

            li:hover {
              background-color: var.$primary-color;
              color: white;
            }
          }
        }
      }
    }
  }
</style>
