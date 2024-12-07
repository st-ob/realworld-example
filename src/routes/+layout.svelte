<script lang="ts">
    import "iconify-icon";
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
    let loggedIn = $state(true);
    let avatar = $state({img: '/Avatar.png', name: "Test Dani"});
</script>


<header>
    <div class="logo">
        <a href="/dashboard">
            <iconify-icon class="logoIcon" icon="tabler:lifebuoy"></iconify-icon>
            <h1>Conduit</h1>
        </a>
    </div>
    <nav>
        <ul>
            {#if loggedIn}
                <li><a href="/article">
                    <iconify-icon class="newArticleIcon" icon="tabler:playlist-add"></iconify-icon>
                    New Article
                </a></li>
                <li><a href="/profile"><img src={avatar.img} alt={avatar.name}/></a></li>
            {/if}
        </ul>
    </nav>
</header>

{@render children()}


<style>
    header {
        overflow: hidden;
        display: flex;
        padding: 11px 30px;
        justify-content: space-between;
        align-items: flex-start;

        border-radius: 0px 0px var(--rounded-2xl, 16px) var(--rounded-2xl, 16px);
        background: var(--green-600, #057A55);

        /* shadow-md */
        box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(0, 0, 0, 0.05);
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        color: var(--green-200, #BCF0DA);
    }

    h1, iconify-icon {
        align-content: center;
    }

    .logoIcon {
        font-size: 48px;
    }

    .newArticleIcon {
        font-size: 32px;
    }

    nav ul {
        display: flex;
        width: 488px;
        justify-content: flex-end;
        align-items: center;
        gap: var(--8, 32px);
    }

    nav li, a {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

        color: var(--green-200, #BCF0DA);
        text-align: center;
        /* text-2xl/font-bold */
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 36px */
        letter-spacing: -0.24px;
        text-decoration: none;
    }

    nav img {
        display: flex;
        width: 32px;
        height: 32px;
        padding: 4px 2px 4px 6px;
        justify-content: flex-end;
        align-items: center;
        flex-shrink: 0;
    }

    a:hover {
        color: #FFFFFF;
    }

    img:hover {
        width: 40px;
        height: 40px;
        padding: 0px;
    }

</style>