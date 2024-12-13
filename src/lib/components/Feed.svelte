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
            <a href="/auth">
                <div class="articleCard">
                    <h3>{article.title}<iconify-icon icon="tabler:leaf"></iconify-icon></h3>
                    <p>{article.description.substring(0, 100) + " ..."}</p>
                </div>
            </a>
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
    button:hover {
        background: var(--green-200, #BCF0DA);
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
        overflow: hidden;
    }
    .articleCard:hover {
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
    }
    .articleCard:not(:hover) iconify-icon {
        display: none;
    }
    h3 {
        flex: 3 0 0;
        align-self: stretch;
        background: url("articleImg.jpg") darkgreen 70%;
        padding: 0px 10px 10px 10px;
        display: flex;
        justify-content: flex-start; /* Aligns horizontally to the left */
        align-items: flex-end;
        position: relative;

        color: var(--green-500, #0E9F6E);

        /* text-base/font-bold */
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 24px */
    }
    iconify-icon {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    iconify-icon:hover {
        background-color: #0E9F6E;
    }
    p {
        flex: 2;
        align-self: stretch;
        padding: 0px 10px 10px 10px;

        color: var(--black, #000);

        /* text-xs/font-medium */
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 18px */
    }
    a {
        text-decoration: none;
    }
</style>