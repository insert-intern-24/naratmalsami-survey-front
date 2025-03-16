<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { backOut } from "svelte/easing";
  import { push } from "svelte-spa-router";

  let text_number = 0;

  const texts = [
    "클릭으로 넘어가요!\n",
    "안녕하세요 반가워요!\n",
    "저희는 납득 가능한\n외래어 순화AI를 제작하고 있어요",
    "AI를 학습시키기 위해서는\n많은 데이터가 필요해요",
    "여러분의 도움이 필요해요!",
    "다음 페이지부터\n 국립국어원에서 제시한\n 다듬은 말에 대한 만족도를\n 선택해주시면 되요"
  ];

  function changeText() {
    if (text_number < texts.length - 1) {
      text_number = (text_number + 1) % texts.length;
    } else {
      push("/survey");
    }
  }

  function translateText(text) {
    return text
      .replace(/\n/g, "<br/>")
      .replace(
        /국립국어원/g,
        '<img alt="국립국어원" src="/국립국어원.png" style="margin-right: 10px; margin-bottom: -13px; height: 5.9375rem; width: auto;"/>'
      );
  }

  onMount(async () => {
    try {
      const who = localStorage.getItem("who") || "";
      if (who === "") {
        throw new Error("who값이 없습니다.");
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ranking/${who}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        }
      });
      if (!response.ok) {
        throw new Error("API 호출 실패");
      }

      const result = await response.json();
      if (result.ranking <= 0) {
        alert("투표자님은 순위권에 들지 못했습니다. 참여해주셔서 감사합니다");
        return;
      }
      alert(`안녕하세요!, 투표자님의 순위는 ${result.ranking}등 입니다.\n투표에 참가해주셔서 감사합니다.\n디스코드 아이디 ${import.meta.env.VITE_DISCORD}으로 인증코드 ${result.code}를 보내주시면 보상을 증정하겠습니다!\n 인증코드 유출 시 보상은 지급되지 않습니다. (3월 22일까지 연락해주세요)`);
    } catch (err) {
      console.error(err);
    }
  });
</script>

<main on:click={changeText} aria-hidden="true">
  {#key text_number}
    <div
      in:fly={{
        y: 100,
        delay: 200,
        easing: backOut,
        duration: 700
      }}
      out:fly={{
        y: -100,
        delay: 200,
        easing: backOut,
        duration: 700
      }}
    >
      {@html translateText(texts[text_number])}
    </div>
  {/key}
</main>

<style lang="scss">
  @use "../styles/_mixins.scss" as mixins;
  main {
    @include mixins.background("dark");

    div {
      @include mixins.text("dark");
      font-size: 5rem;
      user-select: none;
      text-align: left;
      position: absolute;
      cursor: pointer;
    }
  }
</style>
