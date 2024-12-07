<script lang="ts">
    import type { PageData } from '../auth/$types';

    let { data }: { data: PageData } = $props();
    let logIn = $state(true); //type === "signin";
</script>

<main>
    <div class="auth">
        <h1>
            {#if logIn}
                Log into
            {:else}
                Sign up for
            {/if}
            Conduit
        </h1>
        <form>
            <input type="text" placeholder="Username" id="user" />
            {#if !logIn}
                <input type="text" placeholder="Email Address" id="email" />
            {/if}
            <input type="text" placeholder="Password" id="pwd" />
            <input type="submit" value={logIn ? "Log In" : "Sign In"} />
        </form>
        {#if logIn}
            <p>Need an account? <a href="/auth" onclick={() => logIn = false}>Sign Up</a></p>
        {:else}
            <p>Already have an account? <a href="/auth" onclick={() => logIn = true}>Log In</a></p>
        {/if}
        
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        gap: 30px;
        flex-shrink: 0;
        align-self: stretch;
        flex-wrap: wrap;
    }

    .auth {
        display: flex;
        min-width: 300px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    h1 {
        align-self: stretch;

        color: #000;
        text-align: center;
        /* text-3xl/font-bold */
        font-family: Inter;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 45px */
    }

    form {
        display: flex;
        min-width: 300px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    input {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input[type=text] {
        padding: var(--1, 4px) var(--25, 10px);

        border-radius: var(--rounded-md, 6px);
        border: var(--sds-size-stroke-border, 1px) solid var(--black, #000);
    }

    input[type=submit] {
        padding: var(--15, 6px) var(--35, 14px);

        border-radius: var(--rounded-xl, 12px);
        background: var(--green-600, #057A55);

        color: var(--green-200, #BCF0DA);
        text-align: center;
        /* text-2xl/font-bold */
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 36px */
        letter-spacing: -0.24px;
    }

    input[type=submit]:hover {
        color: white;
    }

    input::placeholder {
        color: var(--gray-300, #D1D5DB);
        font-family: Inter;
        font-size: var(--sds-typography-body-size-medium);
        font-style: italic;
        font-weight: 400;
        line-height: normal;
    }

    p {
        color: var(--black, #000);
        text-align: center;
        /* text-base/font-medium */
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 24px */
    }

    a {
        color: var(--green-600, #057A55);
        text-align: center;
        /* text-base/font-bold */
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 24px */
        text-decoration: none;
    }
</style>