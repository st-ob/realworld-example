<main>
    <section class="action">
        <p>Welcome to the Conduit - the blog for sustainable energy</p>
        <a href="/auth?type=signin">Sign In</a>
        <a href="/auth?type=signup">Sign Up</a>
    </section>
    <section>
        <img src="/backImg.png" alt="Conduit Article Garden" /> 
    </section>
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

    .action {
        display: flex;
        min-width: 300px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 0 0;
        align-self: stretch;

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

    a {
        display: flex;
        padding: var(--15, 6px) var(--35, 14px);
        justify-content: center;
        align-items: center;

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
        text-decoration: none;
    }

    a:hover {
        color: white;
    }

    img {
        display: flex;
        min-width: 300px;
        max-width: 600px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex: 1 0 0;
    }
</style>


