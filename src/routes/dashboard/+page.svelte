<script lang="ts">
    import type { PageData } from './$types';
    import Feed from '$lib/components/Feed.svelte';

    let { data }: { data: PageData } = $props();
    let articleList = [{
        title: "10 Environmental Disasters That Humans Have Caused",
        description: "From air pollution to oil spills, human-caused disasters can grow out of control. ",
        favorite: true
    }, 
    {
        title: "Three Types of Global Warming Solutions and Their Economic Benefits",
        description: "9 Global Warming Solutions You Can Do Today",
        favorite: false
    }];
</script>

<main>
    <Feed name="Global Feed" articleList={articleList} />
    <Feed name="Your Feed" articleList={articleList.filter(({favorite}) => favorite)} />
</main>

<style>
    main {
        display: flex;
        padding: 0px 10px;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        align-self: stretch;
    }
</style>