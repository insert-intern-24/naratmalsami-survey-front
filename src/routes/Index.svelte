<script>
  import { fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import { push } from 'svelte-spa-router';
  import '../styles/variables.scss';

  let text_number = 0;
  
  const texts = [
    '클릭으로 넘어가요!\n',
    '안녕하세요 반가워요!\n',
    '저희는 납득 가능한\n외래어 순화AI를 제작하고 있어요',
    'AI를 학습시키기 위해서는\n많은 데이터가 필요해요',
    '여러분의 도움이 필요해요!',
    '다음 페이지부터\n 국립국어원에서 제시한\n 다듬은 말에 대한 만족도를\n 선택해주시면 되요'
  ];

  function changeText() {
    if (text_number < texts.length - 1){
      text_number = (text_number + 1) % texts.length;
    }
    else {
      push('/survey');
    }
  };

  function translateText(text) {
    return text
      .replace(/\n/g, "<br/>")
      .replace(/국립국어원/g, '<img alt="국립국어원" src="src/assets/국립국어원.png" style="margin-right: 10px; margin-bottom: -13px"/>')
  };

</script>

<main on:click={changeText} class="dark-background">
  {#key text_number}
    <div
      class="dark-text"
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
    position: relative; 

    div {
      user-select: none;
      cursor: pointer;
      font-size: 6rem;
      color: #fff;
      text-align: left;
      position: absolute;
      font-weight: bold;
    }
  }

</style>
