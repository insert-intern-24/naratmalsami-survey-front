<script>
  import { onMount } from "svelte";
  import { blur } from "svelte/transition";

  let words = [];
  let loading = true;
  let error = null;

  // API 호출 및 데이터 정제 함수
  onMount(async () => {
    try {
      console.log("test")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sheet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
          who: localStorage.getItem("who") || null,
        })
      });
      if (!response.ok) {
        throw new Error("API 호출 실패");
      }

      const result = await response.json();

      // who값 로컬스토리지에 저장
      localStorage.setItem("who", result.who);

      // 정제된 데이터만 추출
      words = result.data.map((item) => ({
        word_id: item.word_id,
        original_word: item.original_word,
        refined_word: item.refined_word,
        meaning: item.meaning
      }));
    } catch (err) {
      error = err;
    } finally {
      loading = false;
    }
  });

  $: question_id = 0;
  $: originWord = words[question_id]?.original_word ?? "";
  $: refinedWord = words[question_id]?.refined_word ?? "";
  $: meaning = words[question_id]?.meaning ?? "";

  // 단어 끝말에 종성이 있는지 확인하는 함수
  function isJongseong(char) {
    char = char.slice(-1);
    const unicodeVal = char.charCodeAt(0) - "가".charCodeAt(0);
    const jongseongIndex = unicodeVal % 28;
    return jongseongIndex !== 0 ? 1 : 0;
  }

  let answer = {};
  function nextQuestion(answer_rating) {
    answer[question_id] = {
      word_id: words[question_id].word_id,
      rating: answer_rating
    };

    console.log(answer[question_id].word_id);

    if (question_id === words.length - 1) {
      try {
        fetch(`${import.meta.env.VITE_API_URL}/voted`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            who: localStorage.getItem("who"),
            words: Object.values(answer).map(({ word_id, rating }) => ({ word_id, rating }))
          })
        });
      } catch (err) {
        console.error(err);
      }
    }

    question_id += 1;
  }
</script>

<main class="container">
  {#if loading}
    <h1>로딩 중...</h1>
  {:else if error}
    <h1>오류 발생: {error}</h1>
  {:else}
    <div class="question-box">
      <header class="question-header">{words.length - question_id}개의 질문이 남았어요</header>
      <div class="question-content">
        <h1>
          <span>{originWord}</span>{isJongseong(originWord) ? "을" : "를"}<br />
          <span>{refinedWord}</span>{isJongseong(refinedWord) ? "으로" : "로"}
          다듬었을 때<br />
          자연스럽다 생각하십니까?
        </h1>
        <h2>{meaning}</h2>

        <div class="rating-container">
          <ul class="rating-list">
            {#each [1, 2, 3, 4, 5] as num}
              <li class="rating-item" on:click={() => nextQuestion(num)}>
                {num}
              </li>
            {/each}
          </ul>
          <div class="rating-labels">
            <span>전혀 그렇지 않다</span>
            <span>매우 그렇다</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>

<style lang="scss">
  @use "../styles/_mixins.scss" as mixins;
  @use "../styles/_variables.scss" as var;
  @import "../styles/functions";

  h1 {
    @include mixins.text("light");
    font-size: px-to-rem(40);
    margin: 0px;
  }

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
      span {
        color: var.$primary-color;
      }
    }

    h2 {
      color: var.$description-color;
      font-weight: 400;
      margin: 0px;
      font-size: px-to-rem(24);
      max-width: 50rem;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  }

  .rating-container {
    max-width: calc(px-to-rem(60) * 5 + px-to-rem(18) * 4 + px-to-rem(1) * 10);
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
