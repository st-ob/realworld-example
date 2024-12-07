<script lang="ts">
    interface Feed {
        name: string;
        articleList : []
    }
    let {name, articleList} = $props();
    //let selectedTags = $state()
</script>

<section>
    <h2>{name}</h2>
    <div class="tagList">
        <!--{#each selectedTags as tag}-->
            <button>Tag 1</button>
         <!--{/each}-->
    </div>
    <div class="articleList">
        {#each articleList as article}
            <div class="articleCard">
                <div class="imgPlaceholder"></div>
                <div class="textBox">
                    <h3>{article.title}</h3>
                    <p>{article.description.substring(0, 100) + " ..."}</p>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    section {
        display: flex;
        padding: 12px;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;

        border-radius: var(--rounded-3xl, 24px);
        background: var(--green-100, #DEF7EC);

        /* shadow-md */
        box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(0, 0, 0, 0.05);
    }
    h2 {
        color: #000;
        text-align: center;

        /* text-2xl/font-bold */
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 36px */
        letter-spacing: -0.24px;
    }
    .tagList {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        align-self: stretch;
    }
    button {
        display: flex;
        height: 21px;
        padding: 5px 10px;
        justify-content: center;
        align-items: center;
        gap: 10px;

        border-radius: 10px;
        background: var(--green-500, #0E9F6E);
    }
    .articleList {
        display: flex;
        padding-top: 15px;
        align-items: flex-start;
        align-content: flex-start;
        gap: 20px;
        align-self: stretch;
        flex-wrap: wrap;
    }
    .articleCard {
        display: flex;
        width: 200px;
        height: 200px;
        flex-direction: column;
        align-items: flex-start;

        border-radius: var(--rounded-3xl, 24px);
        background: #FFF;   
    }
    .imgPlaceholder {
        flex: 1 0 0;
        align-self: stretch;
        background: url("/articleImg.jpg") lightgray 50% / cover no-repeat, #D9D9D9;
    }
    .textBox {
        display: flex;
        padding: 0px 10px 10px 10px;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
    }
    h3 {
        align-self: stretch;

        color: var(--green-500, #0E9F6E);

        /* text-base/font-bold */
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 24px */
    }
    p {
        align-self: stretch;

        color: var(--black, #000);

        /* text-xs/font-medium */
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 18px */
    }
</style>